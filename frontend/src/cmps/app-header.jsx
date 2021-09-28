import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { togglePopover } from '../store/actions/system.actions';
import { createBoard, loadBoards } from '../store/actions/board.actions';
import { onUpdateUser } from '../store/actions/user.actions';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { BoardAdd } from './board-list/board-add';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { ReactComponent as StarredImage } from '../assets/svg/starred-board.svg';

class _AppHeader extends Component {
  state = {
    isSearchActive: false,
    isModal: false,
    isStarredMenuOpen: false,
    isBoardsMenuOpen: false,
    starredBoards: [],
  };

  starredAnchorRef = React.createRef(null);
  boardsAnchorRef = React.createRef(null);

  async componentDidMount() {
    let { boards, user } = this.props;
    if (boards?.length === 0) {
      await this.props.loadBoards({ byUserId: user._id });
      boards = this.props.boards;
    }
    this.setState({
      starredBoards: boards.filter(board => user.starredBoardsIds.includes(board._id)),
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.starredBoardsIds !== this.props.user.starredBoardsIds) {
      await this.props.loadBoards({ byUserId: this.props.user._id });
      const boards = this.props.boards;
      this.setState({
        starredBoards: boards.filter(board => this.props.user.starredBoardsIds.includes(board._id)),
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

  onCloseStarredBoards = event => {
    if (this.starredAnchorRef.current && this.starredAnchorRef.current.contains(event.target)) {
      return;
    }
    this.setState({ isStarredMenuOpen: false });
  };

  // MY BOARDS MENU
  onBoards = () => {
    this.setState({ isBoardsMenuOpen: !this.state.isBoardsMenuOpen });
  };

  onCloseBoards = event => {
    if (this.boardsAnchorRef.current && this.boardsAnchorRef.current.contains(event.target)) {
      return;
    }
    this.setState({ isBoardsMenuOpen: false });
  };

  // remove starred board from app header popper
  onStar = async (ev, boardId) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.onCloseStarredBoards(ev);
    let newUser = { ...this.props.user };
    newUser.starredBoardsIds = newUser.starredBoardsIds.filter(id => id !== boardId);
    await this.props.onUpdateUser(newUser);
    this.setState({
      starredBoards: this.props.boards.filter(
        board => board._id !== boardId && this.props.user.starredBoardsIds.includes(board._id)
      ),
    });
  };

  render() {
    const { isUserBoardsPage } = this.props;
    const { isSearchActive } = this.state;
    const { isStarredMenuOpen, isBoardsMenuOpen, starredBoards } = this.state;
    const { boards, board, user } = this.props;

    return (
      <header
        onClick={this.closePopover}
        className={
          'app-header flex align-center full with-main-layout' +
          (isUserBoardsPage ? ' user-boards-header' : '')
        }>
        <Link to="/board">
          <img className="logo" alt="swello" />
          <span>Swello</span>
        </Link>
        <div className="actions">
          <button
            ref={this.boardsAnchorRef}
            id="composition-button"
            aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
            aria-expanded={isStarredMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={this.onBoards}>
            <span>Boards</span>
            <ArrowDownIcon />
          </button>
          <Popper
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
                      </div>
                      {board && (
                        <div className="current-board list-group">
                          <div>CURRENT BOARD</div>
                          <div>
                            <div
                              style={{
                                backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                backgroundColor: `${board?.style?.bgColor}`,
                              }}>
                              {board.createdBy.fullname.charAt(0)}
                            </div>
                            <span>{board.title}</span>
                          </div>
                        </div>
                      )}
                      <div className="your-boards list-group">
                        <div>YOUR BOARDS</div>
                        <ul>
                          {boards
                            .filter(
                              board =>
                                board.createdBy._id === user._id &&
                                !user.starredBoardsIds.includes(board._id)
                            )
                            .map(board => (
                              <MenuItem
                                key={board._id}
                                onClick={ev => {
                                  this.onCloseBoards(ev);
                                  this.props.history.push(`/board/${board._id}`);
                                }}>
                                <div>
                                  <div
                                    style={{
                                      backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                      backgroundColor: `${board?.style?.bgColor}`,
                                    }}>
                                    {board.createdBy.fullname.charAt(0)}
                                  </div>
                                  <span>{board.title}</span>
                                </div>
                              </MenuItem>
                            ))}
                        </ul>
                      </div>
                      <div className="guest-boards your-boards list-group">
                        <div>GUEST BOARDS</div>
                        <ul>
                          {boards
                            .filter(
                              board =>
                                board.members.some(member => member._id === user._id) &&
                                !user.starredBoardsIds.includes(board._id) &&
                                board.createdBy._id !== user._id
                            )
                            .map(board => (
                              <MenuItem
                                key={board._id}
                                onClick={ev => {
                                  this.onCloseBoards(ev);
                                  window.location.href = `/board/${board._id}`;
                                }}>
                                <div>
                                  <div
                                    style={{
                                      backgroundImage: `url(${board?.style?.imgUrl}&w=400)`,
                                      backgroundColor: `${board?.style?.bgColor}`,
                                    }}>
                                    {board.createdBy.fullname.charAt(0)}
                                  </div>
                                  <span>{board.title}</span>
                                </div>
                              </MenuItem>
                            ))}
                        </ul>
                      </div>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <button
            ref={this.starredAnchorRef}
            id="composition-button"
            aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
            aria-expanded={isStarredMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={this.onStarredBoards}>
            <span>Starred</span>
            <ArrowDownIcon />
          </button>
          <Popper
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
                      </div>
                      <div className="starred-boards list-group">
                        <ul>
                          {!starredBoards.length && (
                            <div className="empty-starred-list">
                              <StarredImage />
                              <p>Star important boards to access them quickly and easily.</p>
                            </div>
                          )}
                          {starredBoards.map(starredBoard => (
                            <MenuItem
                              key={starredBoard._id}
                              onClick={ev => {
                                this.onCloseBoards(ev);
                                this.props.history.push(`/board/${starredBoard._id}`);
                              }}>
                              <div>
                                <div
                                  style={{
                                    backgroundImage: `url(${starredBoard?.style?.imgUrl}&w=400)`,
                                    backgroundColor: `${starredBoard?.style?.bgColor}`,
                                  }}>
                                  {/* {starredBoard.createdBy.fullname.charAt(0)} */}
                                </div>
                                <span>{starredBoard.title}</span>
                                <span
                                  onClick={ev => {
                                    this.onStar(ev, starredBoard._id);
                                  }}
                                  title="Click to unstar this board. It will be removed from your starred list."></span>
                              </div>
                            </MenuItem>
                          ))}
                        </ul>
                      </div>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <button className="btn-create" onClick={this.onBtnCreate}>
            Create
          </button>
        </div>
        <div>
          <div className={'search flex align-center' + (isSearchActive ? ' active' : '')}>
            <span>
              <SearchIcon />
            </span>
            <input
              autoCorrect="off"
              autoComplete="off"
              type="text"
              placeholder="Search"
              onFocus={() => this.setState({ isSearchActive: true })}
              onBlur={() => this.setState({ isSearchActive: false })}
            />
            {isSearchActive && (
              <span style={{ height: '16px' }}>
                <CloseIcon />
              </span>
            )}
          </div>
          <button className="btn-notifications">
            <NotificationsIcon />
          </button>
          <Avatar className="avatar" alt="Guest User" src="/static/images/avatar/3.jpg" />
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
};

const mapStateToProps = state => {
  return {
    isPopoverOpen: state.boardModule.boards,
    boards: state.boardModule.boards,
    board: state.boardModule.board,
    user: state.userModule.user,
  };
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader));
