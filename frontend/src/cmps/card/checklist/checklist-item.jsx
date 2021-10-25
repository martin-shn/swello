import { ReactComponent as DueDateIcon } from '../../../assets/svg/card/checklist-due-date.svg';
import { ReactComponent as AddMemberIcon } from '../../../assets/svg/card/add-member.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppCheckbox } from '../../general/app-checkbox';
import { connect } from 'react-redux';
import { setCardPopover } from '../../../store/actions/system.actions';
import { utilService } from '../../../services/util.service';
import { cardService } from '../../../services/board-services/card.service';
import { AppAvatar } from '../../general/app-avatar';

const _ChecklistItem = props => {
  const { item, onUpdateItem, card, board } = props;
  const { id, title, isDone, dueDate, assignedToMemberId } = props.item;
  const assignedToMember = board.members.find(member => member._id === assignedToMemberId);
  const formattedDate = utilService.getFormattedDate(dueDate);
  const isData = dueDate || assignedToMemberId;
  const status = cardService.checkDueDate({ date: dueDate, isComplete: isDone });
  const className = `section-header checklist-item ${status} ${isData ? ' is-data' : ''}`;
  return (
    <div className={className}>
      <AppCheckbox isDone={isDone} onClick={() => props.onUpdateItem(props.item, { isDone: !isDone })} />
      <div className="item flex space-between">
        <div
          className="title content-editable grow"
          onBlur={ev => props.onUpdateItem(props.item, { title: ev.target.innerText })}
          onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
          contentEditable
          suppressContentEditableWarning>
          {title}
        </div>
        <section className="actions flex align-center">
          <button
            className="btn-due-date"
            onClick={ev => props.setCardPopover('add-checkitem-due-date', ev.target, { item, onUpdateItem })}
            style={{ width: 'auto', gap: '4px' }}>
            <DueDateIcon style={{ width: '15px' }} />
            {dueDate && (
              <span className="due-date-text" style={{ fontSize: '12px' }}>
                {formattedDate}
              </span>
            )}
          </button>

          {assignedToMemberId && (
            <AppAvatar
              member={assignedToMember}
              onClick={ev =>
                props.setCardPopover('add-checkitem-member', ev.target, {
                  boardMembers: board.members,
                  cardMembers: card.members,
                  item,
                  onUpdateItem,
                })
              }
            />
          )}
          {!assignedToMemberId && (
            <button
              className="btn-checkitem-member"
              onClick={ev =>
                props.setCardPopover('add-checkitem-member', ev.target, {
                  boardMembers: board.members,
                  cardMembers: card.members,
                  item,
                  onUpdateItem,
                })
              }>
              <AddMemberIcon className="add-member-icon" />
            </button>
          )}
          <button onClick={() => props.onRemoveItem(id)}>
            <DeleteIcon />
          </button>
        </section>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setCardPopover,
};

const mapStateToProps = state => {
  return {
    board: state.boardModule.board,
  };
};

export const ChecklistItem = connect(mapStateToProps, mapDispatchToProps)(_ChecklistItem);
