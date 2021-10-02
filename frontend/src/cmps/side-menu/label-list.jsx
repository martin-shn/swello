import React, { Component } from 'react';

export class LabelList extends Component {
  state = { labelIds: [] };

  onToggleLabel = labelId => {
    const { labelIds } = this.state;
    this.props.updateCriteria({ labelIds: [...labelIds, labelId] });
  };

  render() {
    const { labels = [] } = this.props;
    if (!labels.length)
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
        {labels.map(label => (
          <li key={label.id} className="label-item" onClick={() => this.onToggleLabel(label.id)}>
            <button>
              <div className={`label ${label.color}`}></div>
              <span className={`title${label.title ? '' : ' no-title'}`}>
                {label.title || `${label.color} label (default)`}
              </span>
              <span></span>
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
