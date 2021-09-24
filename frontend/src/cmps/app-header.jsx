import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

export class AppHeader extends Component {
  state = { isSearchActive: false };
  render() {
    const { isUserBoardsPage } = this.props;
    const { isSearchActive } = this.state;
    return (
      <header
        className={
          'app-header flex align-center full with-main-layout' +
          (isUserBoardsPage ? ' user-boards-header' : '')
        }>
        <Link to="/board">
          <img className="logo" alt="swello" />
        </Link>
        <div className="actions">
          <button>
            <span>Boards</span>
            <ArrowDownIcon />
          </button>
          <button>
            <span>Starred</span>
            <ArrowDownIcon />
          </button>
          <button className="btn-create">Create</button>
        </div>
        <div>
          <div className={'search flex align-center' + (isSearchActive ? ' active' : '')}>
            <span>
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search"
              onFocus={() => this.setState({ isSearchActive: true })}
              onBlur={() => this.setState({ isSearchActive: false })}
            />
            {isSearchActive && (
              <span style={{ height: '16px' }}>
                <CloseIcon />
              </span>
            )}
          </div>
          <button className="btn-notifications">
            <NotificationsIcon />
          </button>
          <Avatar className="avatar" alt="Guest User" src="/static/images/avatar/3.jpg" />
        </div>
      </header>
    );
  }
}
