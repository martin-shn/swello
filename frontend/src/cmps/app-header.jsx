import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { togglePopover, setCardPopover, toggleMenu } from '../store/actions/system.actions';
import { createBoard, loadBoards } from '../store/actions/board.actions';
import { onUpdateUser, onLogout } from '../store/actions/user.actions';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { ReactComponent as CreateIcon } from '../assets/svg/create.svg';
import { BoardAdd } from './board-list/board-add';

// import MenuItem from '@mui/material/MenuItem';

import { PopoverMenu } from './header-popover-pages/popover-menu';
import { BoardsMenuContent } from './header-popover-pages/boards-menu-content';
import { StarredBoardsMenuContent } from './header-popover-pages/starredboards-menu-content';

// import { ReactComponent as StarredImage } from '../assets/svg/starred-board.svg';
import { HeaderSearch } from './header-popover-pages/header-search';
import { AppAvatar } from './general/app-avatar';
import { HeaderNotifications } from './header-popover-pages/header-notifications';
import { HeaderAccount } from './header-popover-pages/header-account';
import { HeaderMore } from './header-popover-pages/header-more';

class _AppHeader extends Component {
  state = {
    isModal: false,
  };

  componentDidMount () {
    const { user } = this.props;
    if (user)
      this.props.loadBoards({ byUserId: user._id });
  }

  componentDidUpdate (prevProps) {
    if (this.props.user && (this.props.user !== prevProps.user))
      this.props.loadBoards({ byUserId: this.props.user._id });

  }

  componentWillUnmount () {
    this.onClose();
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
  onStar = (ev, boardId) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.onClose();
    let newUser = { ...this.props.user };
    newUser.starredBoardsIds = newUser.starredBoardsIds.filter(id => id !== boardId);
    this.props.onUpdateUser(newUser);
  };

  copyTemplate = async () => {
    const { templates } = this.props;
    const { boardId } = this.props.match.params;
    const template = templates.filter((template) => template._id === boardId)[0];
    const newBoard = await this.props.createBoard(template);
    this.props.history.push(`/board/${ newBoard._id }`);
  }

  render () {
    const { isStarredMenuOpen } = this.state;
    const { isUserBoardsPage, boards, board, user, onLogout, isTemplate } = this.props;
    if (!user) return <></>;
    const starredBoards = boards.filter(board => user.starredBoardsIds.includes(board._id));
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
          {/* this button is only visible in mobile: */}
          <HeaderMore onBoards={this.onBoards} toggleMenu={this.props.toggleMenu} />
          <button
            id="composition-button"
            className="btn-board"
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
            className="btn-starred"
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
            <span className="txt-create">Create</span>
            <CreateIcon className="icon-create" />
          </button>
          {isTemplate&&<button className="btn-create" style={{backgroundColor:'#2e8af6'}} onClick={this.copyTemplate}>Use template</button>}
        </div>
        
        <div>
          <HeaderSearch board={this.props.board} menu={this.props.menu} toggleMenu={this.props.toggleMenu} />
          <button
            className={`btn-notifications${ user.notifications.some(notification => !notification.isRead) ? ' active' : '' }`}
            onClick={ev => {
              this.onBoards(ev, 'notification');
            }}>

            <NotificationsIcon />

          </button>
          <HeaderNotifications user={user} onUpdateUser={this.props.onUpdateUser} toggleMenu={this.props.toggleMenu} />
          {user && <AppAvatar onClick={ev => this.onBoards(ev, 'account')} member={user} />}
          <HeaderAccount user={user} onLogout={onLogout} history={this.props.history} />
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
  onLogout,
};

const mapStateToProps = state => {
  return {
    isPopoverOpen: state.boardModule.boards,
    boards: state.boardModule.boards,
    board: state.boardModule.board,
    user: state.userModule.user,
    menu: state.systemModule.menu,
    templates: state.boardModule.templates,
  };
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader));
