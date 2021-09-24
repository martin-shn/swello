import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { storageService } from '../services/async-storage.service';
import { loadBoard, updateBoard } from '../store/actions/board.actions';
import { PopoverScreen } from '../cmps/popover-screen';

const DUMMY_BG =
  'https://trello-backgrounds.s3.amazonaws.com/5f52ac04a60f498ce74a6b64/1280x856/fa5aaef20b1be05b0c9cf24debcad762/hero7.jpg';
export class _BoardPage extends Component {
  state = {
    activeListId: null, // only one add-card-to-list form can be active at all times.
    popoverListId: null,
  };

  async componentDidMount() {
    await this.props.loadBoard(this.props.match.params.boardId);
    if (!this.props.board) this.props.history.replace('/board');
  }

  onAddingCard = listId => {
    this.setState({ activeListId: listId });
  };

  onTogglePopover = listId => {
    this.setState({ popoverListId: listId });
  };

  onUpdateBoard = update => {
    const { board } = this.props;
    const updateBoard = { ...board, ...update };
    this.props.updateBoard(updateBoard);
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (!this.props.board) return <div>Loading</div>;
    const { activeListId, popoverListId } = this.state;
    const { title, members, lists, style } = this.props.board;
    return (
      <main
        className="board-page"
        style={{
          backgroundImage: style.imgUrl || 'none',
          backgroundColor: style.bgColor || 'unset',
        }}>
        <AppHeader />
        <TopPanel title={title} members={members} onUpdateBoard={this.onUpdateBoard} />
        <PopoverScreen
          isOpen={popoverListId ? true : false}
          onTogglePopover={this.onTogglePopover}
        />
        <ListAll
          lists={lists}
          activeListId={activeListId}
          popoverListId={popoverListId}
          onTogglePopover={this.onTogglePopover}
          onAddingCard={this.onAddingCard}
        />
      </main>
    );
  }
}

const mapDispatchToProps = {
  loadBoard,
  updateBoard,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
