import React from 'react';

import { connect } from 'react-redux';
import { createBoard } from '../../store/actions/board.actions';
import { onUpdateUser } from '../../store/actions/user.actions';
import {BoardAdd} from './board-add'

class _BoardPreview extends React.Component {
  state = {
    isModal: false,
  };


  onStar = async ev => {
    ev.preventDefault();
    const { user } = this.props;
    const { isStarred } = this.props;
    let updatedUser = { ...user };
    const { starredBoardsIds } = user;
    if (isStarred) {
      updatedUser = {
        ...updatedUser,
        starredBoardsIds: starredBoardsIds.filter(id => id !== this.props.board._id),
      };
    } else {
      updatedUser = {
        ...updatedUser,
        starredBoardsIds: [...starredBoardsIds, this.props.board._id],
      };
    }
    this.props.onUpdateUser(updatedUser);
  };

  onNew = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  render() {
    const { isAdd, isStarred, board } = this.props;
    const imgUrl = board?.style.imgUrl ? board.style.imgUrl : '';
    const bgColor = board?.style.bgColor ? board.style.bgColor : 'inherit';
    if (isAdd) {
      return (
        <>
          <button
            onClick={this.onNew}
            className="board-preview new-board"
            style={!isAdd ? { backgroundColor: '#f0f2f4' } : {}}>
            <span></span>
            <div>Create new board</div>
            {}
          </button>
          <BoardAdd isModal={this.state.isModal} onClose={this.onNew} />
        </>
      );
    } else
      return (
        <a
          href={`/board/${board._id}`}
          className={(bgColor!=='inherit'?'bg-color':'') + ' board-preview'}
          style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: bgColor }}>
          <span></span>
          <div>
            {board.title}
            {isStarred === 'true' && <span>{board.title}</span>}
          </div>
          <span
            className={`${isStarred ? 'starred' : ''} star`}
            onClick={ev => this.onStar(ev)}></span>
        </a>
      );
  }
}

const mapDispatchToProps = {
  createBoard,
  onUpdateUser,
};

const mapStateToProps = state => {
  return {
    boards: state.boardModule.boards,
    user: state.userModule.user,
  };
};

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview);
