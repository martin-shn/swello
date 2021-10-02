import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ReactComponent as BtnBoardIcon } from '../assets/svg/board-btns/btn-board.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';

import { setCardPopover, toggleSideMenu, toggleDashboard } from '../store/actions/system.actions';
import { updateBoard } from '../store/actions/board.actions';
import { CardPopover } from './card/card-popover';

const _TopPanel = props => {
  const { title, members, onUpdateTitle, user, board, onUpdateUser, setCardPopover, cardPopover } = props;
  const isStar = user.starredBoardsIds.includes(board._id);

  return (
    <section className="top-panel full flex space-between">
      <div className="flex align-center">
        <button onClick={props.toggleDashboard}>
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
        <button
          name="invite-main"
          className="btn-invite"
          onClick={ev => {
            onOpenPopover(ev, setCardPopover);
          }}>
          Invite
        </button>
      </div>
      {cardPopover.name === 'invite-main' && <CardPopover />}
      <div>
        <button className="btn-menu" onClick={props.toggleSideMenu}>
          <MoreHorizIcon />
          Show Menu
        </button>
      </div>
    </section>
  );
};

function onStar(user, boardId, onUpdateUser, isStar) {
  let newUser = { ...user };
  if (isStar) newUser.starredBoardsIds = newUser.starredBoardsIds.filter(id => id !== boardId);
  else newUser.starredBoardsIds.push(boardId);

  onUpdateUser(newUser);
  // this.setState({starredBoards: this.props.boards.filter((board) => board._id!==boardId &&
  //     this.props.user.starredBoardsIds.includes(board._id))})
}

function onOpenPopover(ev, setCardPopover) {
  // const { name } = ev.target;
  setCardPopover('invite-main', ev.target, null);
}

// function updateField(data){
// const { board } = this.props;
// const { card } = this.state;
// const updatedCard = { ...card, ...data };
// const updatedBoard = boardService.updateCard(board, updatedCard);
// this.props.updateBoard(updatedBoard);
// };

const mapDispatchToProps = {
  updateBoard,
  setCardPopover,
  toggleSideMenu,
  toggleDashboard,
};

const mapStateToProps = state => ({
  board: state.boardModule.board,
  cardPopover: state.systemModule.cardPopover,
});

export const TopPanel = withRouter(connect(mapStateToProps, mapDispatchToProps)(withRouter(_TopPanel)));
