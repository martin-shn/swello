import React, { Component } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';

export class AddMembers extends Component {
  render() {
    return (
      <section>
        <div className="popover-header flex align-center">
          <span>Members</span>
          <button>
            <CloseIcon />
          </button>
        </div>
      </section>
    );
  }
}
