import React, { Component } from 'react';
import { Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { cardService } from '../../../services/board-services/card.service';

export class AddCheckItemMember extends Component {
  state = {
    search: '',
    boardMembers: this.props.boardMembers,
    cardMembers: this.props.cardMembers,
  };

  handleChange = ev => {
    const search = ev.target.value;
    const searchRegex = new RegExp(search, 'i');
    this.setState({
      search,
      boardMembers: this.props.boardMembers.filter(member => searchRegex.test(member.fullname)),
      cardMembers: this.props.cardMembers.filter(member => searchRegex.test(member.fullname)),
    });
  };

  toggleMember = member => {
    const { item } = this.props;
    const updatedAssignedMemberId = item.assignedToMemberId === member._id ? null : member._id;
    this.props.onUpdateItem(item, { assignedToMemberId: updatedAssignedMemberId });
    this.props.closeCardPopover();
  };

  render() {
    const { closeCardPopover, item } = this.props;
    const { boardMembers = [], cardMembers = [] } = this.state;
    const filteredBoardMembers = boardMembers.filter(boardMember =>
      cardMembers.every(cardMember => cardMember._id !== boardMember._id)
    );
    const { search } = this.state;
    const itemMemberId = item.assignedToMemberId;
    return (
      <>
        <section className="popper-header">
          <div>Assign</div>
          <button onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content add-checkitem-member flex column">
          <input
            className="search"
            type="text"
            placeholder="Search members"
            onChange={this.handleChange}
            value={search}
          />
          {cardMembers.length > 0 && (
            <>
              <span className="sub-header">Card Members</span>
              <MembersList
                members={cardMembers}
                itemMemberId={itemMemberId}
                toggleMember={this.toggleMember}
              />
            </>
          )}
          {filteredBoardMembers.length > 0 && (
            <>
              <span className="sub-header">Board Members</span>
              <MembersList
                members={filteredBoardMembers}
                itemMemberId={itemMemberId}
                toggleMember={this.toggleMember}
              />
            </>
          )}
        </section>
      </>
    );
  }
}

function MembersList({ members, itemMemberId, toggleMember }) {
  if (!members) return <></>;
  return (
    <div className="members-list">
      {members.map(member => (
        <div
          key={member._id}
          className="member flex align-center"
          onClick={() => toggleMember(member)}>
          <Avatar className="avatar" alt={member.fullname} src={member.imgUrl} />
          <span className="member-name">{member.fullname}</span>
          {itemMemberId === member._id && <CheckIcon className="in-list-icon" />}
        </div>
      ))}
    </div>
  );
}
