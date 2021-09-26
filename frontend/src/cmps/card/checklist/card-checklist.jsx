import React, { Component } from 'react';
import ChecklistIcon from '@mui/icons-material/CheckBoxOutlined';
import { ReactComponent as CloseIcon } from '../../../assets/svg/close.svg';
import { ChecklistItemList } from './checklist-item-list';

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

  onRemoveItem = itemId => {
    const { checklist } = this.props;
    this.props.onRemoveItem(checklist, itemId);
  };

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({ addedItem: { ...prevState.addedItem, [name]: value } }));
  };

  render() {
    const { onAddingItem, checklist, isAdding, onDeleteChecklist } = this.props;
    const { addedItem } = this.state;
    return (
      <section className="card-checklist card-section">
        <div className="section-header">
          <ChecklistIcon />
          <div className="flex space-between">
            <h3 className="section-title">{checklist.title}</h3>
            <button onClick={() => onDeleteChecklist(checklist.id)}>Delete</button>
          </div>
        </div>
        <div className="section-header" style={{ marginBottom: '5px' }}>
          <span className="percentage">0%</span>
          <div className="checklist-progress-bar"></div>
        </div>
        <ChecklistItemList items={checklist.items} onRemoveItem={this.onRemoveItem} />
        <div className="section-data checklist-add-item">
          {!isAdding && (
            <button onClick={() => onAddingItem(checklist.id, this.inputRef)}>Add an item</button>
          )}
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
                // onBlur={() => onAddingItem(false)}
              />
              <div className="add-controls">
                <button ref={this.addBtnRef} className="btn-add">
                  Add
                </button>
                <CloseIcon className="close-icon" onClick={() => onAddingItem(false)} />
              </div>
            </form>
          )}
        </div>
      </section>
    );
  }
}
