import React, { Component } from 'react';
import { cardService } from '../../services/board-services/card.service';
import { CardChecklist } from './card-checklist';

export class CardChecklists extends Component {
  state = { addingChecklistId: null };
  addBtnRef = React.createRef();

  onAddingItem = (addingChecklistId, inputRef) => {
    this.setState({ addingChecklistId }, () => {
      inputRef && inputRef.current.focus();
    });
  };

  onDeleteChecklist = checklistId => {
    const { card } = this.props;
    const updatedCard = cardService.deleteChecklist(card, checklistId);
    console.log('updated card:', updatedCard);
    this.props.updateField(updatedCard.checklists);
  };

  // add checklist logic is in "add_checklist" cmp (popover)

  render() {
    const { checklists } = this.props;
    const { addingChecklistId } = this.state;
    return (
      <section className="card-section card-checklists">
        {checklists.map(checklist => (
          <CardChecklist
            key={checklist.id}
            checklist={checklist}
            isAdding={addingChecklistId === checklist.id}
            onAddingItem={this.onAddingItem}
            onDeleteChecklist={this.onDeleteChecklist}
          />
        ))}
      </section>
    );
  }
}
