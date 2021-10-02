import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { togglePopover, setCardPopover, toggleMenu } from '../store/actions/system.actions';
import { createBoard, loadBoards } from '../store/actions/board.actions';
import { onUpdateUser } from '../store/actions/user.actions';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import  Tooltip, { tooltipClasses }  from '@mui/material/Tooltip';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { BoardAdd } from './board-list/board-add';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import { styled } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { PopoverMenu } from './menu/popover-menu';

import { ReactComponent as StarredImage } from '../assets/svg/starred-board.svg';
import { HeaderSearch } from './header-search';

class _AppHeader extends Component {
    state = {
        isModal: false,
        starredBoards: [],
    };

    async componentDidMount() {
        let { boards, user } = this.props;
        if (boards?.length === 0) {
            await this.props.loadBoards({ byUserId: user._id });
            boards = this.props.boards;
        }
        this.setState({
            starredBoards: boards.filter((board) => user.starredBoardsIds.includes(board._id)),
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.starredBoardsIds !== this.props.user.starredBoardsIds) {
            await this.props.loadBoards({ byUserId: this.props.user._id });
            const boards = this.props.boards;
            this.setState({
                starredBoards: boards.filter((board) => this.props.user.starredBoardsIds.includes(board._id)),
            });
        }
    }

    closePopover = () => {
        this.props.togglePopover(null);
    };

    onBtnCreate = () => {
        this.setState({ isModal: !this.state.isModal });
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
    onBoards = (ev, id) => {
        this.props.toggleMenu(true, id, ev.target.parentElement);
    };

    // remove starred board from app header popper
    onStar = async (ev, boardId) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.onCloseStarredBoards(ev);
        let newUser = { ...this.props.user };
        newUser.starredBoardsIds = newUser.starredBoardsIds.filter((id) => id !== boardId);
        await this.props.onUpdateUser(newUser);
        this.setState({
            starredBoards: this.props.boards.filter((board) => board._id !== boardId && this.props.user.starredBoardsIds.includes(board._id)),
        });
    };

    tooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))
    (({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: 'rgb(23, 43, 77)',
          color: 'rgb(224, 226, 231)',
          // position: 'absolute',
          // top: 'calc(100% + 8px)',
          // left: '-11px',
          // borderRadius: '3px',
          // whiteSpace: 'nowrap',
          padding: '4px 8px',
          fontSize: '0.8rem'
          }
        }));

    render() {
        const { isUserBoardsPage } = this.props;
        const { isStarredMenuOpen, isBoardsMenuOpen, starredBoards } = this.state;
        const { boards, board, user } = this.props;

        return (
            <header
                onClick={this.closePopover}
                className={'app-header flex align-center full with-main-layout' + (isUserBoardsPage ? ' user-boards-header' : '')}
            >
                <Link to='/board'>
                    <img className='logo' alt='swello' />
                    <span>Swello</span>
                </Link>
                <div className='actions'>
                    <button
                        // ref={this.boardsAnchorRef}
                        id='composition-button'
                        aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
                        aria-expanded={isStarredMenuOpen ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={(ev) => {
                            this.onBoards(ev, 'boards');
                        }}
                    >
                        <span>Boards</span>
                        <ArrowDownIcon />
                    </button>
                    <PopoverMenu id='boards' header='Boards' classNames='borads-popper header-popper-menu'>
                        {/* <Popper
            className="borads-popper header-popper-menu"
            open={isBoardsMenuOpen}
            anchorEl={this.boardsAnchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={this.onCloseBoards}>
                    <MenuList
                      autoFocusItem={isBoardsMenuOpen}
                      id="composition-menu"
                      aria-labelledby="composition-button">
                      <div className="popper-header">
                        <div>Boards</div>
                        <button onClick={this.onCloseBoards}></button>
                      </div> */}
                        {board && (
                            <div className='current-board list-group'>
                                <div>CURRENT BOARD</div>
                                <div>
                                    <div
                                        style={{
                                            backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                            backgroundColor: `${board?.style?.bgColor}`,
                                        }}
                                    >
                                        {board.createdBy.fullname.charAt(0)}
                                    </div>
                                    <span>{board.title}</span>
                                </div>
                            </div>
                        )}
                        <div className='your-boards list-group'>
                            <div>YOUR BOARDS</div>
                            <ul>
                                {boards
                                    .filter((board) => board.createdBy._id === user._id && !user.starredBoardsIds.includes(board._id))
                                    .map((board) => (
                                        <MenuItem
                                            key={board._id}
                                            onClick={(ev) => {
                                                this.onCloseBoards(ev);
                                                this.props.history.push(`/board/${board._id}`);
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                                        backgroundColor: `${board?.style?.bgColor}`,
                                                    }}
                                                >
                                                    {board.createdBy.fullname.charAt(0)}
                                                </div>
                                                <span>{board.title}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                            </ul>
                        </div>
                        <div className='guest-boards your-boards list-group'>
                            <div>GUEST BOARDS</div>
                            <ul>
                                {boards
                                    .filter(
                                        (board) =>
                                            board.members.some((member) => member._id === user._id) &&
                                            !user.starredBoardsIds.includes(board._id) &&
                                            board.createdBy._id !== user._id
                                    )
                                    .map((board) => (
                                        <MenuItem
                                            key={board._id}
                                            onClick={(ev) => {
                                                this.onCloseBoards(ev);
                                                window.location.href = `/board/${board._id}`;
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                                        backgroundColor: `${board?.style?.bgColor}`,
                                                    }}
                                                >
                                                    {board.createdBy.fullname.charAt(0)}
                                                </div>
                                                <span>{board.title}</span>
                                            </div>
                                        </MenuItem>
                                    ))}
                            </ul>
                        </div>
                        {/* </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
                    </PopoverMenu>
                    <button
                        // ref={this.starredAnchorRef}
                        id='composition-button'
                        aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
                        aria-expanded={isStarredMenuOpen ? 'true' : undefined}
                        aria-haspopup='true'
                        // onClick={this.onStarredBoards}>
                        onClick={(ev) => {
                            this.onBoards(ev, 'starred');
                        }}
                    >
                        <span>Starred</span>
                        <ArrowDownIcon />
                    </button>
                    <PopoverMenu id='starred' header='Starred boards' classNames='starred-borads-popper header-popper-menu'>
                        {/* <Popper
            className="starred-borads-popper header-popper-menu"
            open={isStarredMenuOpen}
            anchorEl={this.starredAnchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={this.onCloseStarredBoards}>
                    <MenuList
                      autoFocusItem={isStarredMenuOpen}
                      id="composition-menu"
                      aria-labelledby="composition-button">
                      <div className="popper-header">
                        <div>Starred boards</div>
                        <button onClick={this.onCloseStarredBoards}></button>
                      </div> */}
                        <div className='starred-boards list-group'>
                            {!starredBoards.length && (
                                <div className='empty-starred-list'>
                                    <StarredImage />
                                    <p className='empty-starred-message'>Star important boards to access them quickly and easily.</p>
                                </div>
                            )}
                            <ul>
                                {starredBoards.map((starredBoard) => (
                                    <MenuItem
                                        key={starredBoard._id}
                                        onClick={(ev) => {
                                            this.onCloseBoards(ev);
                                            this.props.history.push(`/board/${starredBoard._id}`);
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    backgroundImage: `url(${starredBoard?.style?.imgUrl}&w=400)`,
                                                    backgroundColor: `${starredBoard?.style?.bgColor}`,
                                                }}
                                            >
                                                {/* {starredBoard.createdBy.fullname.charAt(0)} */}
                                            </div>
                                            <span>{starredBoard.title}</span>
                                            <span
                                                onClick={(ev) => {
                                                    this.onStar(ev, starredBoard._id);
                                                }}
                                                title='Click to unstar this board. It will be removed from your starred list.'
                                            ></span>
                                        </div>
                                    </MenuItem>
                                ))}
                            </ul>
                        </div>
                        {/* </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper> */}
                    </PopoverMenu>
                    <button className='btn-create' onClick={this.onBtnCreate}>
                        Create
                    </button>
                </div>
                <div>
                    <HeaderSearch toggleMenu={this.props.toggleMenu}/>
                    <button
                        className='btn-notifications'
                        onClick={(ev) => {
                            this.onBoards(ev, 'notification');
                        }}
                    >
                        <NotificationsIcon />
                    </button>
                    <PopoverMenu id='notification' header='Notification' classNames='notification-menu header-popper-menu'>
                        <div className='notification-container'>
                            <div className='notification-header'>
                                <button className='notification-header-link'>View all</button>
                                <button className='notification-header-link'>Mark all as read</button>
                            </div>
                            <div className='notification-content-main'>
                                <div className='notification-content'>
                                    {/* HERE COMES THE MAP RETURN DIVs */}
                                    <div className='notification'>
                                        <div className='notification-inner'>
                                            <div className='notification-read-btn'>
                                                {/* this btn have a before with icon */}
                                                <this.tooltip title='Mark read' TransitionComponent={Fade} TransitionProps={{ timeout: 300 }} placement="bottom">
                                                    <button></button>
                                                </this.tooltip>
                                            </div>
                                            <div className='notification-inner-header'>
                                                <div>
                                                    <img alt />
                                                </div>
                                                <span>notification title</span>
                                            </div>
                                            <div className='notification-inner-user'>
                                                <div className='user-avatar' alt={'Martin Sh.'}>
                                                    <Avatar />
                                                </div>
                                                <div className='user-name'>
                                                    <span>Martin</span>
                                                </div>
                                            </div>
                                            <div className='notification-inner-content'>
                                                <div className='icon'>
                                                    <span></span>
                                                </div>
                                                <div className='description'>
                                                    Made you an admin on the board <span>test</span> sep 24, 2021, 10:05am
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PopoverMenu>
                    <Avatar className='avatar' alt={user.fullname} src='/static/images/avatar/3.jpg' />
                </div>
                <BoardAdd isModal={this.state.isModal} onClose={this.onBtnCreate} />
            </header>
        );
    }
}

const mapDispatchToProps = {
    togglePopover,
    createBoard,
    loadBoards,
    onUpdateUser,
    setCardPopover,
    toggleMenu,
};

const mapStateToProps = (state) => {
    return {
        isPopoverOpen: state.boardModule.boards,
        boards: state.boardModule.boards,
        board: state.boardModule.board,
        user: state.userModule.user,
    };
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader));
