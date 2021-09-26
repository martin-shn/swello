import React, { Component } from 'react';
import { ReactComponent as DueDateIcon } from '../../../assets/svg/card/checklist-due-date.svg';
import { ReactComponent as AddMemberIcon } from '../../../assets/svg/card/add-member.svg';
import DeleteIcon from '@mui/icons-material/Delete';

export class ChecklistItemList extends Component {
  render() {
    const { items, onRemoveItem } = this.props;
    return (
      <section className="checklist-item-list">
        {items.map(item => (
          <ChecklistItem key={item.id} item={item} onRemoveItem={onRemoveItem} />
        ))}
      </section>
    );
  }
}

const ChecklistItem = props => {
  const { id, title, isDone } = props.item;
  return (
    <div className={`section-header checklist-item ${isDone ? 'done' : ''}`}>
      <div className="checkbox">
        <span className="checkbox-check"></span>
      </div>
      <div className="item flex space-between">
        <span>{title}</span>
        <section className="actions flex">
          <button>
            <DueDateIcon />
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
