import React, { Component } from 'react';
import { ReactComponent as DescriptionIcon } from '../assets/svg/card/description.svg';
import { ReactComponent as DueDateIcon } from '../assets/svg/card/checklist-due-date.svg';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import ChecklistIcon from '@mui/icons-material/CheckBoxOutlined';
import LocationIcon from '@mui/icons-material/LocationOn';
import { Avatar } from '@mui/material';
import { utilService } from '../services/util.service';
import { connect } from 'react-redux';

class _CardPreviewData extends Component {
  toggleDueDate = ev => {
    ev.stopPropagation();
    this.props.card.dueDate.isComplete = !this.props.card.dueDate.isComplete;
    // const updatedBoard = boardService.updateCard(this.props.board, this.props.card);
    this.props.updateBoard(this.props.board);
  };

  render() {
    const { checklists, description, dueDate, location, members } = this.props.card;
    return (
      <section className="card-preview-data flex wrap align-center">
        <div className="grow flex align-center" style={{ gap: '12px' }}>
          {dueDate && <CardPreviewDueDate dueDate={dueDate} toggleDueDate={this.toggleDueDate} />}
          {description && <DescriptionIcon />}
          {checklists && <CardPreviewChecklists checklists={checklists} />}
          {location && <LocationIcon />}
        </div>
        {members?.length && <CardPreviewMembers members={members} />}
      </section>
    );
  }
}

function CardPreviewChecklists({ checklists }) {
  let doneCount = 0;
  let notDoneCount = 0;
  for (const checklist of checklists) {
    for (const item of checklist.items) {
      if (item.isDone) doneCount++;
      else notDoneCount++;
    }
  }
  return (
    <div className="card-preview-checklists flex align-center" style={{ gap: '4px' }}>
      {notDoneCount > 0 && (
        <>
          <ChecklistIcon />
          <span>
            {doneCount}/{notDoneCount + doneCount}
          </span>
        </>
      )}
    </div>
  );
}

function CardPreviewDueDate({ dueDate, toggleDueDate }) {
  return (
    <button
      onClick={toggleDueDate}
      className={`btn-due-date${dueDate.isComplete ? ' complete' : ''}`}>
      <span className="due-date-icon"></span>
      <span>{utilService.getFormattedDate(dueDate.date)}</span>
    </button>
  );
}

function CardPreviewMembers({ members }) {
  return (
    <div className="card-preview-members flex align-center">
      {members.map(member => (
        <Avatar key={member._id} className="avatar" alt={member?.fullname} src={member?.imgUrl} />
      ))}
    </div>
  );
}

const mapDispatchToProps = {
  updateBoard,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

export const CardPreviewData = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewData);
