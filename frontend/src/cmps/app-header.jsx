import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePopover } from '../store/actions/system.actions';
import { createBoard, loadBoards } from '../store/actions/board.actions';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

class _AppHeader extends Component {
    state = {
        isSearchActive: false,
        isModal: false,
        markedId: 0,
        boardName: '',
        isAllowed: 'not-allowed',
        isStarredMenuOpen: false,
        isBoardsMenuOpen: false,
        starredBoards: null,
    };

    starredAnchorRef = React.createRef(null);
    boardsAnchorRef = React.createRef(null);

    async componentDidMount() {
        let { boards, user } = this.props;
        if (boards?.length===0) {
          await this.props.loadBoards({ byUserId: user._id })
          boards = this.props.boards;
        }
        console.log('boards from props:', boards, 'user is:', user);
        this.setState({starredBoards: boards.filter((board) => user.starredBoardsIds.includes(board._id))})
    }

    bgcs = [
        {
            bgc: 'https://images.unsplash.com/photo-1632269826291-2cb3009bf43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
            bgc: 'https://images.unsplash.com/photo-1632286988262-dee7280ee48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
            bgc: 'https://images.unsplash.com/photo-1632301497603-33fb3d7afdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
        },
        {
            bgc: 'https://images.unsplash.com/photo-1632303283130-8a2ec7823251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400',
            title: 'abstract 3d illustration of geometrical objects with abstract light scattering on them.',
        },
        { bgc: 'rgb(0, 121, 191)', title: 'blue' },
        { bgc: 'rgb(210, 144, 52)', title: 'orange' },
        { bgc: 'rgb(81, 152, 57)', title: 'green' },
        { bgc: 'rgb(176, 70, 50)', title: 'red' },
    ];

    closePopover = () => {
        this.props.hidePopover();
    };

    onBtnCreate = () => {
        this.setState({ isModal: !this.state.isModal });
    };

    onCloseModal = (ev) => {
        this.setState({ isModal: false });
    };

    handleBgc = (targetId) => {
        this.setState({ markedId: targetId });
    };

    handleChange = ({ target }) => {
        this.setState({
            boardName: target.value,
            isAllowed: target.value.length > 0 ? 'allowed' : 'not-allowed',
        });
    };

    onCreateNewBoard = async () => {
        const boardToAdd = {
            title: this.state.boardName,
            style: {},
            members: [],
        };
        this.state.markedId < 4
            ? (boardToAdd.style.imgUrl = this.bgcs[this.state.markedId].bgc.substring(0, this.bgcs[this.state.markedId].bgc.length - 6))
            : (boardToAdd.style.bgColor = this.bgcs[this.state.markedId].bgc);
        console.log('create new board in data, board is:', boardToAdd);

        const newBoard = await this.props.createBoard(boardToAdd);
        console.log('new board:', newBoard);
        window.location.href = `/board/${newBoard._id}`;
    };

    // STARRED BOARDS MENU
    onStarredBoards = () => {
        this.setState({ isStarredMenuOpen: !this.state.isStarredMenuOpen });
    };

    onCloseStarredBoards = (event) => {
        if (this.starredAnchorRef.current && this.starredAnchorRef.current.contains(event.target)) {
            return;
        }
        this.setState({ isStarredMenuOpen: false });
    };

    // MY BOARDS MENU
    onBoards = () => {
        this.setState({ isBoardsMenuOpen: !this.state.isBoardsMenuOpen });
    };

    onCloseBoards = (event) => {
        if (this.boardsAnchorRef.current && this.boardsAnchorRef.current.contains(event.target)) {
            return;
        }
        this.setState({ isBoardsMenuOpen: false });
    };

    render() {
        const { isUserBoardsPage } = this.props;
        const { isSearchActive } = this.state;
        const { isStarredMenuOpen, isBoardsMenuOpen, starredBoards } = this.state;
        const { boards } = this.props;
        if (!starredBoards) return <div>Loading</div>
        return (
            <header
                onClick={this.closePopover}
                className={'app-header flex align-center full with-main-layout' + (isUserBoardsPage ? ' user-boards-header' : '')}
            >
                <Link to='/board'>
                    <img className='logo' alt='swello' />
                </Link>
                <div className='actions'>
                    <button
                    ref={this.boardsAnchorRef}
                    id='composition-button'
                    aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
                    aria-expanded={isStarredMenuOpen ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={this.onBoards}
                    >
                        <span>Boards</span>
                        <ArrowDownIcon />
                    </button>
                    <Popper open={isBoardsMenuOpen} anchorEl={this.boardsAnchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.onCloseBoards}>
                                        <MenuList
                                            autoFocusItem={isBoardsMenuOpen}
                                            id='composition-menu'
                                            aria-labelledby='composition-button'
                                        >
                                            {boards.map(board=>{
                                            return <MenuItem 
                                                      key={board._id}
                                                      onClick={()=>{
                                                        this.onCloseStarredBoards(); 
                                                        window.location.href=`/board/${board._id}`
                                                        }}>
                                                        {board.title}
                                                    </MenuItem>})}
                                            {/* <MenuItem onClick={this.onCloseBoards}>Profile</MenuItem>
                                            <MenuItem onClick={this.onCloseBoards}>My account</MenuItem>
                                            <MenuItem onClick={this.onCloseBoards}>Logout</MenuItem> */}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    <button
                        ref={this.starredAnchorRef}
                        id='composition-button'
                        aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
                        aria-expanded={isStarredMenuOpen ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={this.onStarredBoards}
                    >
                        <span>Starred</span>
                        <ArrowDownIcon />
                    </button>
                    <Popper open={isStarredMenuOpen} anchorEl={this.starredAnchorRef.current} role={undefined} placement='bottom-start' transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.onCloseStarredBoards}>
                                        <MenuList
                                            autoFocusItem={isStarredMenuOpen}
                                            id='composition-menu'
                                            aria-labelledby='composition-button'
                                        >
                                            {starredBoards.map(starredBoard=>{
                                            return <MenuItem 
                                              key={starredBoard._id} 
                                              onClick={()=>{
                                                this.onCloseStarredBoards(); 
                                                window.location.href=`/board/${starredBoard._id}`
                                                }}>
                                              {starredBoard.title}
                                            </MenuItem>})}
                                            {/* <MenuItem onClick={this.onCloseStarredBoards}>Profile</MenuItem>
                                            <MenuItem onClick={this.onCloseStarredBoards}>My account</MenuItem>
                                            <MenuItem onClick={this.onCloseStarredBoards}>Logout</MenuItem> */}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    <button className='btn-create' onClick={this.onBtnCreate}>
                        Create
                    </button>
                </div>
                <div>
                    <div className={'search flex align-center' + (isSearchActive ? ' active' : '')}>
                        <span>
                            <SearchIcon />
                        </span>
                        <input
                            type='text'
                            placeholder='Search'
                            onFocus={() => this.setState({ isSearchActive: true })}
                            onBlur={() => this.setState({ isSearchActive: false })}
                        />
                        {isSearchActive && (
                            <span style={{ height: '16px' }}>
                                <CloseIcon />
                            </span>
                        )}
                    </div>
                    <button className='btn-notifications'>
                        <NotificationsIcon />
                    </button>
                    <Avatar className='avatar' alt='Guest User' src='/static/images/avatar/3.jpg' />
                </div>
                <Modal showCloseIcon={true} open={this.state.isModal} onClose={this.onCloseModal}>
                    <div className='new-board'>
                        {this.state.markedId < 4 && (
                            <div className='main img' style={{ backgroundImage: `url(${this.bgcs[this.state.markedId].bgc})` }}></div>
                        )}
                        {this.state.markedId > 3 && <div className='main' style={{ backgroundColor: this.bgcs[this.state.markedId].bgc }}></div>}
                        <input
                            autoComplete='off'
                            autoCorrect='off'
                            spellCheck='false'
                            type='text'
                            className='new-board-name'
                            placeholder='Add board title'
                            aria-label='Add board title'
                            data-test-id='create-board-title-input'
                            value={this.state.boardName}
                            onChange={this.handleChange}
                        />
                        <div className='side'>
                            <div
                                className={`${this.state.markedId === 0 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(0);
                                }}
                                style={{ backgroundImage: `url(${this.bgcs[0].bgc})` }}
                                title={this.bgcs[0]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 1 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(1);
                                }}
                                style={{ backgroundImage: `url(${this.bgcs[1].bgc})` }}
                                title={this.bgcs[1]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 2 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(2);
                                }}
                                style={{ backgroundImage: `url(${this.bgcs[2].bgc})` }}
                                title={this.bgcs[2]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 3 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(3);
                                }}
                                style={{ backgroundImage: `url(${this.bgcs[3].bgc})` }}
                                title={this.bgcs[3]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 4 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(4);
                                }}
                                style={{ backgroundColor: `${this.bgcs[4].bgc}` }}
                                title={this.bgcs[4]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 5 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(5);
                                }}
                                style={{ backgroundColor: `${this.bgcs[5].bgc}` }}
                                title={this.bgcs[5]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 6 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(6);
                                }}
                                style={{ backgroundColor: `${this.bgcs[6].bgc}` }}
                                title={this.bgcs[6]?.title}
                            ></div>
                            <div
                                className={`${this.state.markedId === 7 ? 'marked' : ''}`}
                                onClick={(ev) => {
                                    this.handleBgc(7);
                                }}
                                style={{ backgroundColor: `${this.bgcs[7].bgc}` }}
                                title={this.bgcs[7]?.title}
                            ></div>
                            <div style={{ backgroundColor: 'rgb(255, 255, 255)' }} title='More'></div>
                        </div>
                    </div>
                    <div className='btn'>
                        <button
                            className={this.state.isAllowed}
                            disabled={this.state.isAllowed === 'allowed' ? false : true}
                            onClick={this.onCreateNewBoard}
                        >
                            Create board
                        </button>
                    </div>
                </Modal>
            </header>
        );
    }
}

const mapDispatchToProps = {
    hidePopover,
    createBoard,
    loadBoards,
};

const mapStateToProps = (state) => {
    return {
        isPopoverOpen: state.boardModule.boards,
        boards: state.boardModule.boards,
        user: state.userModule.user,
    };
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
