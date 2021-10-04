import { AppAvatar } from '../general/app-avatar';
import { PopoverMenu } from './popover-menu';

export const HeaderAccount = ({ user, onLogout, history }) => {
  return (
    <PopoverMenu id="account" header="Account" classNames="account-menu header-popper-menu">
      <section className="header-account">
        <div className="user-info flex">
          <AppAvatar member={user} />
          <div>
            <div className="fullname">{user.fullname}</div>
            <div className="username">{user.username}</div>
          </div>
        </div>
        <button
          className="btn-logout"
          onClick={() => {
            history.push('/');
            onLogout();
          }}>
          Log Out
        </button>
      </section>
    </PopoverMenu>
  );
};
