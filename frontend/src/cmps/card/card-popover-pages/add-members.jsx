import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

import { cardService } from '../../../services/board-services/card.service';
import { userService } from '../../../services/user.service';
import { utilService } from '../../../services/util.service';
import { onUpdateUser } from '../../../store/actions/user.actions'
import { AppAvatar } from '../../general/app-avatar';

export class _AddMembers extends Component {
  state = {
    search: '',
    updatedMembers: this.props.card.members,
    updatedBoardMembers: this.props.board.members,
  };

  toggleCardMember = async (member) => {
    const { card, board, user } = this.props;
    const { card: updatedCard, activity } = cardService.toggleCardMember(member, card);
    const { members } = updatedCard;
    const notification = { id: utilService.makeId(), type: 'mention', title: 'Card mention', isRead: false, user: { fullname: user.fullname, imgUrl: user.imgUrl }, txt: `${user.fullname} added you to card`, cardTitle: card.title, url: `/board/${board._id}/card/${card.id}`, sentAt: Date.now() }
    this.setState({ updatedMembers: members });
    this.props.updateField({ members }, activity.type, activity.values);
    let userToUpdate = await userService.getById(member._id)
    userToUpdate = { ...userToUpdate, notifications: [notification, ...userToUpdate.notifications,] }
    if (activity.type === 'ADD-MEMBER' && user._id !== member._id) userService.update(userToUpdate, false)
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
                  <AppAvatar member={member} />
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


const mapDispatchToProps = {
  onUpdateUser,
};

const mapStateToProps = state => {
  return {
    user: state.userModule.user,
    board: state.boardModule.board,
  };
};

export const AddMembers = connect(mapStateToProps, mapDispatchToProps)(_AddMembers);
