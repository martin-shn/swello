import React, { Component } from 'react';
import { cardService } from '../../services/board-services/card.service';
import { CardChecklist } from './checklist/card-checklist';

export class CardChecklists extends Component {
  state = { addingChecklistId: null };
  addBtnRef = React.createRef();

  onAddingItem = (addingChecklistId, inputRef) => {
    this.setState({ addingChecklistId }, () => {
      inputRef && inputRef.current.focus();
    });
  };

  onAddItem = (checklist, item) => {
    const { card } = this.props;
    const updatedCard = cardService.addChecklistItem(card, checklist.id, item);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onUpdateItem = (checklist, updatedItem) => {
    const { card } = this.props;
    const updatedCard = cardService.updateChecklistItem(card, checklist.id, updatedItem);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onRemoveItem = (checklist, itemId) => {
    const { card } = this.props;
    const updatedCard = cardService.removeChecklistItem(card, checklist.id, itemId);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  onDeleteChecklist = checklistId => {
    const { card } = this.props;
    const updatedCard = cardService.deleteChecklist(card, checklistId);
    const { checklists } = updatedCard;
    this.props.updateField({ checklists });
  };

  // add checklist logic is in "add_checklist" cmp (popover)

  render() {
    const { checklists, 
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
            onDeleteChecklist={this.onDeleteChecklist}
          />
        ))}
      </section>
    );
  }
}
