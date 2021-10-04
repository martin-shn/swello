import React, { Component } from 'react';
import { PopoverMenu } from './popover-menu';
import Fade from '@mui/material/Fade';
import { AppAvatar } from '../general/app-avatar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export class HeaderNotifications extends Component {
  tooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgb(23, 43, 77)',
        color: 'rgb(224, 226, 231)',
        padding: '4px 6px',
        fontSize: '0.7rem',
      },
    })
  );
  render() {
    const {user, onUpdateUser} = this.props
    return (
      <>
        <PopoverMenu id="notification" header="Notification" classNames="notification-menu header-popper-menu">
          <div className="notification-container">
            <div className="notification-header">
              <button className="notification-header-link">View all</button>
              <button className="notification-header-link">Mark all as read</button>
            </div>
            <div className="notification-content-main">
              <div className="notification-content">
                {/* HERE COMES THE MAP RETURN DIVs */}
                {}
                <div className="notification">
                  <div className="notification-inner">
                    <div className="notification-read-btn">
                      {/* this btn have a before with icon */}
                      <this.tooltip
                        title="Mark read"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        placement="bottom">
                        <button></button>
                      </this.tooltip>
                    </div>
                    <div className="notification-inner-header">
                      <div>
                        <img alt="img" />
                      </div>
                      <span>notification title</span>
                    </div>
                    <div className="notification-inner-user">
                      <div className="user-avatar" alt={'Martin Sh.'}>
                        <AppAvatar />
                      </div>
                      <div className="user-name">
                        <span>Martin</span>
                      </div>
                    </div>
                    <div className="notification-inner-content">
                      <div className="icon">
                        <span></span>
                      </div>
                      <div className="description">
                        Made you an admin on the board <span>test</span> sep 24, 2021, 10:05am
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverMenu>
      </>
    );
  }
}
