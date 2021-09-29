import { AppCheckbox } from '../general/app-checkbox';
import { ReactComponent as ArrowDownIcon } from '../../assets/svg/arrow-down.svg';
import { utilService } from '../../services/util.service';

export const CardDueDate = props => {
  const { dueDate, updateField, onOpenPopover } = props;

  const onToggleComplete = () => {
    updateField({ dueDate: { ...dueDate, isComplete: !dueDate.isComplete } });
  };

  if (!dueDate?.date) return <></>;
  const formattedDate = utilService.getFormattedDate(dueDate.date) + ' at 12:15 AM'; // TODO - change to real hour from input
  return (
    <section className="card-item card-due-date flex column">
      <div className="sub-header">Due Date</div>
      <div className="flex">
        <AppCheckbox onClick={onToggleComplete} isDone={dueDate.isComplete} />
        <button name="add-due-date" onClick={ev => onOpenPopover(ev, { dueDate, updateField })}>
          {formattedDate}
          {dueDate.isComplete && <span className="label-complete">Complete</span>}
          <ArrowDownIcon style={{ width: '15px', height: '15px', marginLeft: '4px' }} />
        </button>
      </div>
    </section>
  );
};
