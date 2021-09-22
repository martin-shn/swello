import React, { Component } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { CardPreview } from './card-preview';

export class ListPreview extends Component {
  state = { isTitleEdit: false };

  onTitleToggle = ev => {
    ev.stopPropagation();
    this.setState(prevState => ({ isTitleEdit: !prevState.isTitleEdit }));
  };

  render() {
    const { isTitleEdit } = this.state;
    return (
      <div className="list-preview flex column">
        <div className="list-header flex space-between" onClick={this.onTitleToggle}>
          <input
            className={isTitleEdit ? '' : 'disabled'}
            defaultValue="List Title"
            onClick={this.onTitleToggle}
          />
          <button>
            <MoreHorizIcon />
          </button>
        </div>
        <div className="list-cards">
          <CardPreview />
        </div>
        <div className="add-card">
          <button className="btn-add">
            <AddIcon />
            Add a card
          </button>
        </div>
      </div>
    );
  }
}
