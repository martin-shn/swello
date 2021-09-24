import React from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';

// import { storageService } from '../services/async-storage.service';
// import { boardService } from '../services/board.service';
// import { userService } from '../services/user.service';
import { UserBoardMain } from '../cmps/board-list/user-board-main';
import { SideNav } from '../cmps/board-list/side-nav';

class _UserBoards extends React.Component {
  state = {};
  render() {
    const user = this.props.user;
    if (!user) {
      this.props.history.replace('/')
      return;
    }

    return (
      <section className="user-boards">
        <header className="upper-nav">
          <AppHeader isUserBoardsPage={true} />
        </header>
        <section>
          <aside className="side-nav">
            <SideNav />
          </aside>
          <section className="user-boards-main">
            <UserBoardMain />
          </section>
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => {
  return {
    user: state.userModule.user,
  };
};

export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(_UserBoards);
