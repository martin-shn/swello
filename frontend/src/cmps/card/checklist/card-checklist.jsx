import React, { Component } from 'react';
import ChecklistIcon from '@mui/icons-material/CheckBoxOutlined';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';
import { ChecklistItemList } from './checklist-item-list';
import { cardService } from '../../../services/board-services/card.service';
import { AppBtn } from '../../general/app-btn';

const initialState = {
  addedItem: { assignedToMemberId: null, dueDate: null, isDone: false, title: '' },
};
export class CardChecklist extends Component {
  state = initialState;
  inputRef = React.createRef();
  addBtnRef = React.createRef();

  onAddItem = ev => {
    ev.preventDefault();
    const { checklist } = this.props;
    const { addedItem } = this.state;
    this.props.onAddItem(checklist, addedItem);
    this.props.onAddingItem(false);
    this.setState(initialState);
  };

  onUpdateItem = (item, update) => {
    const { checklist } = this.props;
    const updatedItem = { ...item, ...update };
    const updatedCard = cardService.updateChecklistItem(this.props.card, checklist.id, updatedItem);
    const { checklists } = updatedCard;
    if (Object.keys(update)[0] === 'isDone' && checklist.items.every(checkitem => checkitem.isDone))
      this.props.updateField({ checklists }, 'CHECKLIST-COMPLETE', {
        title: checklist.title,
      });
    else this.props.updateField({ checklists });
  };

  onRemoveItem = itemId => {
    const { checklist } = this.props;
    this.props.onRemoveItem(checklist, itemId);
  };

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({ addedItem: { ...prevState.addedItem, [name]: value } }));
  };

  get percentageDone() {
    const { items } = this.props.checklist;
    const countDone = items.reduce((count, item) => count + (item.isDone ? 1 : 0), 0);
    if (countDone === 0) return 0;
    return parseInt((countDone / items.length) * 100);
  }

  render() {
    const {
      card,
      onAddingItem,
      checklist,
      isAdding,
      onDeleteChecklist,
      onUpdateChecklist,
    } = this.props;
    const { addedItem } = this.state;
    return (
      <section className="card-checklist card-section">
        <div className="section-header">
          <ChecklistIcon />
          <div className="flex space-between">
            <h3
              className="section-title content-editable grow"
              onBlur={ev => onUpdateChecklist({ ...checklist, title: ev.target.innerText })}
              onKeyDown={ev => ev.key === 'Enter' && ev.target.blur()}
              contentEditable
              suppressContentEditableWarning>
              {checklist.title}
            </h3>
            <AppBtn onClick={() => onDeleteChecklist(checklist.id)}>Delete</AppBtn>
          </div>
        </div>
        <div className="section-header" style={{ marginBottom: '5px' }}>
          <span className="percentage">{this.percentageDone}%</span>
          <div className="checklist-progress-bar">
            <div
              className={`progress-bar-current ${this.percentageDone === 100 ? 'done' : ''}`}
              style={{ width: this.percentageDone + '%' }}></div>
          </div>
        </div>

        <ChecklistItemList
          card={card}
          items={checklist.items}
          onRemoveItem={this.onRemoveItem}
          onUpdateItem={this.onUpdateItem}
        />

        <div className="section-data checklist-add-item">
          {!isAdding && <AppBtn onClick={() => onAddingItem(checklist.id, this.inputRef)}>Add an item</AppBtn>}
          {isAdding && (
            <form onSubmit={this.onAddItem}>
              <textarea
                ref={this.inputRef}
                name="title"
                placeholder="Add an item"
                rows="1"
                onKeyDown={ev => ev.key === 'Enter' && this.onAddItem(ev)}
                value={addedItem.title}
                onChange={this.handleChange}
              />
              <div className="add-controls">
                <button ref={this.addBtnRef} className="btn-add">
                  Add
                </button>
                <button className="btn-close">
                  <CloseIcon className="close-icon" onClick={() => onAddingItem(false)} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    );
  }
}
