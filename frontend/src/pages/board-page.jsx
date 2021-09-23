import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { storageService } from '../services/async-storage.service';
import { loadBoard } from '../store/actions/board.actions';

const DUMMY_BG =
  'https://trello-backgrounds.s3.amazonaws.com/5f52ac04a60f498ce74a6b64/1280x856/fa5aaef20b1be05b0c9cf24debcad762/hero7.jpg';
const DUMMY_LISTS = [
  { _id: 'l1' },
  { _id: 'l2' },
  { _id: 'l3' },
  { _id: 'l4' },
  { _id: 'l5' },
  { _id: 'l6' },
  { _id: 'l7' },
  { _id: 'l8' },
  { _id: 'l9' },
];
export class _BoardPage extends Component {
  state = {};

  async componentDidMount() {
    this.props.loadBoard(this.props.match.boardId);
  }

  onAddingCard = listId => {
    this.setState({ activeListId: listId });
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    return (
      <main className="board-page" style={{ backgroundImage: `url('${DUMMY_BG}')` }}>
        <AppHeader />
        <TopPanel />
        <ListAll lists={DUMMY_LISTS} onAddingCard={this.onAddingCard} />
      </main>
    );
  }
}

const mapDispatchToProps = {
  loadBoard,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
