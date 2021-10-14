import MemberIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AppAvatar } from '../general/app-avatar';
import CloseIcon from '@mui/icons-material/Close';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';

export const SideMenuDetails = ({ setPage, toggleSideMenu, createdBy }) => {
    return (
        <>
            <div className="side-menu-header visible-scroll">
                <span
                    className="back"
                    onClick={() => {
                        setPage('index');
                    }}
                ><BackIcon /></span>
                <h3>About this board</h3>
                <button className="close-side-menu" onClick={toggleSideMenu}><CloseIcon /></button>
            </div>
            <hr style={{ width: 'calc(100% - 18px)', margin: '0px auto 4px' }} />
            <div className="details-container flex column">
                <div className="title flex align-center">
                    <MemberIcon />
                    <h3>Board admin</h3>
                </div>
                <div className="mini-profile flex align-center">
                    <AppAvatar member={createdBy} />
                    <div className="user-details flex column">
                        <h3>{createdBy.fullname}</h3>
                        <span>{createdBy.username}</span>
                    </div>

                </div>
            </div>
        </>
    );
};


