import React, { Component } from 'react';
import { Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export const AddMembers = props => {
  const { onClosePopover, cardMembers = [], boardMembers = [] } = props;

  const toggleCardMember = () => {
    console.log('toggle');
  };

  const isMemberInCard = boardMember => {
    return cardMembers.some(cardMember => cardMember._id === boardMember._id);
  };

  // prettier-ignore
  return (
    <>
      <section className="popper-header">
        <div>Members</div>
        <button onClick={onClosePopover}></button>
      </section>
      <section className="popper-content add-members flex column">
        <input className="search" type="text" placeholder="Search members" />
        <span className="title">Board Members</span>
        <div className="board-members-list">
          {boardMembers.map(member => (
            <div key={member._id} className="board-member flex align-center" onClick={toggleCardMember}>
              <Avatar className="avatar" alt={member.fullname} src={member.imgUrl} />
              <span className="member-name">
                {member.fullname} ({member.username})
              </span>
              {isMemberInCard(member) && <CheckIcon className="in-list-icon" />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
