import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { utilService } from '../services/util.service';

const DUMMY_BG =
  'https://trello-backgrounds.s3.amazonaws.com/5f52ac04a60f498ce74a6b64/1280x856/fa5aaef20b1be05b0c9cf24debcad762/hero7.jpg';
export class _BoardPage extends Component {
  state = {
    activeListId: null, // only one add-card-to-list form can be active at all times.
    popoverListId: null, // only one popover can be active at all times
    isAddingList: false,
    board: null
  };

  async componentDidMount() {
    const board = await boardService.getById(this.props.match.params.boardId);
    if (!board) this.props.history.replace('/board');
    this.setState({ board })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.board !== this.state.board) {

    }
  }

  onAddingCard = listId => {
    this.setState({ activeListId: listId });
  };

  onAddingList = isAddingList => {
    this.setState({ isAddingList });
  };

  onAddList = ev => {
    ev.preventDefault();
    const { board } = this.state;
    const title = ev.target.title.value;
    const id = utilService.makeId();
    const list = { id, title, tasks: [], style: {} };
    const updatedBoard = { ...board, lists: [...board.lists, list] };
    this.setState({ board: updatedBoard, isAddingList: false }, () => {
      this.onUpdateBoard()
      ev.target.reset()
    })
  };

  onUpdateTitle = (title) => {
    this.setState({ board: { ...this.state.board, title } }, this.onUpdateBoard)
  }

  onTogglePopover = listId => {
    this.setState({ popoverListId: listId });
  };

  onListUpdated = (updatedList) => {
    const updatedBoard = { ...this.state.board, lists: this.state.board.lists.map(list => list.id === updatedList.id ? updatedList : list) }
    this.setState({ board: updatedBoard }, this.onUpdateBoard)
  }

  onUpdateBoard = () => {
    this.props.updateBoard(this.state.board);
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (!this.state.board) return <div>Loading</div>;
    const { activeListId, popoverListId, isAddingList } = this.state;
    const { title, members, lists, style } = this.state.board;
    return (
      <main
        className="board-page"
        style={{
          backgroundImage: `url(${style.imgUrl})` || 'none',
          backgroundColor: style.bgColor || 'unset',
        }}>
        <AppHeader />
        <TopPanel title={title} members={members} onUpdateTitle={this.onUpdateTitle} />
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
  updateBoard,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
