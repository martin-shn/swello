import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { storageService } from '../services/async-storage.service';
import { loadBoard, updateBoard } from '../store/actions/board.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { utilService } from '../services/util.service';

const DUMMY_BG =
  'https://trello-backgrounds.s3.amazonaws.com/5f52ac04a60f498ce74a6b64/1280x856/fa5aaef20b1be05b0c9cf24debcad762/hero7.jpg';
export class _BoardPage extends Component {
  state = {
    activeListId: null, // only one add-card-to-list form can be active at all times.
    popoverListId: null, // only one popover can be active at all times
    isAddingList: false,
  };

  async componentDidMount() {
    await this.props.loadBoard(this.props.match.params.boardId);
    if (!this.props.board) this.props.history.replace('/board');
  }

  onAddingCard = listId => {
    this.setState({ activeListId: listId });
  };

  onAddingList = isAddingList => {
    console.log('isAddingList', isAddingList);
    this.setState({ isAddingList });
  };

  onAddList = ev => {
    ev.preventDefault();
    const { board } = this.props;
    const title = ev.target.title.value;
    const id = utilService.makeId();
    const list = { id, title, tasks: [], style: {} };
    const updatedBoard = { ...board, lists: [...board.lists, list] };
    this.props.updateBoard(updatedBoard);
  };

  onTogglePopover = listId => {
    this.setState({ popoverListId: listId });
  };

  onUpdateBoard = update => {
    const { board } = this.props;
    const updatedBoard = { ...board, ...update };
    this.props.updateBoard(updatedBoard);
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (!this.props.board) return <div>Loading</div>;
    const { activeListId, popoverListId, isAddingList } = this.state;
    const { title, members, lists, style } = this.props.board;
    return (
      <main
        className="board-page"
        style={{
          backgroundImage: `url(${style.imgUrl})` || 'none',
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
          isAddingList={isAddingList}
          onAddingList={this.onAddingList}
          onAddList={this.onAddList}
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
