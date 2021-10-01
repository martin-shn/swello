import React, { Component } from 'react';
import { Avatar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { cardService } from '../../../services/board-services/card.service';

export class AddMembers extends Component {
  state = {
    search: '',
    updatedMembers: this.props.card.members,
    updatedBoardMembers: this.props.board.members,
  };

  toggleCardMember = member => {
    const { card } = this.props;
    const { card: updatedCard, activity } = cardService.toggleCardMember(member, card);
    const { members } = updatedCard;
    this.setState({ updatedMembers: members });
    this.props.updateField({ members }, activity.type, activity.values);
  };

  handleChange = ev => {
    const search = ev.target.value;
    const { board } = this.props;
    this.setState({ search });
    if (!board.members?.length) return;
    const updatedBoardMembers = board.members.filter(
      member =>
        !search ||
        member.fullname.toLowerCase().includes(search.toLowerCase()) ||
        member?.username?.toLowerCase()?.includes(search.toLowerCase())
    );
    this.setState({ updatedBoardMembers });
  };

  render() {
    const { closeCardPopover } = this.props;
    const { updatedMembers = [], updatedBoardMembers, search } = this.state;
    // prettier-ignore
    return (
      <>
        <section className="popper-header">
          <div>Members</div>
          <button onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content add-members flex column">
          <input
            className="search"
            type="text"
            placeholder="Search members"
            onChange={this.handleChange}
            value={search}
          />
          <span className="sub-header">Board Members</span>
          <div className="members-list">
            {updatedBoardMembers.map(member => {
              const isMemberInCard = updatedMembers.some(
                cardMember => cardMember._id === member._id
              );
              return (
                <div
                  key={member._id}
                  className="member flex align-center"
                  onClick={() => this.toggleCardMember(member)}>
                  <Avatar className="avatar" alt={member.fullname} src={member.imgUrl} />
                  <span className="member-name">
                    {member.fullname}
                  </span>
                  {isMemberInCard && <CheckIcon className="in-list-icon" />}
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}
