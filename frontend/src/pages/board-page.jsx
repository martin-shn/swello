import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { utilService } from '../services/util.service';
import { CardPage } from './card-page';

export class _BoardPage extends Component {
  state = {
    activeListId: null, // only one add-card-to-list form can be active at all times.
    popoverListId: null, // only one popover can be active at all times
    isAddingList: false,
    isCardPageOpen: false,
    board: null,
  };

  async componentDidMount() {
    const board = await boardService.getById(this.props.match.params.boardId);
    if (!board) this.props.history.replace('/board');
    this.setState({ board });
    const { cardId } = this.props.match.params;
    if (cardId) this.setState({ isCardPageOpen: true });
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
    const list = { id, title, cards: [], style: {} };
    const updatedBoard = { ...board, lists: [...board.lists, list] };
    this.setState({ board: updatedBoard, isAddingList: false }, () => {
      this.onUpdateBoard();
      ev.target.reset();
    });
  };

  onUpdateTitle = title => {
    this.setState({ board: { ...this.state.board, title } }, this.onUpdateBoard);
  };

  onTogglePopover = listId => {
    this.setState({ popoverListId: listId });
  };

  onListUpdated = updatedList => {
    const updatedBoard = {
      ...this.state.board,
      lists: this.state.board.lists.map(list => (list.id === updatedList.id ? updatedList : list)),
    };
    this.setState({ board: updatedBoard }, this.onUpdateBoard);
  };

  onUpdateBoard = () => {
    this.props.updateBoard(this.state.board);
  };

  getCardById = id => {
    // TODO - move this to card page
    for (const list of this.state.board.lists) {
      for (const card of list.cards) {
        if (card.id === id) return card;
      }
    }
    return null;
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (!this.state.board) return <div>Loading</div>;
    const { activeListId, popoverListId, isAddingList, isCardPageOpen } = this.state;
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
        {isCardPageOpen && <CardPage card={this.getCardById(this.props.match.params.cardId)} />}
        <ListAll
          lists={lists}
          activeListId={activeListId}
          popoverListId={popoverListId}
          onTogglePopover={this.onTogglePopover}
          onAddingCard={this.onAddingCard}
          isAddingList={isAddingList}
          onAddingList={this.onAddingList}
          onAddList={this.onAddList}
          onListUpdated={this.onListUpdated}
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
