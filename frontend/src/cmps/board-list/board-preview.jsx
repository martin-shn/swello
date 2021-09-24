import React from 'react';
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { connect } from 'react-redux';
import { createBoard } from '../../store/actions/board.actions';
import { onUpdateUser } from '../../store/actions/user.actions';

class _BoardPreview extends React.Component {
  state = {
    isModal: false,
    markedId: 0,
    boardName: '',
    isAllowed: 'not-allowed',
  };

  bgcs = [
    { bgc: 'https://images.unsplash.com/photo-1632269826291-2cb3009bf43d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400' },
    { bgc: 'https://images.unsplash.com/photo-1632286988262-dee7280ee48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400' },
    { bgc: 'https://images.unsplash.com/photo-1632301497603-33fb3d7afdd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400' },
    { bgc: 'https://images.unsplash.com/photo-1632303283130-8a2ec7823251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNjMyNDE5NzU2&ixlib=rb-1.2.1&q=80&w=400', title: 'abstract 3d illustration of geometrical objects with abstract light scattering on them.' },
    { bgc: 'rgb(0, 121, 191)', title: 'blue' },
    { bgc: 'rgb(210, 144, 52)', title: 'orange' },
    { bgc: 'rgb(81, 152, 57)', title: 'green' },
    { bgc: 'rgb(176, 70, 50)', title: 'red' }
  ]

  onStar = async (ev) => {
    ev.preventDefault();
    const { user } = this.props;
    const { isStarred } = this.props;
    let updatedUser = { ...user };
    const { starredBoardsIds } = user;
    if (isStarred) {
      updatedUser = { ...updatedUser, starredBoardsIds: starredBoardsIds.filter(id => id !== this.props.board._id) }
    } else {
      updatedUser = { ...updatedUser, starredBoardsIds: [...starredBoardsIds, this.props.board._id] }
    }
    await this.props.onUpdateUser(updatedUser);
    this.props.setShowStarred()
  };

  onNew = () => {
    this.setState({ isModal: !this.state.isModal });
  };

  onCloseModal = (ev) => {
    this.setState({ isModal: false });
  };

  handleBgc = (targetId) => {
    this.setState({ markedId: targetId })
  }

  handleChange = ({ target }) => {
    this.setState({ boardName: target.value, isAllowed: target.value.length > 0 ? 'allowed' : 'not-allowed' })
  }

  onCreateNewBoard = async () => {
    const boardToAdd = {
      title: this.state.boardName,
      style: {},
      members: []
    }
    this.state.markedId < 4 ?
      (boardToAdd.style.imgUrl = (this.bgcs[this.state.markedId].bgc).substring(0, this.bgcs[this.state.markedId].bgc.length - 6)) :
      (boardToAdd.style.bgColor = this.bgcs[this.state.markedId].bgc);
    console.log('create new board in data, board is:', boardToAdd);

    const newBoard = await this.props.createBoard(boardToAdd)
    console.log('new board:', newBoard);
    window.location.href = (`/board/${newBoard._id}`)
  }

  render() {
    const { isAdd, isStarred, board } = this.props;
    const imgUrl = board?.style.imgUrl ? board.style.imgUrl : '';
    const bgColor = board?.style.bgColor ? board.style.bgColor : 'inherit';
    if (isAdd) {
      return (
        <>
          <button onClick={this.onNew} className='board-preview new-board' style={!isAdd ? { backgroundColor: '#f0f2f4' } : {}}>
            <span></span>
            <div>Create new board</div>
            { }
          </button>
          <Modal showCloseIcon={true} open={this.state.isModal} onClose={this.onCloseModal}>
            <div className="new-board">
              {this.state.markedId < 4 && <div className="main img" style={{ backgroundImage: `url(${this.bgcs[this.state.markedId].bgc})` }}></div>}
              {this.state.markedId > 3 && <div className="main" style={{ backgroundColor: this.bgcs[this.state.markedId].bgc }}></div>}
              <input autoComplete="off" autoCorrect="off" spellCheck="false" type="text" className="new-board-name" placeholder="Add board title" aria-label="Add board title" data-test-id="create-board-title-input" value={this.state.boardName} onChange={this.handleChange} />
              <div className="side">
                <div className={`${this.state.markedId === 0 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(0) }} style={{ backgroundImage: `url(${this.bgcs[0].bgc})` }} title={this.bgcs[0]?.title}></div>
                <div className={`${this.state.markedId === 1 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(1) }} style={{ backgroundImage: `url(${this.bgcs[1].bgc})` }} title={this.bgcs[1]?.title}></div>
                <div className={`${this.state.markedId === 2 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(2) }} style={{ backgroundImage: `url(${this.bgcs[2].bgc})` }} title={this.bgcs[2]?.title}></div>
                <div className={`${this.state.markedId === 3 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(3) }} style={{ backgroundImage: `url(${this.bgcs[3].bgc})` }} title={this.bgcs[3]?.title}></div>
                <div className={`${this.state.markedId === 4 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(4) }} style={{ backgroundColor: `${this.bgcs[4].bgc}` }} title={this.bgcs[4]?.title}></div>
                <div className={`${this.state.markedId === 5 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(5) }} style={{ backgroundColor: `${this.bgcs[5].bgc}` }} title={this.bgcs[5]?.title}></div>
                <div className={`${this.state.markedId === 6 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(6) }} style={{ backgroundColor: `${this.bgcs[6].bgc}` }} title={this.bgcs[6]?.title}></div>
                <div className={`${this.state.markedId === 7 ? 'marked' : ''}`} onClick={(ev) => { this.handleBgc(7) }} style={{ backgroundColor: `${this.bgcs[7].bgc}` }} title={this.bgcs[7]?.title}></div>
                <div style={{ backgroundColor: "rgb(255, 255, 255)" }} title="More"></div>
              </div>
            </div>
            <div className="btn">
              <button className={this.state.isAllowed} disabled={this.state.isAllowed === 'allowed' ? false : true} onClick={this.onCreateNewBoard}>Create board</button>
            </div>
          </Modal>
        </>
      );
    } else
      return (
        <a href={`/board/${board._id}`} className='board-preview' style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: bgColor }}>
          <span></span>
          <div>
            {board.title}
            {isStarred === 'true' && <span>{board.title}</span>}
          </div>
          <span className={`${isStarred ? 'starred' : ''} star`} onClick={(ev) => this.onStar(ev)}></span>
        </a>
      );
  }
}


const mapDispatchToProps = {
  createBoard,
  onUpdateUser
};

const mapStateToProps = state => {
  return {
    boards: state.boardModule.boards,
    user: state.userModule.user
  };
};

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview);
