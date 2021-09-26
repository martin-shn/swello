import React, { Component } from 'react';
import { cardService } from '../../../services/board-services/card.service';

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
    updateField({ checklists: updatedCard.checklists });
    ev.target.reset();
    this.props.onClosePopover();
  };

  render() {
    const { onClosePopover } = this.props;
    return (
      <>
        <section className="popper-header">
          <div>Checklist</div>
          <button onClick={onClosePopover}></button>
        </section>
        <section className="popover-content add-checklist flex column">
          <form onSubmit={this.onAddChecklist}>
            <input
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
