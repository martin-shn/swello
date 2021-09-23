import React, { Component } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { CardPreview } from './card-preview';

export class ListPreview extends Component {
  state = { isTitleEdit: false, isAddingCard: false };

  render() {
    const { isTitleEdit } = this.state;
    return (
      <div className="list-preview flex column">
        <div
          className="list-header flex space-between"
          onClick={() => this.setState({ isTitleEdit: false })}>
          <input
            className={'content' + (isTitleEdit ? ' ' : ' disabled')}
            defaultValue="List Title"
            onClick={() => this.setState({ isTitleEdit: false })}
          />
          <button>
            <MoreHorizIcon />
          </button>
        </div>
        <div className="list-cards">
          <CardPreview />
        </div>
        <div className="add-card">
          <button className="content btn-add" onClick={() => this.setState({ isAddingCard: true })}>
            <AddIcon />
            Add a card
          </button>
        </div>
      </div>
    );
  }
}
