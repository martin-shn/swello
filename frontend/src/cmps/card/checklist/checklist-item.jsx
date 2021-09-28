import { ReactComponent as DueDateIcon } from '../../../assets/svg/card/checklist-due-date.svg';
import { ReactComponent as AddMemberIcon } from '../../../assets/svg/card/add-member.svg';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppCheckbox } from '../../general/app-checkbox';
import { connect } from 'react-redux';
import { setCardPopover } from '../../../store/actions/system.actions';
import { utilService } from '../../../services/util.service';

const _ChecklistItem = props => {
  // TODO - Finish the remaining add-member and due-date buttons, enable title edit
  const { item, onUpdateItem } = props;
  const { id, title, isDone, dueDate, assignedTo } = props.item;
  const formattedDate = utilService.getFormattedDate(dueDate);
  const isData = dueDate || assignedTo;
  // prettier-ignore
  return (
    <div
      className={`section-header checklist-item${isDone ? ' done' : ''} ${isData ? ' is-data' : ''}`}>
      <AppCheckbox
        isDone={isDone}
        onClick={() => props.onUpdateItem(props.item, { isDone: !isDone })}
      />
      <div className="item flex space-between">
        <span className="title">{title}</span>
        <section className="actions flex">
          <button className="btn-due-date"
            onClick={ev => props.setCardPopover('add-checkitem-due-date', ev.target, { item, onUpdateItem, }) }
            style={{ width: 'auto', gap: '4px' }}>
            <DueDateIcon style={{ width: '15px' }} />
            {dueDate && <span className="due-date-text" style={{ fontSize: '12px' }}>{formattedDate}</span>}
          </button>
          <button>
            <AddMemberIcon />
          </button>
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

export const ChecklistItem = connect(null, mapDispatchToProps)(_ChecklistItem);
