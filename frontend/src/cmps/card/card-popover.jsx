import React, { Component } from 'react';
import { Popover } from '../popover';
import { AddMembers } from './add-members';

export class CardPopover extends Component {
  render() {
    const { popover } = this.props;
    return <Popover isVisible>{popover === 'add-members' && <AddMembers />}</Popover>;
  }
}
