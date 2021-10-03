export const LabelFilters = ({ filterLabelIds, boardLabels, updateFilter }) => {
  const onToggleLabel = labelId => {
    let labelIds = filterLabelIds.filter(id => id !== 'NO-LABELS');
    if (labelIds.includes(labelId)) labelIds = labelIds.filter(id => id !== labelId);
    else labelIds = [...labelIds, labelId];
    updateFilter({ labelIds });
  };

  const toggleNoLabels = () => {
    const updatedLabelIds = filterLabelIds[0] === 'NO-LABELS' ? [] : ['NO-LABELS'];
    updateFilter({ labelIds: updatedLabelIds });
  };

  if (!boardLabels || !boardLabels.length)
    return (
      <ul className="label-list">
        <li>
          <button>
            <div></div>
            <span>No labels</span>
            <span></span>
          </button>
        </li>
      </ul>
    );

  return (
    <ul className="label-list">
      <li className="label-item" onClick={toggleNoLabels}>
        <button>
          <div className="label gray"></div>
          <span className="title">No labels</span>
          {filterLabelIds.includes('NO-LABELS') && <span className="checkmark"></span>}
        </button>
      </li>
      {boardLabels.map(label => (
        <li key={label.id} className="label-item" onClick={() => onToggleLabel(label.id)}>
          <button>
            <div className={`label ${label.color}`}></div>
            <span className={`title${label.title ? '' : ' no-title'}`}>
              {label.title || `${label.color} label (default)`}
            </span>
            {filterLabelIds.includes(label.id) && <span className="checkmark"></span>}
          </button>
        </li>
      ))}
    </ul>
  );
};
