import React from 'react';
import { connect } from 'react-redux';
import { loadBoards } from '../../store/actions/board.actions';
import { BoardList } from './board-list';

import { storageService } from '../../services/async-storage.service';
import { boardService } from '../../services/board.service';
import { userService } from '../../services/user.service';

class _UserBoardMain extends React.Component {
    state = {
      showStarred: false,
      boards: null,
      user: null,
    };

    async componentDidMount() {
        // const user = userService.getLoggedinUser();
        const user = this.props.user;
        await this.props.loadBoards({ byUserId: user._id })
        const boards = this.props.boards
        this.setState({ boards, user }, async () => {
            const fullUser = await userService.getById(this.state.user._id)
            const starredBoards = fullUser.starredBoards.map(starredBoard=>starredBoard.boardId)
            this.state.boards.forEach(board=>{
              if (starredBoards.includes(board._id)) {
                board.isStar=true
                this.setState({showStarred:true})
              }
              else board.isStar=false
            })
        });
    }

    render() {
      const {showStarred, boards, user} = this.state
      
      if (!boards && !user) return <div>Loading...</div>
        return (
            <section className='user-boards-main'>
                {showStarred && <h3 className='star'>Starred boards</h3>}
                {showStarred && <BoardList boards={boards.filter(board=>board.isStar)} isStarred />}
                <h3 className="your-boards">YOUR BOARDS</h3>
                <BoardList boards={boards.filter(board=>board.createdBy._id===user._id)} isAdd />
                <h3 className="guest-boards">GUEST BOARDS</h3>
                <BoardList boards={boards.filter(board=>board.members.some(member=>member._id===user._id))} />
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
