import React from 'react';
<<<<<<< HEAD
import { BoardList } from '../cmps/board-list/board-list';
=======
import { AppHeader } from '../cmps/app-header';
import { BoardList } from '../cmps/board-list';
>>>>>>> 85d04d7c6a840e73ded576b73828661de365809c

import { storageService } from '../services/async-storage.service';
import { boardService } from '../services/board.service';
import { userService } from '../services/user.service';
import { UserBoardMain } from '../cmps/board-list/user-board-main';
import { SideNav } from '../cmps/board-list/side-nav';

export class UserBoards extends React.Component {
    state = {};

<<<<<<< HEAD
    async componentDidMount() {
        storageService.init();
    }

    render() {
        return (
            <section className="user-boards">
                <header className="upper-nav">
                  {/* <AppHeader /> */}
                </header>
                <section>
                    <nav className="side-nav">
                      <SideNav />
                    </nav>
                    <section className="user-boards-main">
                        <UserBoardMain />
                    </section>
                </section>
            </section>
        );
    }
=======
  componentDidMount() {
    storageService.init();
    this.setState({ boards: boardService.query() });
  }

  render() {
    const { isStar } = this.state;
    return (
      <section className="user-boards">
        <AppHeader isUserBoardsPage={true} />
        {isStar && <h3 className="star">Starred boards</h3>}
        {isStar && <BoardList isStarred />}
        <h3>YOUR BOARDS</h3>
        <BoardList isAdd />
        <h3>GUEST BOARDS</h3>
        <BoardList />
      </section>
    );
  }
>>>>>>> 85d04d7c6a840e73ded576b73828661de365809c
}
