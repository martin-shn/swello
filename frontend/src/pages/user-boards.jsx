import React from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';

import { storageService } from '../services/async-storage.service';
// import { boardService } from '../services/board.service';
// import { userService } from '../services/user.service';
import { UserBoardMain } from '../cmps/board-list/user-board-main';
import { SideNav } from '../cmps/board-list/side-nav';

class _UserBoards extends React.Component {
  state = {};

  async componentDidMount() {
    await storageService.init();
  }

  render() {
    const user = this.props.user;
      if (!user) {
        window.location.href='/';
        return <div>Please login</div>
      }

    return (
      <section className="user-boards">
        <header className="upper-nav">
          <AppHeader />
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
