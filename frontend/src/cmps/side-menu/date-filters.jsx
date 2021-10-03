export const DateFilters = ({ updateFilter, filterDate }) => {
  const onToggleDays = days => {
    const diff = filterDate.diff !== days ? days : Infinity;
    const isComplete = days === 'NONE' ? null : filterDate.isComplete; // reset iscomplete filters if choosing none (no due date)
    updateFilter({ dueDate: { ...filterDate, diff, isComplete } });
  };

  const onToggleComplete = isCompleteInput => {
    const diff = filterDate.diff === 'NONE' ? Infinity : filterDate.diff; // reset no due date filter if choosing iscomplete filter
    const isComplete = filterDate.isComplete !== isCompleteInput ? isCompleteInput : null;
    updateFilter({ dueDate: { ...filterDate, diff, isComplete } });
  };

  return (
    <ul className="date-filters">
      <li onClick={() => onToggleDays('NONE')}>
        <button>Has no due date</button>
        {filterDate.diff === 'NONE' && <span className="checkmark"></span>}
      </li>
      <li onClick={() => onToggleDays(1)}>
        <button>Due in the next day</button>
        {filterDate.diff === 1 && <span className="checkmark"></span>}
      </li>
      <li onClick={() => onToggleDays(7)}>
        <button>Due in the next week</button>
        {filterDate.diff === 7 && <span className="checkmark"></span>}
      </li>
      <li onClick={() => onToggleDays(30)}>
        <button>Due in the next month</button>
        {filterDate.diff === 30 && <span className="checkmark"></span>}
      </li>
      <li onClick={() => onToggleDays('OVERDUE')}>
        <button>Overdue</button>
        {filterDate.diff === 'OVERDUE' && <span className="checkmark"></span>}
      </li>
      <li onClick={() => onToggleComplete(true)}>
        <button>Marked as complete</button>
        {filterDate.isComplete && <span className="checkmark"></span>}
      </li>
      <li onClick={() => onToggleComplete(false)}>
        <button>Marked as incomplete</button>
        {filterDate.isComplete === false && <span className="checkmark"></span>}
      </li>
    </ul>
  );
};
