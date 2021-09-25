import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { togglePopover } from '../store/actions/system.actions';
import { updateBoard, loadBoard } from '../store/actions/board.actions';
import { hideLoadingPage, showLoadingPage } from '../store/actions/system.actions';
import { onUpdateUser } from '../store/actions/user.actions';
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
    const { board } = this.props;
    const updatedBoard = boardService.copyList(board, list, title)
    this.props.updateBoard(updatedBoard)
  };

  onMoveList = (currIdx, newIdx) => {
    if (currIdx === newIdx) return;
    const { board } = this.props;
    const updatedBoard = boardService.moveList(board, currIdx, newIdx)
    this.props.updateBoard(updatedBoard)
  }

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

  onUpdateUser = async (user) => {
    await this.props.onUpdateUser(user)
  }

  // TODO: add dynamic text color using contrast-js
  render() {
    if (this.props.isLoadingPage) return <LoaderPage />;
    const { activeList, isAddingList, isCardPageOpen } = this.state;
    const { popoverListId } = this.props;
    const { title, members, lists, style } = this.props.board;

    return (
      <main
        className="board-page"
        style={{
          backgroundImage: `url(${style.imgUrl})` || 'none',
          backgroundColor: style.bgColor || 'unset',
        }}>
        <AppHeader />
        <TopPanel title={title} members={members} onUpdateTitle={this.onUpdateTitle} user={this.props.user} board={this.props.board} onUpdateUser={this.onUpdateUser}/>
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
