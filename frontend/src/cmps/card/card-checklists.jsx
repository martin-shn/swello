import React, { Component } from 'react';
import { cardService } from '../../services/board-services/card.service';
import { CardChecklist } from './checklist/card-checklist';

export class CardChecklists extends Component {
  state = { addingChecklistId: null };
  addBtnRef = React.createRef();
  card = this.props.card;

  onAddingItem = (addingChecklistId, inputRef) => {
    this.setState({ addingChecklistId }, () => {
      inputRef && inputRef.current.focus();
    });
  };

  onAddItem = (checklist, item) => {
    const updatedCard = cardService.addChecklistItem(this.card, checklist.id, item);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onUpdateItem = (checklist, updatedItem) => {
    const updatedCard = cardService.updateChecklistItem(this.card, checklist.id, updatedItem);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onRemoveItem = (checklist, itemId) => {
    const updatedCard = cardService.removeChecklistItem(this.card, checklist.id, itemId);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onDeleteChecklist = checklistId => {
    const updatedCard = cardService.deleteChecklist(this.card, checklistId);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onUpdateChecklist = updatedChecklist => {
    const { checklists } = this.card;
    const updatedChecklists = checklists.map(checklist =>
      checklist.id === updatedChecklist.id ? updatedChecklist : checklist
    );
    this.props.updateField({ checklists: updatedChecklists });
  };

  // add checklist logic is in "add_checklist" cmp (popover)

  render() {
    this.card = this.props.card;
    const {
      checklists,
      // card
    } = this.props;
    const { addingChecklistId } = this.state;
    if (!checklists) return <></>;
    return (
      <section className="card-section card-checklists">
        {checklists.map(checklist => (
          <CardChecklist
            key={checklist.id}
            checklist={checklist}
            isAdding={addingChecklistId === checklist.id}
            onAddingItem={this.onAddingItem}
            onAddItem={this.onAddItem}
            onUpdateItem={this.onUpdateItem}
            onRemoveItem={this.onRemoveItem}
            onUpdateChecklist={this.onUpdateChecklist}
            onDeleteChecklist={this.onDeleteChecklist}
          />
        ))}
      </section>
    );
  }
}
