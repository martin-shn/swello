import { AppCheckbox } from '../general/app-checkbox';
import { ReactComponent as ArrowDownIcon } from '../../assets/svg/arrow-down.svg';

export const CardDueDate = props => {
  const { dueDate, updateField, onTogglePopover } = props;

  const onToggleComplete = () => {
    updateField({ dueDate: { ...dueDate, isComplete: !dueDate.isComplete } });
  };

  if (!dueDate?.date) return <></>;
  const formattedDate =
    new Date(dueDate.date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    }) + ' at 12:15 AM'; // TODO - change to real hour from input
  return (
    <section className="card-item card-due-date">
      <span>Due Date</span>
      <div className="flex">
        <AppCheckbox onClick={onToggleComplete} isDone={dueDate.isComplete} />
        <button onClick={ev => onTogglePopover('add-due-date', ev.target)}>
          {formattedDate}
          {dueDate.isComplete && <span className="label-complete">Complete</span>}
          <ArrowDownIcon style={{ width: '15px', height: '15px', marginLeft: '4px' }} />
        </button>
      </div>
    </section>
  );
};
