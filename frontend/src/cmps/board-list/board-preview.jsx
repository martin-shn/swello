import React from 'react';
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';

export class BoardPreview extends React.Component {
  state = {};

  onStar = (ev) => {
    ev.preventDefault()
    let user = userService.getLoggedinUser()
    user.starredBoards.push({
      id: utilService.makeId(),
      boardId: this.props.board._id
    })
    this.props.updateUser(user)
  }

  render() {
    const { isAdd, isStarred, board } = this.props;
    const imgUrl = board?.style.imgUrl?board.style.imgUrl:'';
    const bgColor = board?.style.bgColor?board.style.bgColor:'inherit';

    if (isAdd)
      return (
        <a href="/board" className="board-preview new-board" style={{ backgroundColor: '#f0f2f4' }}>
          <span></span>
          <div>Create new board</div>
        </a>
      );
    else
      return (
        <a
          href={`/board/${board._id}`}
          className="board-preview"
          style={{ backgroundImage: `url(${imgUrl})`, backgroundColor: bgColor }}>
          <span></span>
          <div>
            {board.title}
            {isStarred === 'true' && <span>{board.title}</span>}
          </div>
          <span className={`${isStarred === 'true' ? 'starred' : ''} star`} onClick={(ev)=>this.onStar(ev)}></span>
        </a>
      );
  }
}
