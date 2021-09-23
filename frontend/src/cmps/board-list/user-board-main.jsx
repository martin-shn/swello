import React from 'react';
import { BoardList } from './board-list';

import { storageService } from '../../services/async-storage.service';
import { boardService } from '../../services/board.service';
import { userService } from '../../services/user.service';

export class UserBoardMain extends React.Component {
    state = {
      showStarred: false,
      boards: null,
      user: null,
    };

    async componentDidMount() {
        storageService.init();
        // const user = userService.getLoggedinUser();
        // if (!user) this.props.history.push('/')
        const user = {
            '_id': 'u101',
            'fullname': 'Guest',
            'username': 'guest@guest.com',
        };
        const boards = await boardService.query({ byUserId: user._id })
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
                <h3>YOUR BOARDS</h3>
                <BoardList boards={boards.filter(board=>board.createdBy._id===user._id)} isAdd />
                <h3>GUEST BOARDS</h3>
                <BoardList boards={boards.filter(board=>board.members.some(member=>member._id===user._id))} />
            </section>
        );
    }
}
