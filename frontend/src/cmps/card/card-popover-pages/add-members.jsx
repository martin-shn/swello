import React, { Component } from 'react';

export class AddMembers extends Component {
  render() {
    const { onTogglePopover } = this.props;
    return (
      <section className="popper-header">
        <div>Members</div>
        <button onClick={onTogglePopover}></button>
      </section>
    );
  }
}
