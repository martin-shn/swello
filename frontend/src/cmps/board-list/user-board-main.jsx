import React from 'react';
import { BoardList } from './board-list';
import { LoaderPage } from '../loader/loader-page';

export function UserBoardMain({ boards, user, history }) {
  if (!user) history.push('/');
  if (!boards) return <LoaderPage />;
  // Getting the boards:
  const starredBoards = boards.filter(board => user.starredBoardsIds.includes(board._id));
  const yourBoards = boards.filter(
    board => board.createdBy._id === user._id && !user.starredBoardsIds.includes(board._id)
  );
  const guestBoards = boards.filter(
    board =>
      board.members.some(member => member._id === user._id) &&
      board.createdBy._id !== user._id &&
      !user.starredBoardsIds.includes(board._id)
  );

  return (
    <section className="user-boards-main">
      {starredBoards && <h3 className="star">Starred boards</h3>}
      {starredBoards && <BoardList boards={starredBoards} isStarred />}
      <h3 className="your-boards">YOUR BOARDS</h3>
      <BoardList boards={yourBoards} isAdd />
      <h3 className="guest-boards">GUEST BOARDS</h3>
      <BoardList boards={guestBoards} />
    </section>
  );
}
