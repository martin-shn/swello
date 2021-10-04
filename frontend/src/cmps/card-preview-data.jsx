import React, { Component } from 'react';
import { ReactComponent as DescriptionIcon } from '../assets/svg/card/description.svg';
import AttachmentIcon from '@mui/icons-material/AttachFileOutlined';
import { boardService } from '../services/board.service';
import { updateBoard } from '../store/actions/board.actions';
import ChecklistIcon from '@mui/icons-material/CheckBoxOutlined';
import LocationIcon from '@mui/icons-material/LocationOn';
import { ReactComponent as ArchiveIcon } from '../assets/svg/archive-icon.svg';
import { utilService } from '../services/util.service';
import { connect } from 'react-redux';
import { cardService } from '../services/board-services/card.service';
import { AppAvatar } from './general/app-avatar';

class _CardPreviewData extends Component {
  toggleDueDate = async ev => {
    ev.stopPropagation();
    // this.props.card.dueDate.isComplete = !this.props.card.dueDate.isComplete;
    const { card } = this.props;
    const isComplete = !card.dueDate.isComplete;
    const updatedCard = { ...card, dueDate: { ...card.dueDate, isComplete } };
    const updatedBoard = boardService.updateCard(this.props.board, updatedCard);
    const activity = boardService.createActivity(updatedCard, 'MARK-DUE-DATE', { dueDate: updatedCard.dueDate });
    updatedBoard.activities.unshift(activity);
    await this.props.updateBoard(updatedBoard);
  };

  render() {
    const { checklists, attachments, description, dueDate, location, members } = this.props.card;
    const isArchived = cardService.getCardFromArchive(this.props.board, this.props.card.id);
    if (!checklists && !attachments && !description && !dueDate && !location && !members && !isArchived) return <></>;
    return (
      <section className="card-preview-data flex wrap align-center">
        <div className="flex align-center wrap" style={{ gap: '12px', flexGrow: '1' }}>
          {dueDate && <CardPreviewDueDate dueDate={dueDate} toggleDueDate={this.toggleDueDate} />}
          {description && <DescriptionIcon />}
          {attachments?.length > 0 && (
            <div className="flex align-center">
              <AttachmentIcon /> <span>{attachments.length}</span>
            </div>
          )}
          {checklists?.length > 0 && <CardPreviewChecklists checklists={checklists} />}
          {isArchived && (
            <div className="flex align-center">
              <ArchiveIcon /> <span style={{ fontSize: '12px', marginLeft: '4px' }}>Archived</span>
            </div>
          )}
          {location && <LocationIcon />}
        </div>
        {members?.length > 0 && <CardPreviewMembers members={members} />}
      </section>
    );
  }
}

function CardPreviewChecklists({ checklists }) {
  let doneCount = 0;
  let notDoneCount = 0;
  let oldestNotDone = { dueDate: Infinity, isDone: false };
  for (const checklist of checklists) {
    for (const item of checklist.items) {
      if (item.isDone) doneCount++;
      else {
        notDoneCount++;
        if (item.dueDate && item.dueDate < oldestNotDone.dueDate) oldestNotDone = item;
      }
    }
  }
  const status = cardService.checkDueDate({
    date: oldestNotDone.dueDate,
    isComplete: oldestNotDone.isDone,
  });
  let statusClassName = oldestNotDone.dueDate < Infinity ? status : '';
  if (notDoneCount === 0 && doneCount > 0) statusClassName = 'complete';
  return (
    <div className={'card-preview-checklists flex align-center ' + statusClassName} style={{ gap: '4px' }}>
      {(notDoneCount > 0 || doneCount > 0) && (
        <>
          <ChecklistIcon />
          <span>
            {doneCount}/{notDoneCount + doneCount}
            {oldestNotDone.dueDate < Infinity && ' • ' + utilService.getFormattedDate(oldestNotDone.dueDate)}
          </span>
        </>
      )}
    </div>
  );
}

function CardPreviewDueDate({ dueDate, toggleDueDate }) {
  return (
    <button onClick={toggleDueDate} className={`btn-due-date ${cardService.checkDueDate(dueDate)}`}>
      <span className="due-date-icon"></span>
      <span>{utilService.getFormattedDate(dueDate.date)}</span>
    </button>
  );
}

function CardPreviewMembers({ members }) {
  return (
    <div className="card-preview-members flex align-center">
      {members.map(member => (
        <AppAvatar key={member._id} member={member} />
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
