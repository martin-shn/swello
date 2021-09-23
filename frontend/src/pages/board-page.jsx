import React, { Component } from 'react';
import { AppHeader } from '../cmps/app-header';
import { ListAll } from '../cmps/list-all';
import { TopPanel } from '../cmps/top-panel';
import { storageService } from '../services/async-storage.service';

const DUMMY_BG =
  'https://trello-backgrounds.s3.amazonaws.com/5f52ac04a60f498ce74a6b64/1280x856/fa5aaef20b1be05b0c9cf24debcad762/hero7.jpg';
const DUMMY_LISTS = [
  { _id: 'l1' },
  { _id: 'l2' },
  { _id: 'l3' },
  { _id: 'l4' },
  { _id: 'l5' },
  { _id: 'l6' },
  { _id: 'l7' },
  { _id: 'l8' },
  { _id: 'l9' },
];
export class BoardPage extends Component {
  state = {
    // move these to redux later:
    isEditingTitle: false /* when editing some list title - will contain the list id that it's title is being edited.
                             - will contain "title" if the board title is being edited */,
    isAddingCard: false, // when adding a card - will contain the list id that it's card is being added.
    isPopover: false,
  };

  componentDidMount() {
    storageService.init();
  }

  onAnyClick = () => {
    this.onEditTitle(false);
    this.onTogglePopover(false);
  };

  onEditTitle = (listId, ev) => {
    if (ev) ev.stopPropagation();
    if (this.state.isPopover) this.onTogglePopover(false);
    this.setState({ isEditingTitle: listId });
  };

  onTogglePopover = (listId, ev) => {
    if (ev) ev.stopPropagation();
    if (this.state.isEditingTitle) this.onEditTitle(false);
    this.setState({ isPopover: listId });
  };

  onAddingCard = listId => {
    this.setState({ isAddingCard: listId });
  };

  // TODO: add dynamic text color using contrast-js
  render() {
    const { isEditingTitle, isPopover, isAddingCard } = this.state;
    return (
      <main
        className="board-page"
        style={{ backgroundImage: `url('${DUMMY_BG}')` }}
        onClick={this.onAnyClick}>
        <AppHeader />
        <TopPanel isEditingTitle={isEditingTitle === 'main-title'} onEditTitle={this.onEditTitle} />
        <ListAll
          lists={DUMMY_LISTS}
          isEditingTitle={isEditingTitle}
          onEditTitle={this.onEditTitle}
          onTogglePopover={this.onTogglePopover}
          isPopover={isPopover}
          isAddingCard={isAddingCard}
          onAddingCard={this.onAddingCard}
        />
      </main>
    );
  }
}
