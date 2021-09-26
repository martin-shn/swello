import ChecklistIcon from '@mui/icons-material/CheckBoxOutlined';
import React, { Component } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';

export class CardChecklist extends Component {
  state = { isAdding: false };
  addBtnRef = React.createRef();
  onAddItem = ev => {
    ev.preventDefault();
  };
  render() {
    const { isAdding } = this.state;
    return (
      <section className="card-section card-checklist">
        <div className="section-header">
          <ChecklistIcon />
          <div className="flex space-between">
            <h3 className="section-title">Checklist</h3>
            <button>Delete</button>
          </div>
        </div>
        <div className="section-header" style={{ marginBottom: '5px' }}>
          <span className="percentage">0%</span>
          <div className="checklist-progress-bar"></div>
        </div>
        <div className="section-data checklist-add-item">
          {!isAdding && (
            <button onClick={() => this.setState({ isAdding: true })}>Add an item</button>
          )}
          {isAdding && (
            <form onSubmit={this.onAddItem}>
              <textarea
                name="title"
                placeholder="Add an item"
                rows="1"
                onKeyDown={ev => ev.key === 'Enter' && this.addBtnRef.current.click()}
              />
              <div className="add-controls">
                <button ref={this.addBtnRef} className="btn-add">
                  Add
                </button>
                <CloseIcon
                  className="close-icon"
                  onClick={() => this.setState({ isAdding: false })}
                />
              </div>
            </form>
          )}
        </div>
      </section>
    );
  }
}
