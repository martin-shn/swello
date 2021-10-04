import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { socketService } from '../services/socket.service';
import { togglePopover } from '../store/actions/system.actions';
import { updateBoard, loadBoard, clearBoard } from '../store/actions/board.actions';
import {
  hideLoadingPage,
  showLoadingPage,
  setQuickEdit,
  setCardPopover,
  closeCardPopover,
} from '../store/actions/system.actions';
import { onUpdateUser } from '../store/actions/user.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { CardPage } from './card-page';
import { Route } from 'react-router';
import { LoaderPage } from '../cmps/loader/loader-page';
import { SideMenu } from '../cmps/side-menu/side-menu';
import { Dashboard } from './dashboard/dashboard';
import { listService } from '../services/board-services/list.service';
import { cardService } from '../services/board-services/card.service';
import { CardQuickEdit } from '../cmps/card/card-quick-edit';

export class _BoardPage extends Component {
  state = {
    activeList: {
      // only one add-card-to-list form can be active at all times.
      id: null,
      isTopAdd: false,
    },
    // popoverListId: null, // only one popover can be active at all times
    isAddingList: false,
  };

  async componentDidMount() {
    const { boardId } = this.props.match.params;
    socketService.setup();
    // socketService.emit(socketService.SOCKET_EVENT_BOARD_UPDATED);
    socketService.on(socketService.SOCKET_EVENT_BOARD_UPDATED, () => this.props.loadBoard(boardId));
    // socketService.emit()
    this.props.showLoadingPage();
    await this.props.loadBoard(boardId);
    this.props.hideLoadingPage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId) this.props.loadBoard(boardId);
  }

  componentWillUnmount() {
    this.props.clearBoard();
    socketService.off(socketService.SOCKET_EVENT_BOARD_UPDATED);
    socketService.terminate();
  }

  // UI ACTIONS

  onAddingCard = listId => {
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

  onAddingList = isAddingList => {
    this.setState({ isAddingList });
  };

  onTogglePopover = listId => {
    this.setState({ popoverListId: listId });
  };

  // DATA ACTIONS
  onAddList = ev => {
    ev.preventDefault();
    const listTitle = ev.target.title.value;
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

  onTogglePopover = listId => {
    this.props.togglePopover(listId);
  };

  onUpdateTitle = title => {
    const { board } = this.props;
    const updatedBoard = { ...board, title };
    this.props.updateBoard(updatedBoard);
  };

  onListUpdated = updatedList => {
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
  onArchiveList = list => {
    const { board } = this.props;
    const updatedBoard = boardService.archiveList(board, list);
    this.props.updateBoard(updatedBoard);
  };
  onUpdateUser = async user => {
    await this.props.onUpdateUser(user);
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (!this.props.board || this.props.isLoadingPage)
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
      // isCardPageOpen
    } = this.state;
    const { popoverListId, filterBy, cardQuickEdit, setQuickEdit, setCardPopover, closeCardPopover, cardPopover } =
      this.props;
    const { title, members, lists, style } = this.props.board;
    return (
      <main
        className="board-page"
        style={{
          backgroundImage: `url(${style.imgUrl})` || 'none',
          backgroundColor: style.bgColor || 'unset',
        }}>
        <AppHeader />
        <TopPanel
          title={title}
          members={members}
          onUpdateTitle={this.onUpdateTitle}
          user={this.props.user}
          board={this.props.board}
          onUpdateUser={this.onUpdateUser}
        />
        <PopoverScreen isOpen={popoverListId} onTogglePopover={this.onTogglePopover} />
        <Route path="/board/:boardId/card/:cardId" component={CardPage} />
        <Route path="/board/:boardId/dashboard" component={Dashboard} />
        <ListAll
          board={this.props.board}
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
  setCardPopover,
  closeCardPopover,
  setQuickEdit,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
    filterBy: state.boardModule.filterBy,
    popoverListId: state.systemModule.popoverListId,
    isLoadingPage: state.systemModule.isLoadingPage,
    user: state.userModule.user,
    cardQuickEdit: state.systemModule.cardQuickEdit,
    cardPopover: state.systemModule.cardPopover,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
