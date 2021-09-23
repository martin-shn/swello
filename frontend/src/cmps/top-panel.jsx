import { ReactComponent as BtnBoardIcon } from '../assets/svg/board-btns/btn-board.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';

export const TopPanel = props => {
  const { title, members, onUpdateBoard } = props;
  return (
    <section className="top-panel flex space-between">
      <div className="flex align-center">
        <button>
          <BtnBoardIcon />
          Board
          <KeyboardArrowDownIcon />
        </button>

        <h1
          className="board-name content-editable"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={ev => onUpdateBoard({ title: ev.target.innerText })}>
          {title}
        </h1>
        <button>
          <StarOutlineIcon />
        </button>
        <div className="members flex">
          {members.map(member => (
            <Avatar key={member._id} alt={member.fullname} src={member.imgUrl} />
          ))}
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
