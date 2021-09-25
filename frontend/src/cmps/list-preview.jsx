import React, { Component } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { Popover } from './popover';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { utilService } from '../services/util.service';
import { CardList } from './card-list';

export class ListPreview extends Component {
  state = { list: this.props.list };

  onAddCard = ev => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const card = {
      id: utilService.makeId(),
      title,
    };
    this.setState(
      prevState => ({
        list: { ...prevState.list, cards: [...prevState.list.cards, card] },
      }),
      () => {
        this.props.onListUpdated(this.state.list);
        this.props.onAddingCard(false);
      }
    );
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
        {list.cards && <CardList cards={list.cards} />}
        <div className="add-card">
          {!isAddingCard && (
            <button className="content btn-adding" onClick={() => onAddingCard(list.id)}>
              <AddIcon />
              <span>Add a card</span>
            </button>
          )}
          {isAddingCard && (
            <>
              <form onSubmit={this.onAddCard}>
                <textarea name="title" placeholder="Enter a title for this card..." />
                <div className="add-controls">
                  <button className="btn-add">Add Card</button>
                  <CloseIcon className="close-icon" onClick={() => onAddingCard(false)} />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }
}
