import React from 'react';
import { BoardList } from '../cmps/board-list';

import { storageService } from '../services/async-storage.service';
import { boardService } from '../services/board.service';

export class UserBoards extends React.Component {
  state = {
    isStar: true,
  };

  componentDidMount() {
    storageService.init();
    this.setState({boards: boardService.query()})
  }
  

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
