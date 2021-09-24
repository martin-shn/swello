import React, { Component } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { CardPreview } from './card-preview';
import { Popover } from './popover';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

export class ListPreview extends Component {
  onAddCard = ev => {
    ev.preventDefault();
    console.log('adding card to list: ', this.props.list);
  };

  render() {
    const { list, isAddingCard, onAddingCard, isPopoverOpen, onTogglePopover } = this.props;
    return (
      <div className="list-preview flex column">
        <div className="list-header flex space-between">
          <h2
            className="list-title content-editable"
            contentEditable
            suppressContentEditableWarning={true}>
            {list.title}
          </h2>
          <button
            className="btn-more"
            onClick={() => onTogglePopover(isPopoverOpen ? null : list.id)}>
            <MoreHorizIcon />
            <Popover isVisible={isPopoverOpen}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At a nihil omnis ex iste,
              sint enim molestias ab laudantium odio assumenda, tempora aut atque provident. Optio
              voluptatem ipsa neque iste!
            </Popover>
          </button>
        </div>
        <div className="list-cards">
          <CardPreview />
        </div>
        <div className="add-card">
          {!isAddingCard && (
            <button className="content btn-adding" onClick={() => onAddingCard(list.id)}>
              <AddIcon />
              <span>Add a card</span>
            </button>
          )}
          {isAddingCard && (
            <>
              <textarea placeholder="Enter a title for this card..." />
              <form className="flex align-center" style={{ gap: '10px' }} onSubmit={this.onAddCard}>
                <button className="btn-add">Add Card</button>
                <CloseIcon
                  style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  onClick={() => onAddingCard(false)}
                />
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}
