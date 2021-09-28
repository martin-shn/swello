import React, { Component } from 'react';

import { ChecklistItem } from './checklist-item';

export class ChecklistItemList extends Component {
  render() {
    const { items, onRemoveItem, onUpdateItem, onChangeField } = this.props;
    return (
      <section className="checklist-item-list">
        {items.map(item => (
          <ChecklistItem
            key={item.id}
            item={item}
            onChangeField={onChangeField}
            onRemoveItem={onRemoveItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </section>
    );
  }
}
