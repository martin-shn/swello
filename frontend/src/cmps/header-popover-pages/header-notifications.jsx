import React, { Component } from 'react';
import { PopoverMenu } from './popover-menu';
import { NotificationPreview } from '../notification-preview';
import { ReactComponent as NoNotifications } from '../../assets/svg/no-notifications.svg';


export class HeaderNotifications extends Component {
  state = {
    showAll: false,
  }
  onToggleShowAll = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }))
  }
  onMarkAllAsRead = () => {
    const { user, onUpdateUser } = this.props;
    const notifications = user.notifications.map(notification => { return { ...notification, isRead: true } });
    onUpdateUser({ ...user, notifications })
  }
  onToggleMarkAsRead = (notificationId) => {
    const { user, onUpdateUser } = this.props;
    const currNotification = user.notifications.find(notification => notification.id === notificationId)
    currNotification.isRead = !currNotification.isRead;
    onUpdateUser({ ...user, notifications: user.notifications.map(notification => notification.id === currNotification.id ? currNotification : notification) })
  }
  render() {
    const { user, toggleMenu } = this.props
    const { showAll } = this.state;
    return (
      <>
        <PopoverMenu id="notification" header="Notification" classNames="notification-menu header-popper-menu">
          <div className="notification-container">
            <div className="notification-header">
              <button className="notification-header-link" onClick={this.onToggleShowAll}>{showAll ? 'Filter by unread' : 'View all'}</button>
              <button className="notification-header-link" onClick={this.onMarkAllAsRead}>Mark all as read</button>
            </div>
            <div className="notification-content-main">
              <div className="notification-content">
                {!showAll && user.notifications.map((notification, idx) => (
                  !notification.isRead && <NotificationPreview key={idx} notification={notification} user={user} onToggleMarkAsRead={this.onToggleMarkAsRead} toggleMenu={toggleMenu} />
                ))}
                {showAll && user.notifications.map((notification, idx) => (
                  <NotificationPreview key={idx} notification={notification} user={user} onToggleMarkAsRead={this.onToggleMarkAsRead} toggleMenu={toggleMenu} />
                ))}
                {!showAll && !user.notifications.some(notification => !notification.isRead) &&
                  <div className="no-notifications flex column align-center">
                    <NoNotifications />
                    <div className="txt">
                      <h3>No unread notifications</h3>
                      <p>Click <span onClick={this.onToggleShowAll}>View all</span> to view all of your notifications</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </PopoverMenu>
      </>
    );
  }
}
