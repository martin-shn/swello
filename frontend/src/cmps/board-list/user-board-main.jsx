import React from 'react';
import { connect } from 'react-redux';
import { loadBoards } from '../../store/actions/board.actions';
import { showLoadingPage, hideLoadingPage } from '../../store/actions/system.actions';
import { BoardList } from './board-list';
import {LoaderPage} from '../loader/loader-page'


class _UserBoardMain extends React.Component {
  state = {
    showStarred: false,
  };

  async componentDidMount() {
    this.props.showLoadingPage();
    const { user } = this.props;
    await this.props.loadBoards({ byUserId: user._id })
    // this.setShowStarred()
    this.props.hideLoadingPage();
  }

  // setShowStarred = () => {
  //   this.setState({ showStarred: this.props.boards.some(board => this.props.user.starredBoardsIds.includes(board._id)) })
  // }

  render() {
    if (this.props.isLoadingPage) return <LoaderPage />;
    const { boards, user } = this.props;
    const showStarred  = boards.some(board => user.starredBoardsIds.includes(board._id))

    if (!boards && !user) return <div>Loading...</div>
    return (
      <section className='user-boards-main'>
        {showStarred && <h3 className='star'>Starred boards</h3>}
        {showStarred && <BoardList boards={boards.filter(board => user.starredBoardsIds.includes(board._id))} isStarred />}
        <h3 className="your-boards">YOUR BOARDS</h3>
        <BoardList boards={boards.filter(board => board.createdBy._id === user._id && !user.starredBoardsIds.includes(board._id))} isAdd  />
        <h3 className="guest-boards">GUEST BOARDS</h3>
        <BoardList boards={boards.filter(board => board.members.some(member => member._id === user._id) && board.createdBy._id !== user._id && !user.starredBoardsIds.includes(board._id))} />
      </section>
    );
  }
}


const mapDispatchToProps = {
  loadBoards,
  showLoadingPage,
  hideLoadingPage
};

const mapStateToProps = state => {
  return {
    user: state.userModule.user,
    boards: state.boardModule.boards,
    isLoadingPage: state.systemModule.isLoadingPage,
  };
};

export const UserBoardMain = connect(mapStateToProps, mapDispatchToProps)(_UserBoardMain);
