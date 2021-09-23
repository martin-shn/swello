import { ReactComponent as BtnBoardIcon } from '../assets/svg/board-btns/btn-board.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';

export const TopPanel = props => {
  return (
    <section className="top-panel flex space-between">
      <div className="flex align-center">
        <button>
          <BtnBoardIcon />
          Board
          <KeyboardArrowDownIcon />
        </button>

        <h1 className="board-name content-editable" contentEditable>
          Board Name
        </h1>
        <button>
          <StarOutlineIcon />
        </button>
        <div className="members flex">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </div>
        <button>Invite</button>
      </div>
      <div>
        <button className="btn-menu">
          <MoreHorizIcon />
          Show Menu
        </button>
      </div>
    </section>
  );
};
