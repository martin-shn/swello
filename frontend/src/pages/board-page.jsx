import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { togglePopover } from '../store/actions/system.actions';
import { updateBoard, loadBoard } from '../store/actions/board.actions';
import { hideLoadingPage, showLoadingPage } from '../store/actions/system.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { utilService } from '../services/util.service';
import { CardPage } from './card-page';
import { Route } from 'react-router';
import { LoaderPage } from '../cmps/loader/loader-page';

export class _BoardPage extends Component {
  state = {
    activeList: {
      // only one add-card-to-list form can be active at all times.
      id: null,
      isTopAdd: false,
    },
    // popoverListId: null, // only one popover can be active at all times
    isAddingList: false,
  };

  async componentDidMount() {
    this.props.showLoadingPage();
    const { boardId } = this.props.match.params;
    await this.props.loadBoard(boardId);
    this.props.hideLoadingPage();
  }

  // UI ACTIONS

  onAddingCard = listId => {
    this.setState(prevState => ({ activeList: { ...prevState.activeList, id: listId } }));
  };

  onAddingTopCard = (isOpen, listId) => {
    if (isOpen) {
      this.onTogglePopover(null);
      this.setState({ activeList: { id: listId, isTopAdd: true } });
    } else {
      this.setState({ activeList: { id: null, isTopAdd: false } });
    }
  };

  onAddingList = isAddingList => {
    this.setState({ isAddingList });
  };

  onTogglePopover = listId => {
    this.setState({ popoverListId: listId });
  };

  // DATA ACTIONS

  onAddList = ev => {
    ev.preventDefault();
    const { board } = this.props;
    const listTitle = ev.target.title.value;
    ev.target.reset();
    const updatedBoard = boardService.addList(board, listTitle);
    this.props.updateBoard(updatedBoard);
    this.setState({ isAddingList: false });
  };

  onCopyList = (list, title) => {
    const copyList = JSON.parse(JSON.stringify(list));
    copyList.title = title;
    copyList.id = utilService.makeId();
    const { board } = this.state;
    const { lists } = board;
    const listIdx = lists.findIndex(currList => currList.id === list.id);
    const updatedBoard = {
      ...board,
      lists: [...lists.slice(0, listIdx + 1), copyList, ...lists.slice(listIdx + 1, lists.length)],
    };
    this.setState({ board: updatedBoard }, this.onUpdateBoard);
  };

  onMoveList = (currIdx, newIdx) => {
    if (currIdx === newIdx) return;
    const { board } = this.state;
    const { lists } = board;
    const currList = lists[currIdx];
    let newLists;
    if (newIdx === 0) {
      newLists = [currList, ...lists.slice(0, currIdx), ...lists.splice(currIdx + 1, lists.length)];
    } else if (newIdx === lists.length - 1) {
      newLists = [...lists.slice(0, currIdx), ...lists.splice(currIdx + 1, lists.length), currList];
    } else if (newIdx > currIdx) {
      newLists = [
        ...lists.slice(0, currIdx),
        ...lists.slice(currIdx + 1, newIdx + 1),
        currList,
        ...lists.slice(newIdx + 1, lists.length),
      ];
    } else if (currIdx < newIdx) {
      newLists = [
        ...lists.slice(0, newIdx),
        currList,
        ...lists.slice(newIdx, currIdx),
        ...lists.slice(currIdx + 1, lists.length),
      ];
    }
    const updatedBoard = { ...board, lists: newLists };
    this.setState({ board: updatedBoard }, this.onUpdateBoard);
  };

  onTogglePopover = listId => {
     this.props.togglePopover(listId);
  }
    
  onUpdateTitle = title => {
    const { board } = this.props;
    const updatedBoard = { ...board, title };
    this.props.updateBoard(updatedBoard);
  };

  onListUpdated = updatedList => {
    const { board } = this.props;
    const updatedBoard = boardService.updateList(board, updatedList);
    this.props.updateBoard(updatedBoard);
  };

  onUpdateBoard = () => {
    this.props.updateBoard(this.props.board);
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (this.props.isLoadingPage) return <LoaderPage />;
    const { activeList, isAddingList, isCardPageOpen } = this.state;
    const {popoverListId} = this.props;
    const { title, members, lists, style } = this.props.board;
    
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
        <Route path="/board/:boardId/card/:cardId" component={CardPage} />
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
  togglePopover,
  loadBoard,
  hideLoadingPage,
  showLoadingPage,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
    popoverListId: state.systemModule.popoverListId,
    isLoadingPage: state.systemModule.isLoadingPage,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
