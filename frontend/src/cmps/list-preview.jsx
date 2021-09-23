import React, { Component } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { CardPreview } from './card-preview';
import { Popover } from './popover';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

export function ListPreview(props) {
  const { list, isAddingCard, onAddingCard, isPopoverOpen, onTogglePopover } = props;
  return (
    <div className="list-preview flex column">
      <div className="list-header flex space-between">
        <h2>List Title</h2>
        <button className="btn-more" onClick={() => onTogglePopover(isPopoverOpen ? null : list._id)}>
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
          <button className="content btn-adding" onClick={() => onAddingCard(list._id)}>
            <AddIcon />
            <span>Add a card</span>
          </button>
        )}
        {isAddingCard && (
          <>
            <textarea placeholder="Enter a title for this card..." />
            <div className="flex align-center" style={{ gap: '10px' }}>
              <button className="btn-add">Add Card</button>
              <CloseIcon
                style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                onClick={() => onAddingCard(false)}
              />
            </div>
          </>
        )}
      </div>
    </div >
  );
}
