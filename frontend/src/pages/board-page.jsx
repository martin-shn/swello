import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { boardService } from '../services/board.service';
import { updateBoard, loadBoard } from '../store/actions/board.actions';
import { PopoverScreen } from '../cmps/popover-screen';
import { utilService } from '../services/util.service';
import { CardPage } from './card-page';
import { Route } from 'react-router';
import { CircularProgress } from '@mui/material';

export class _BoardPage extends Component {
  state = {
    activeListId: null, // only one add-card-to-list form can be active at all times.
    popoverListId: null, // only one popover can be active at all times
    isAddingList: false,
  };

  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.props.loadBoard(boardId);
  }

  // UI ACTIONS

  onAddingCard = listId => {
    this.setState({ activeListId: listId });
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
    if (!this.props.board) return <CircularProgress />;
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
        <TopPanel title={title} members={members} onUpdateTitle={this.onUpdateTitle} />
        <PopoverScreen
          isOpen={popoverListId ? true : false}
          onTogglePopover={this.onTogglePopover}
        />
        <Route path="/board/:boardId/card/:cardId" component={CardPage} />
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
  loadBoard,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

export const BoardPage = connect(mapStateToProps, mapDispatchToProps)(_BoardPage);
