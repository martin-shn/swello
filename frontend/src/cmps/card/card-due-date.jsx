import { AppCheckbox } from '../general/app-checkbox';
import { ReactComponent as ArrowDownIcon } from '../../assets/svg/arrow-down.svg';
import { utilService } from '../../services/util.service';
import { cardService } from '../../services/board-services/card.service';
import { AppBtn } from '../general/app-btn';

export const CardDueDate = props => {
  const { dueDate, updateField, onOpenPopover } = props;

  const onToggleComplete = () => {
    const updatedDueDate = { ...dueDate, isComplete: !dueDate.isComplete };
    updateField({ dueDate: updatedDueDate }, 'MARK-DUE-DATE', { dueDate: updatedDueDate });
  };

  if (!dueDate?.date) return <></>;
  const formattedDate = utilService.getFormattedDate(dueDate.date, true);
  const info = cardService.checkDueDate(dueDate);
  return (
    <section className="card-item card-due-date flex column">
      <div className="sub-header">Due Date</div>
      <div className="flex">
        <AppCheckbox onClick={onToggleComplete} isDone={dueDate.isComplete} />
        <AppBtn name="add-due-date" onClick={ev => onOpenPopover(ev, { dueDate, updateField })}>
          {formattedDate}
          {info === 'complete' && <span className="date-label label-complete">Complete</span>}
          {info === 'due-soon' && <span className="date-label label-due-soon">Due Soon</span>}
          {info === 'overdue' && <span className="date-label label-overdue">Overdue</span>}
          {info === 'overdue-recent' && <span className="date-label label-overdue-recent">Overdue</span>}
          <ArrowDownIcon style={{ width: '15px', height: '15px', marginLeft: '4px' }} />
        </AppBtn>
      </div>
    </section>
  );
};
