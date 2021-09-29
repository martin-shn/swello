import { ReactComponent as BtnBoardIcon } from '../assets/svg/board-btns/btn-board.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';

export const TopPanel = props => {
  const { title, members, onUpdateTitle, user, board, onUpdateUser } = props;
  const isStar = user.starredBoardsIds.includes(board._id);

  return (
    <section className="top-panel full flex space-between">
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
          onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
          onBlur={ev => onUpdateTitle(ev.target.innerText)}>
          {title}
        </h1>
        <button
          className={(isStar ? 'starred' : '') + ` star`}
          onClick={() => {
            onStar(user, board._id, onUpdateUser, isStar);
          }}>
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

function onStar(user, boardId, onUpdateUser, isStar) {
  let newUser = { ...user };
  if (isStar)
    newUser.starredBoardsIds = newUser.starredBoardsIds.filter(id => id !== boardId);
  else
    newUser.starredBoardsIds.push(boardId);
  
    onUpdateUser(newUser);
  // this.setState({starredBoards: this.props.boards.filter((board) => board._id!==boardId &&
  //     this.props.user.starredBoardsIds.includes(board._id))})
}
