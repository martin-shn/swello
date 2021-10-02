import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { togglePopover } from '../store/actions/system.actions';
import { updateBoard, loadBoard, clearBoard } from '../store/actions/board.actions';
import { hideLoadingPage, showLoadingPage } from '../store/actions/system.actions';
import { onUpdateUser } from '../store/actions/user.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { CardPage } from './card-page';
import { Route } from 'react-router';
import { LoaderPage } from '../cmps/loader/loader-page';
import { SideMenu } from '../cmps/side-menu/side-menu';
import { Dashboard } from '../cmps/dashboard/dashboard';


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

  componentDidUpdate(prevProps, prevState) {
    const { boardId } = this.props.match.params;
    if (prevProps.match.params.boardId !== this.props.match.params.boardId)
      this.props.loadBoard(boardId);
  }

  componentWillUnmount() {
    this.props.clearBoard();
  }

  // UI ACTIONS

  onAddingCard = listId => {
    this.setState({ activeList: { id: listId, isTopAdd: false } });
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
  board = this.props.board;
  onAddList = ev => {
    ev.preventDefault();
    const listTitle = ev.target.title.value;
    ev.target.reset();
    const updatedBoard = boardService.addList(this.board, listTitle);
    this.props.updateBoard(updatedBoard);
    this.setState({ isAddingList: false });
  };

  onCopyList = (list, title) => {
    const updatedBoard = boardService.copyList(this.board, list, title);
    this.props.updateBoard(updatedBoard);
  };

  onMoveList = (currIdx, newIdx) => {
    if (currIdx === newIdx) return;
    const updatedBoard = boardService.moveList(this.board, currIdx, newIdx);
    this.props.updateBoard(updatedBoard);
  };

  onTogglePopover = listId => {
    this.props.togglePopover(listId);
  };

  onUpdateTitle = title => {
    const updatedBoard = { ...this.board, title };
    this.props.updateBoard(updatedBoard);
  };

  onListUpdated = updatedList => {
    const updatedBoard = boardService.updateList(this.board, updatedList);
    this.props.updateBoard(updatedBoard);
  };

  onMoveAllCardsToList = (currListId, newListId) => {
    const updatedBoard = boardService.moveAllCardsToList(this.board, currListId, newListId)
    this.props.updateBoard(updatedBoard)
  }

  onUpdateUser = async user => {
    await this.props.onUpdateUser(user);
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    if (!this.props.board || this.props.isLoadingPage)
      return (
        <>
          <AppHeader />
          <LoaderPage />;
        </>
      );
    if (!this.props.board) this.props.history.push('/board');

    const {
      activeList,
      isAddingList,
      // isCardPageOpen
    } = this.state;
    const { popoverListId, board } = this.props;
    const { title, members, lists, style } = this.props.board;

    return (
      <main
        className="board-page"
        style={{
          backgroundImage: `url(${style.imgUrl})` || 'none',
          backgroundColor: style.bgColor || 'unset',
        }}>
        <AppHeader />
        <TopPanel
          title={title}
          members={members}
          onUpdateTitle={this.onUpdateTitle}
          user={this.props.user}
          board={this.props.board}
          onUpdateUser={this.onUpdateUser}
        />
        <PopoverScreen isOpen={popoverListId} onTogglePopover={this.onTogglePopover} />
        <Route path="/board/:boardId/card/:cardId" component={CardPage} />
        <ListAll
          board={this.props.board}
          updateBoard={this.props.updateBoard}
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
          onMoveAllCardsToList={this.onMoveAllCardsToList}
        />
        <SideMenu />
        <Dashboard />
      </main>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
  clearBoard,
  togglePopover,
  loadBoard,
  hideLoadingPage,
  showLoadingPage,
  onUpdateUser,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
    popoverListId: state.systemModule.popoverListId,
    isLoadingPage: state.systemModule.isLoadingPage,
    user: state.userModule.user,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
