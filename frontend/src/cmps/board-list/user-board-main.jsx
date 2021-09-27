import React from 'react';
import { connect } from 'react-redux';
import { loadBoards } from '../../store/actions/board.actions';
import { BoardList } from './board-list';


class _UserBoardMain extends React.Component {
  state = {
    showStarred: false,
  };

  async componentDidMount() {
    const { user } = this.props;
    await this.props.loadBoards({ byUserId: user._id })
    this.setShowStarred()
  }

  setShowStarred = () => {
    this.setState({ showStarred: this.props.boards.some(board => this.props.user.starredBoardsIds.includes(board._id)) })
  }

  render() {
    const { showStarred } = this.state
    const { boards, user } = this.props;

    if (!boards && !user) return <div>Loading...</div>
    return (
      <section className='user-boards-main'>
        {showStarred && <h3 className='star'>Starred boards</h3>}
        {showStarred && <BoardList boards={boards.filter(board => user.starredBoardsIds.includes(board._id))} setShowStarred={(this.setShowStarred)} isStarred />}
        <h3 className="your-boards">YOUR BOARDS</h3>
        <BoardList boards={boards.filter(board => board.createdBy._id === user._id && !user.starredBoardsIds.includes(board._id))} isAdd setShowStarred={this.setShowStarred} />
        <h3 className="guest-boards">GUEST BOARDS</h3>
        <BoardList boards={boards.filter(board => board.members.some(member => member._id === user._id) && board.createdBy._id !== user._id && !user.starredBoardsIds.includes(board._id))} setShowStarred={this.setShowStarred} />
      </section>
    );
  }
}


const mapDispatchToProps = {
  loadBoards,
};

const mapStateToProps = state => {
  return {
    user: state.userModule.user,
    boards: state.boardModule.boards
  };
};

export const UserBoardMain = connect(mapStateToProps, mapDispatchToProps)(_UserBoardMain);
