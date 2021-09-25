import React, { Component } from 'react';

export class AddChecklist extends Component {
  render() {
    const { onClosePopover } = this.props;
    return (
      <section className="popper-header">
        <div>Checklist</div>
        <button onClick={onClosePopover}></button>
      </section>
    );
  }
}
