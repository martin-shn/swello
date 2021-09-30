import React, { Component } from 'react';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { connect } from 'react-redux';
import { setCardPopover } from '../../store/actions/system.actions';

class _CardMembers extends Component {
  render() {
    const { board, card, updateField } = this.props;
    const { members } = card;
    if (!members?.length) return <></>;
    return (
      <section className="card-members">
        <div className="sub-header">Members</div>
        <div className="flex members-list" style={{ gap: '3px' }}>
          {members.map(member => (
            <Avatar key={member._id} className="avatar" alt={member.fullname} src={member.imgUrl} />
          ))}
          <Avatar className="avatar">
            <button
              className="btn-add-member"
              onClick={ev =>
                this.props.setCardPopover('add-members', ev.target, { board, card, updateField })
              }>
              <AddIcon />
            </button>
          </Avatar>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  setCardPopover,
};

export const CardMembers = connect(null, mapDispatchToProps)(_CardMembers);