import React, { Component } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { Popover } from './popover';
import { MainPage } from './list-popover-pages/main-page';
import { CopyPage } from './list-popover-pages/copy-page';
import { MovePage } from './list-popover-pages/move-page';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { utilService } from '../services/util.service';
import { CardList } from './card-list';

export class ListPreview extends Component {
  state = {
    list: this.props.list,
    popoverPage: 'main',
  };

  componentDidUpdate = prevProps => {
    if (prevProps.isPopoverOpen !== this.props.isPopoverOpen) {
      this.setState({ popoverPage: 'main' });
    }
  };

  onAddCard = (ev, isTopAdd = false) => {
    ev.preventDefault();
    const title = ev.target.title.value;
    const card = {
      id: utilService.makeId(),
      title,
    };
    if (isTopAdd) {
      this.setState(
        prevState => ({
          list: { ...prevState.list, cards: [card, ...prevState.list.cards] },
        }),
        () => {
          this.props.onListUpdated(this.state.list);
          this.props.onAddingTopCard(false);
        }
      );
    } else {
      this.setState(
        prevState => ({
          list: { ...prevState.list, cards: [...prevState.list.cards, card] },
        }),
        () => {
          this.props.onListUpdated(this.state.list);
          this.props.onAddingCard(false);
        }
      );
    }
  };

  onMovePage = page => {
    this.setState({ popoverPage: page });
  };

  render() {
    const {
      list,
      lists,
      isAddingCard,
      onAddingCard,
      onAddingTopCard,
      isPopoverOpen,
      onTogglePopover,
      isTopAdd,
      onCopyList,
      onMoveList,
    } = this.props;
    const { popoverPage } = this.state;
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
          </button>
        </div>
        <Popover isVisible={isPopoverOpen}>
          {popoverPage === 'main' && (
            <MainPage
              onMovePage={this.onMovePage}
              list={list}
              onTogglePopover={onTogglePopover}
              onAddingTopCard={onAddingTopCard}
            />
          )}
          {popoverPage === 'copy' && (
            <CopyPage
              onMovePage={this.onMovePage}
              list={list}
              onTogglePopover={onTogglePopover}
              onCopyList={onCopyList}
            />
          )}
          {popoverPage === 'move' && (
            <MovePage
              onMovePage={this.onMovePage}
              list={list}
              lists={lists}
              onTogglePopover={onTogglePopover}
              onMoveList={onMoveList}
            />
          )}
        </Popover>
        {isTopAdd && (
          <div className="add-card">
            <form onSubmit={ev => this.onAddCard(ev, true)}>
              <textarea name="title" placeholder="Enter a title for this card..." />
              <div
                className="add-controls flex align-center"
                style={{ gap: '10px', marginBottom: '8px' }}>
                <button className="btn-add">Add Card</button>
                <CloseIcon
                  style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  onClick={() => onAddingTopCard(false)}
                />
              </div>
            </form>
          </div>
        )}
        {list.cards && <CardList cards={list.cards} />}
        <div className="add-card">
          {!isAddingCard && !isTopAdd && (
            <button className="content btn-adding" onClick={() => onAddingCard(list.id)}>
              <AddIcon />
              <span>Add a card</span>
            </button>
          )}
          {isAddingCard && !isTopAdd && (
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
