import React from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';

import { UserBoardMain } from '../cmps/board-list/user-board-main';
import { SideNav } from '../cmps/board-list/side-nav';
import { withRouter } from 'react-router';
import { TemplateList } from '../cmps/board-list/template-list';

class _UserBoards extends React.Component {
  state = {};

  render() {
    const user = this.props.user;
    if (!user) {
      this.props.history.replace('/');
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
          {this.props.location.pathname === '/board' && (
            <section className="user-boards-main">
              <UserBoardMain />
            </section>
          )}
          {this.props.location.pathname === '/templates' && <TemplateList />}
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => {
  return {
    user: state.userModule.user,
  };
};

export const UserBoards = connect(mapStateToProps, mapDispatchToProps)(withRouter(_UserBoards));
