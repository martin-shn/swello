import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { ReactComponent as BtnBoardIcon } from '../assets/svg/board-btns/btn-board.svg';
import { ReactComponent as BtnDashBoardIcon } from '../assets/svg/board-btns/btn-dashboard.svg';
export function BoardOptionsMenu({ anchor, isOpen, onClose, currPage, onChangePage }) {
    return (
        <Popper
            open={isOpen}
            anchorEl={anchor}
            role={undefined}
            placement="bottom-start"
            transition
            style={{ zIndex: '15' }}
            disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top', marginTop: '10px'
                    }}>
                    <Paper>
                        <ClickAwayListener onClickAway={onClose}>
                            <div className="board-options-menu">
                                <button className={'flex column' + (currPage === 'board' ? ' active' : '')} onClick={() => onChangePage('board')}>
                                    <div className="flex align-center"><BtnBoardIcon /><h3>Board</h3></div>
                                    <span>Organize cards in lists on a board.</span>
                                </button>
                                <button className={'flex column' + (currPage === 'dashboard' ? ' active' : '')} onClick={() => onChangePage('dashboard')}>
                                    <div className="flex align-center"><BtnDashBoardIcon /><h3>Dashboard</h3></div>
                                    <span>Generate charts, visuals, and metrics for work on this board.</span>
                                </button>
                            </div>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}