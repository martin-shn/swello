import React from 'react';
import { BoardList } from '../cmps/board-list';

export class UserBoards extends React.Component {
  state = {
    isStar: true,
  };

  render() {
    const { isStar } = this.state;
    return (
      <section className="user-boards">
        {isStar && <h3 className="star">Starred boards</h3>}
        {isStar && <BoardList isStarred />}
        <h3>YOUR BOARDS</h3>
        <BoardList isAdd />
        <h3>GUEST BOARDS</h3>
        <BoardList />
      </section>
    );
  }
}
