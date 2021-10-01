import React, { Component } from 'react';
import { cardService } from '../../../services/board-services/card.service';
import { boardService } from '../../../services/board.service';

export class AddChecklist extends Component {
  state = {};
  titleRef = React.createRef();

  componentDidMount() {
    this.titleRef.current.select();
  }

  onAddChecklist = ev => {
    ev.preventDefault();
    const { card, updateField } = this.props;
    const title = ev.target.title.value;
    const updatedCard = cardService.addChecklist(card, title);
    const { checklists } = updatedCard;
    updateField({ checklists }, 'ADD-CHECKLIST', { title });
    ev.target.reset();
    this.props.closeCardPopover();
  };

  render() {
    const { closeCardPopover } = this.props;
    return (
      <>
        <section className="popper-header">
          <div>Checklist</div>
          <button onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content add-checklist flex column">
          <form onSubmit={this.onAddChecklist}>
            <input
              autoCorrect="off"
              autoComplete="off"
              ref={this.titleRef}
              className="title"
              name="title"
              type="text"
              defaultValue="Checklist"
            />
            <button className="btn-add">Add</button>
          </form>
        </section>
      </>
    );
  }
}
