import React, { Component } from 'react';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';

const DUMMY_BG =
  'https://trello-backgrounds.s3.amazonaws.com/5f52ac04a60f498ce74a6b64/1280x856/fa5aaef20b1be05b0c9cf24debcad762/hero7.jpg';

export class BoardPage extends Component {
  render() {
    return (
      <main className="board-page flex column" style={{ backgroundImage: `url('${DUMMY_BG}')` }}>
        <TopPanel />
        <ListAll />
      </main>
    );
  }
}
