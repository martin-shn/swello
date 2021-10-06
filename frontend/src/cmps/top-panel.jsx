import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ReactComponent as BtnBoardIcon } from '../assets/svg/board-btns/btn-board.svg';
import { ReactComponent as BtnDashBoardIcon } from '../assets/svg/board-btns/btn-dashboard.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { setCardPopover, toggleSideMenu } from '../store/actions/system.actions';
import { updateBoard } from '../store/actions/board.actions';
import { CardPopover } from './card/card-popover';
import { AppAvatar } from './general/app-avatar';
import { AvatarGroup } from '@mui/material';
import { BoardOptionsMenu } from './board-options-menu';

class _TopPanel extends React.Component {
  state = {
    currPage: this.props.location.pathname.endsWith('dashboard') ? 'dashboard' : 'board',
    isMenuModalOpen: false,
  }
  btnRef = React.createRef()
  onStar = (user, boardId, isStar) => {
    let newUser = { ...user };
    if (isStar) newUser.starredBoardsIds = newUser.starredBoardsIds.filter(id => id !== boardId);
    else newUser.starredBoardsIds.push(boardId);
    this.props.onUpdateUser(newUser);
  }
  onOpenPopover = (ev) => {
    this.props.setCardPopover('invite-main', ev.target, null);
  }
  onCloseMenuModal = () => {
    this.setState({ isMenuModalOpen: false })
  }
  onChangePage = (page) => {
    const { board } = this.props;
    page === 'dashboard' ? this.props.history.push(`/board/${board._id}/dashboard`) : this.props.history.push(`/board/${board._id}`)
    this.setState({ currPage: page, isMenuModalOpen: false })
  }
  render() {
    const { title, members, onUpdateTitle, user, board, cardPopover } = this.props;
    const { currPage, isMenuModalOpen } = this.state;
    const isStar = user.starredBoardsIds.includes(board._id);
    return (
      <section className="top-panel full flex space-between">
        <div className="flex align-center">
          <button
            ref={this.btnRef}
            onClick={() => {
              this.setState({ isMenuModalOpen: true })
            }}>
            {currPage === 'board' ?
              <>
                <BtnBoardIcon />
                Board
                <KeyboardArrowDownIcon />
              </> :
              <>
                <BtnDashBoardIcon />
                Dashboard
                <KeyboardArrowDownIcon />
              </>}
          </button>
          <BoardOptionsMenu anchor={this.btnRef.current} isOpen={isMenuModalOpen} onClose={this.onCloseMenuModal} currPage={currPage} onChangePage={this.onChangePage} />
          <h1
            className="board-name content-editable"
            contentEditable
            suppressContentEditableWarning={true}
            onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
            onBlur={ev => onUpdateTitle(ev.target.innerText)}>
            {title}
          </h1>
          <button
            className={(isStar ? 'starred' : '') + ` star`}
            onClick={() => {
              this.onStar(user, board._id, isStar);
            }}>
            <StarOutlineIcon />
          </button>
          <AvatarGroup max={4} spacing={3} className="members">
            {members?.map(member => (
              <AppAvatar key={member._id} member={member} />
            ))}
          </AvatarGroup>
          <button
            name="invite-main"
            className="btn-invite"
            onClick={ev => {
              this.onOpenPopover(ev);
            }}>
            Invite
          </button>
        </div>
        {cardPopover.name === 'invite-main' && <CardPopover />}
        <div>
          <button className="btn-menu" onClick={this.props.toggleSideMenu}>
            <MoreHorizIcon />
            Show Menu
          </button>
        </div>
      </section>
    );
  }
};

const mapDispatchToProps = {
  updateBoard,
  setCardPopover,
  toggleSideMenu,
};

const mapStateToProps = state => ({
  board: state.boardModule.board,
  cardPopover: state.systemModule.cardPopover,
});

export const TopPanel = withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(_TopPanel)));
