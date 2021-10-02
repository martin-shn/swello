import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { togglePopover, setCardPopover, toggleMenu } from '../store/actions/system.actions';
import { createBoard, loadBoards } from '../store/actions/board.actions';
import { onUpdateUser } from '../store/actions/user.actions';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { BoardAdd } from './board-list/board-add';

import { styled } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
// import MenuItem from '@mui/material/MenuItem';

import { PopoverMenu } from './header-popover-pages/popover-menu';
import { BoardsMenuContent } from './header-popover-pages/boards-menu-content';
import { StarredBoardsMenuContent } from './header-popover-pages/starredboards-menu-content';

// import { ReactComponent as StarredImage } from '../assets/svg/starred-board.svg';
import { HeaderSearch } from './header-popover-pages/header-search';

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

  // MY BOARDS MENU
  onBoards = (ev, id) => {
    this.props.toggleMenu(true, id, ev.target.parentElement);
  };

  onClose = () => {
    this.props.toggleMenu(false);
  };

  // remove starred board from app header popper
  onStar = async (ev, boardId) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.onClose();
    let newUser = { ...this.props.user };
    newUser.starredBoardsIds = newUser.starredBoardsIds.filter(id => id !== boardId);
    await this.props.onUpdateUser(newUser);
    this.setState({
      starredBoards: this.props.boards.filter(
        board => board._id !== boardId && this.props.user.starredBoardsIds.includes(board._id)
      ),
    });
  };

  tooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgb(23, 43, 77)',
        color: 'rgb(224, 226, 231)',
        padding: '4px 6px',
        fontSize: '0.7rem',
      },
    })
  );

  render() {
    const { isUserBoardsPage } = this.props;
    const { isStarredMenuOpen, starredBoards } = this.state;
    const { boards, board, user } = this.props;

    return (
      <header
        onClick={this.closePopover}
        className={
          'app-header flex align-center full with-main-layout' + (isUserBoardsPage ? ' user-boards-header' : '')
        }>
        <Link to="/board">
          <img className="logo" alt="swello" />
          <span>Swello</span>
        </Link>
        <div className="actions">
          <button
            id="composition-button"
            aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
            aria-expanded={isStarredMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={ev => {
              this.onBoards(ev, 'boards');
            }}>
            <span>Boards</span>
            <ArrowDownIcon />
          </button>
          <PopoverMenu id="boards" header="Boards" classNames="borads-popper header-popper-menu">
            {boards && <BoardsMenuContent boards={boards} board={board} user={user} onClose={this.onClose} />}
          </PopoverMenu>
          <button
            // ref={this.starredAnchorRef}
            id="composition-button"
            aria-controls={isStarredMenuOpen ? 'composition-menu' : undefined}
            aria-expanded={isStarredMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={ev => {
              this.onBoards(ev, 'starred');
            }}>
            <span>Starred</span>
            <ArrowDownIcon />
          </button>
          <PopoverMenu id="starred" header="Starred boards" classNames="starred-borads-popper header-popper-menu">
            <StarredBoardsMenuContent starredBoards={starredBoards} onClose={this.onClose} onStar={this.onStar} />
          </PopoverMenu>
          <button className="btn-create" onClick={this.onBtnCreate}>
            Create
          </button>
        </div>
        <div>
          <HeaderSearch board={this.props.board} menu={this.props.menu} toggleMenu={this.props.toggleMenu} />
          <button
            className="btn-notifications"
            onClick={ev => {
              this.onBoards(ev, 'notification');
            }}>
            <NotificationsIcon />
          </button>
          <PopoverMenu id="notification" header="Notification" classNames="notification-menu header-popper-menu">
            <div className="notification-container">
              <div className="notification-header">
                <button className="notification-header-link">View all</button>
                <button className="notification-header-link">Mark all as read</button>
              </div>
              <div className="notification-content-main">
                <div className="notification-content">
                  {/* HERE COMES THE MAP RETURN DIVs */}
                  <div className="notification">
                    <div className="notification-inner">
                      <div className="notification-read-btn">
                        {/* this btn have a before with icon */}
                        <this.tooltip
                          title="Mark read"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 300 }}
                          placement="bottom">
                          <button></button>
                        </this.tooltip>
                      </div>
                      <div className="notification-inner-header">
                        <div>
                          <img alt="img" />
                        </div>
                        <span>notification title</span>
                      </div>
                      <div className="notification-inner-user">
                        <div className="user-avatar" alt={'Martin Sh.'}>
                          <Avatar />
                        </div>
                        <div className="user-name">
                          <span>Martin</span>
                        </div>
                      </div>
                      <div className="notification-inner-content">
                        <div className="icon">
                          <span></span>
                        </div>
                        <div className="description">
                          Made you an admin on the board <span>test</span> sep 24, 2021, 10:05am
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverMenu>
          <Avatar className="avatar" alt={user.fullname} src="/static/images/avatar/3.jpg" />
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

const mapStateToProps = state => {
  return {
    isPopoverOpen: state.boardModule.boards,
    boards: state.boardModule.boards,
    board: state.boardModule.board,
    user: state.userModule.user,
    menu: state.systemModule.menu,
  };
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader));
