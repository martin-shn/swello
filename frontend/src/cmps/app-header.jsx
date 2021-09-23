import { Avatar } from '@mui/material';
import { ReactComponent as ArrowDownIcon } from '../assets/svg/arrow-down.svg';
import { ReactComponent as NotificationsIcon } from '../assets/svg/notifications.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';

export const AppHeader = props => {
  return (
    <header
      className={
        'app-header flex align-center full with-main-layout' +
        (props.isUserBoardsPage ? ' user-boards-header' : '')
      }>
      <div>
        <img className="logo" />
      </div>
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
        <div className="search flex align-center">
          <span>
            <SearchIcon />
          </span>
          <input type="text" placeholder="Search" />
        </div>
        <button className="btn-notifications">
          <NotificationsIcon />
        </button>
        <Avatar className="avatar" alt="Guest User" src="/static/images/avatar/3.jpg" />
      </div>
    </header>
  );
};
