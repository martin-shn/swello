import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import { showPopover, hidePopover } from '../store/actions/system.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { utilService } from '../services/util.service';
import { CardPage } from './card-page';

export class _BoardPage extends Component {
  state = {
    activeList: { // only one add-card-to-list form can be active at all times.
      id: null,
      isTopAdd: false
    },
    // popoverListId: null, // only one popover can be active at all times
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.isPopoverOpen!==this.props.isPopoverOpen ){
  //     console.log('change');
  //     this.setState({popoverListId:null})
  //   }
  // }
  
  onAddingCard = listId => {
    this.setState(prevState => ({ activeList: { ...prevState.activeList, id: listId } }));
  };

  onAddingTopCard = (isOpen, listId) => {
    if (isOpen) {
      this.onTogglePopover(null)
      this.setState({ activeList: { id: listId, isTopAdd: true } })
    } else {
      this.setState({ activeList: { id: null, isTopAdd: false } })
    }
  }

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

  onCopyList = (list, title) => {
    const copyList = JSON.parse(JSON.stringify(list))
    copyList.title = title;
    copyList.id = utilService.makeId()
    const { board } = this.state;
    const { lists } = board;
    const listIdx = lists.findIndex(currList => currList.id === list.id)
    const updatedBoard = { ...board, lists: [...lists.slice(0, listIdx + 1), copyList, ...lists.slice(listIdx + 1, lists.length)] }
    this.setState({ board: updatedBoard }, this.onUpdateBoard)
  }

  onMoveList = (currIdx, newIdx) => {
    if (currIdx === newIdx) return;
    const { board } = this.state;
    const { lists } = board;
    const currList = lists[currIdx];
    let newLists;
    if (newIdx === 0) {
      newLists = [currList, ...lists.slice(0, currIdx), ...lists.splice(currIdx + 1, lists.length)]
    } else if (newIdx === lists.length - 1) {
      newLists = [...lists.slice(0, currIdx), ...lists.splice(currIdx + 1, lists.length), currList]
    } else if (newIdx > currIdx) {
      newLists = [...lists.slice(0, currIdx), ...lists.slice(currIdx + 1, newIdx + 1), currList, ...lists.slice(newIdx + 1, lists.length)]
    } else if (currIdx < newIdx) {
      newLists = [...lists.slice(0, newIdx), currList, ...lists.slice(newIdx, currIdx), ...lists.slice(currIdx + 1, lists.length)]
    }
    const updatedBoard = { ...board, lists: newLists }
    this.setState({ board: updatedBoard }, this.onUpdateBoard)
  }

  onUpdateTitle = title => {
    this.setState({ board: { ...this.state.board, title } }, this.onUpdateBoard);
  };

  onTogglePopover = listId => {
    listId?this.props.showPopover(listId):this.props.hidePopover();
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
    const { activeList, isAddingList, isCardPageOpen } = this.state;
    const {popoverListId} = this.props;
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
          isOpen={popoverListId}
          onTogglePopover={this.onTogglePopover}
        />
        {isCardPageOpen && <CardPage card={this.getCardById(this.props.match.params.cardId)} />}
        <ListAll
          lists={lists}
          activeList={activeList}
          popoverListId={popoverListId}
          onTogglePopover={this.onTogglePopover}
          onAddingCard={this.onAddingCard}
          onAddingTopCard={this.onAddingTopCard}
          isAddingList={isAddingList}
          onAddingList={this.onAddingList}
          onAddList={this.onAddList}
          onListUpdated={this.onListUpdated}
          onCopyList={this.onCopyList}
          onMoveList={this.onMoveList}
        />
      </main>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
  showPopover,
  hidePopover,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
    popoverListId: state.systemModule.popoverListId,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
