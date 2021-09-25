import React, { Component } from 'react';

export class AddLabels extends Component {
  render() {
    const { onClosePopover } = this.props;
    return (
      <section className="popper-header">
        <div>Labels</div>
        <button onClick={onClosePopover}></button>
      </section>
    );
  }
}
