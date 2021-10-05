import Fade from '@mui/material/Fade';
import { AppAvatar } from './general/app-avatar';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import MemberAddIcon from '@mui/icons-material/PersonAdd';
import InviteIcon from '@mui/icons-material/Markunread';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';


export function NotificationPreview({ notification, user, onToggleMarkAsRead, toggleMenu }) {
    const ToolTip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
        ({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: 'rgb(23, 43, 77)',
                color: 'rgb(224, 226, 231)',
                padding: '4px 6px',
                fontSize: '0.7rem',
            },
        })
    );
    return (
        <div className="notification" style={{ backgroundColor: notification.isRead ? '#fff' : '#e4f7fa' }}>
            <div className="notification-inner">
                <div className="notification-read-btn">
                    {/* this btn have a before with icon */}
                    <ToolTip
                        title={notification.isRead ? 'Mark unread' : 'Mark read'}
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 300 }}
                        placement="bottom">
                        <button className={notification.isRead ? 'read' : 'unread'} onClick={() => onToggleMarkAsRead(notification.id)}></button>
                    </ToolTip>
                </div>
                <div className="notification-inner-header">
                    <span>{notification.title}</span>
                </div>
                <div className="notification-inner-user">
                    <div className="user-avatar">
                        <AppAvatar user={user} />
                    </div>
                    <div className="user-name">
                        <span>{notification.user.fullname}</span>
                    </div>
                </div>
                <div className="notification-inner-content">
                    <div className="icon">
                        <span>
                            {notification.type === 'invite' ? <InviteIcon /> : <MemberAddIcon />}
                        </span>
                    </div>
                    <div className="description">
                        {notification.type === 'invite' ?
                            <>
                                <p>{notification.txt}, <Link to={notification.url}>Join now!</Link></p>

                                <span className="date">{formatDistance(notification.sentAt, Date.now(), { addSuffix: true })}</span>
                            </> :
                            <>
                                <p>{notification.txt} <Link onClick={() => toggleMenu(null)} to={notification.url}>{notification.cardTitle}</Link></p>
                                <span className="date">{formatDistance(notification.sentAt, Date.now(), { addSuffix: true })}</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}