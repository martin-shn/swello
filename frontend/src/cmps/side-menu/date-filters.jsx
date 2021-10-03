export const DateFilters = ({ updateFilter, filterDate, isComplete }) => {
  // const onToggleDays = days => {
  //   updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff !== days ? days : Infinity } });
  // }
  return (
    <ul className="date-filters">
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, isComplete: null, diff: filterDate.diff === 'NONE' ? Infinity : 'NONE' } })}>
        <button>Has no due date</button>
        {filterDate.diff === 'NONE' && <span className="checkmark"></span>}
      </li>
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff !== 1 ? 1 : Infinity } })}>
        <button>Due in the next day</button>
        {filterDate.diff === 1 && <span className="checkmark"></span>}
      </li>
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff !== 7 ? 7 : Infinity } })}>
        <button>Due in the next week</button>
        {filterDate.diff === 7 && <span className="checkmark"></span>}
      </li>
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff !== 30 ? 30 : Infinity } })}>
        <button>Due in the next month</button>
        {filterDate.diff === 30 && <span className="checkmark"></span>}
      </li>
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff === 'OVERDUE' ? Infinity : 'OVERDUE' } })}>
        <button>Overdue</button>
        {filterDate.diff === 'OVERDUE' && <span className="checkmark"></span>}
      </li>
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff === 'NONE' ? Infinity : filterDate.diff, isComplete: !filterDate.isComplete ? true : null } })}>
        <button>Marked as complete</button>
        {filterDate.isComplete && <span className="checkmark"></span>}
      </li>
      <li onClick={() => updateFilter({ dueDate: { ...filterDate, diff: filterDate.diff === 'NONE' ? Infinity : filterDate.diff, isComplete: filterDate.isComplete || filterDate.isComplete === null ? false : null } })}>
        <button>Marked as incomplete</button>
        {filterDate.isComplete === false && <span className="checkmark"></span>}
      </li>
    </ul>
  );
};
