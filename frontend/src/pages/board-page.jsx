import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { socketService, SOCKET_EVENT_SET_BOARD, SOCKET_EVENT_SET_USER } from '../services/socket.service';
import { togglePopover } from '../store/actions/system.actions';
import { updateBoard, loadBoard, clearBoard } from '../store/actions/board.actions';
import { hideLoadingPage, showLoadingPage, setQuickEdit, setCardPopover, closeCardPopover } from '../store/actions/system.actions';
import { onUpdateUser, onLogin } from '../store/actions/user.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { CardPage } from './card-page';
import { Route } from 'react-router';
import { LoaderPage } from '../cmps/loader/loader-page';
import { SideMenu } from '../cmps/side-menu/side-menu';
import { Dashboard } from './dashboard/dashboard';
import { listService } from '../services/board-services/list.service';
import { cardService } from '../services/board-services/card.service';
import { CardQuickEdit } from '../cmps/card/card-quick-edit';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as OnlineIcon } from '../assets/svg/online.svg';
import { ReactComponent as OfflineIcon } from '../assets/svg/offline.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close-icon.svg';

export class _BoardPage extends Component {
    state = {
        activeList: {
            // only one add-card-to-list form can be active at all times.
            id: null,
            isTopAdd: false,
            template: null,
        },
        // popoverListId: null, // only one popover can be active at all times
        isAddingList: false,
        currPage: this.props.location.pathname.endsWith('dashboard') ? 'dashboard' : 'board',
        isOnline: navigator.onLine,
        isSnackbarOpen: false,
    };

    async componentDidMount () {
        if (!this.props.user) await this.props.onLogin({ username: 'guest@guest.com', password: '1234' });
        const { boardId } = this.props.match.params;
        this.state.isOnline && socketService.emit(SOCKET_EVENT_SET_BOARD, boardId);
        this.props.showLoadingPage();
        await this.loadBoard(boardId);
        this.props.hideLoadingPage();

        // PWA off line support
        window.addEventListener('online', () => {
            socketService.emit(SOCKET_EVENT_SET_BOARD, boardId);
            socketService.emit(SOCKET_EVENT_SET_USER, this.props.user._id);
            socketService.on('set-user-successfully', () => {
                let updatedBoard = localStorage.getItem(`board-${ boardId }`);
                if (updatedBoard) {
                    this.props.updateBoard(JSON.parse(updatedBoard));
                }
            });
            this.setState({ isSnackbarOpen: true, isOnline: true });
        });
        window.addEventListener('offline', () => {
            this.setState({ isSnackbarOpen: true, isOnline: false });
        });
    }

    componentDidUpdate (prevProps, prevState) {
        const { boardId } = this.props.match.params;
        if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
            localStorage.removeItem(`board-${ prevProps.match.params.boardId }`);
            this.loadBoard(boardId);
        }
        if (prevProps.location.pathname !== this.props.location.pathname)
            this.setState({ currPage: this.props.location.pathname.endsWith('dashboard') ? 'dashboard' : 'board' });
    }

    componentWillUnmount () {
        this.props.clearBoard();
        this.props.closeCardPopover();
        const { boardId } = this.props.match.params;
        localStorage.removeItem(`board-${ boardId }`);
        window.removeEventListener('online', () => { });
        window.removeEventListener('offline', () => { });
    }

    loadBoard = async (boardId) => {
        const board = await this.props.loadBoard(boardId);
        if (!board) this.props.history.replace('/board');
    };
    // UI ACTIONS

    onAddingCard = (listId) => {
        this.setState({ activeList: { id: listId, isTopAdd: false } });
    };

    onAddingTopCard = (isOpen, listId) => {
        if (isOpen) {
            this.onTogglePopover(null);
            this.setState({ activeList: { id: listId, isTopAdd: true } });
        } else {
            this.setState({ activeList: { id: null, isTopAdd: false } });
        }
    };

    onAddingList = (isAddingList) => {
        this.setState({ isAddingList });
    };

    onTogglePopover = (listId) => {
        this.setState({ popoverListId: listId });
    };

    // DATA ACTIONS
    onAddList = (ev) => {
        ev.preventDefault();
        const listTitle = ev.target.title.value;
        if (!listTitle) return;
        ev.target.reset();
        const { board } = this.props;
        const updatedBoard = boardService.addList(board, listTitle);
        this.props.updateBoard(updatedBoard);
        this.setState({ isAddingList: false });
    };

    onCopyList = (list, title) => {
        const { board } = this.props;
        const updatedBoard = boardService.copyList(board, list, title);
        this.props.updateBoard(updatedBoard);
    };

    onMoveList = (currIdx, newIdx) => {
        if (currIdx === newIdx) return;
        const { board } = this.props;
        const updatedBoard = boardService.moveList(board, currIdx, newIdx);
        this.props.updateBoard(updatedBoard);
    };

    onTogglePopover = (listId) => {
        this.props.togglePopover(listId);
    };

    onUpdateTitle = (title) => {
        const { board } = this.props;
        const updatedBoard = { ...board, title };
        this.props.updateBoard(updatedBoard);
    };

    onListUpdated = (updatedList) => {
        const { board } = this.props;
        const updatedBoard = boardService.updateList(board, updatedList);
        this.props.updateBoard(updatedBoard);
    };

    onMoveAllCardsToList = (currListId, newListId) => {
        const { board } = this.props;
        const updatedBoard = boardService.moveAllCardsToList(board, currListId, newListId);
        this.props.updateBoard(updatedBoard);
    };

    onSortList = (list, sortBy) => {
        const { board } = this.props;
        const updatedBoard = boardService.sortList(board, list, sortBy);
        this.props.updateBoard(updatedBoard);
    };
    onArchiveList = (list) => {
        const { board } = this.props;
        const updatedBoard = boardService.archiveList(board, list);
        this.props.updateBoard(updatedBoard);
    };
    onUpdateUser = async (user) => {
        await this.props.onUpdateUser(user);
    };

    // TODO: add dynamic text color using contrast-js
    render () {
        let isTemplate = false;
        if (this.props.location.pathname === '/templates' && this.state.template) isTemplate = true;
        if (!this.props.board || this.props.isLoadingPage || !this.props.user)
            return (
                <>
                    <AppHeader />
                    <LoaderPage />;
                </>
            );
        if (!this.props.board || !Object.keys(this.props.board).length) {
            this.props.history.push('/board');
            return <></>;
        }
        const {
            activeList,
            isAddingList,
            currPage,
            // isCardPageOpen
        } = this.state;
        const { popoverListId, filterBy, cardQuickEdit, setQuickEdit, setCardPopover, closeCardPopover, cardPopover } = this.props;
        const { title, members, lists, style } = this.props.board;
        return (
            <main
                className='board-page'
                style={{
                    backgroundImage: `url(${ style.imgUrl })` || 'none',
                    backgroundColor: style.bgColor || 'unset',
                }}
            >
                <AppHeader />
                {!isTemplate && (
                    <TopPanel
                        title={title}
                        members={members}
                        onUpdateTitle={this.onUpdateTitle}
                        user={this.props.user}
                        board={this.props.board}
                        onUpdateUser={this.onUpdateUser}
                    />
                )}
                <PopoverScreen isOpen={popoverListId} onTogglePopover={this.onTogglePopover} />
                <Route path='/board/:boardId/card/:cardId' component={CardPage} />
                <Route path='/board/:boardId/dashboard' component={Dashboard} />
                {currPage === 'board' && (
                    <>
                        <ListAll
                            board={this.state.template || this.props.board}
                            updateBoard={this.props.updateBoard}
                            lists={listService.filterLists(lists, filterBy)}
                            activeList={activeList}
                            popoverListId={popoverListId}
                            onTogglePopover={this.onTogglePopover}
                            onAddingCard={this.onAddingCard}
                            onAddingTopCard={this.onAddingTopCard}
                            isAddingList={isAddingList}
                            onAddingList={this.onAddingList}
                            onAddList={this.onAddList}
                            onListUpdated={this.onListUpdated}
                            onCopyList={this.onCopyList}
                            onMoveList={this.onMoveList}
                            onMoveAllCardsToList={this.onMoveAllCardsToList}
                            onSortList={this.onSortList}
                            onArchiveList={this.onArchiveList}
                            isTemplate={isTemplate}
                        />
                        <SideMenu />
                        {cardQuickEdit && (
                            <CardQuickEdit
                                card={cardService.getCardById(this.props.board, cardQuickEdit.id)}
                                board={this.props.board}
                                pos={cardQuickEdit.pos}
                                setQuickEdit={setQuickEdit}
                                setCardPopover={setCardPopover}
                                updateBoard={this.props.updateBoard}
                                cardPopover={cardPopover}
                                closeCardPopover={closeCardPopover}
                            />
                        )}
                    </>
                )}
                <Snackbar
                    open={this.state.isSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => {
                        this.setState({ isSnackbarOpen: false });
                    }}
                >
                    <div className='connectivity-msg'>
                        {this.state.isOnline ? <OnlineIcon className='online' /> : <OfflineIcon className='offline' />}
                        {this.state.isOnline
                            ? 'Connection is back. All changes are being commited.'
                            : 'Lost internet connection. All changes will be commited once connection is back.'}
                        <IconButton onClick={() => {
                            this.setState({ isSnackbarOpen: false });
                        }}>
                            <CloseIcon
                                className='close-icon'
                            />
                        </IconButton>
                    </div>
                </Snackbar>
            </main>
        );
    }
}

const mapDispatchToProps = {
    updateBoard,
    clearBoard,
    togglePopover,
    loadBoard,
    hideLoadingPage,
    showLoadingPage,
    onUpdateUser,
    onLogin,
    setCardPopover,
    closeCardPopover,
    setQuickEdit,
};

const mapStateToProps = (state) => {
    return {
        board: state.boardModule.board,
        filterBy: state.boardModule.filterBy,
        popoverListId: state.systemModule.popoverListId,
        isLoadingPage: state.systemModule.isLoadingPage,
        user: state.userModule.user,
        cardQuickEdit: state.systemModule.cardQuickEdit,
        cardPopover: state.systemModule.cardPopover,
        templates: state.boardModule.templates,
    };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
