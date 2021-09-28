import React, { Component } from 'react';

export class AddMembers extends Component {
  render() {
    const { onClosePopover } = this.props;
    return (
      <section className="popper-header">
        <div>Members</div>
        <button onClick={onClosePopover}></button>
      </section>
    );
  }
}
