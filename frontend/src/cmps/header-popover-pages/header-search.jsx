import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';
import { PopoverMenu } from './popover-menu';
import { CardPreviewInfo } from '../card-preview';
import { cardService } from '../../services/board-services/card.service';
import { withRouter } from 'react-router';

export class HeaderSearch extends Component {
  state = { search: '', isActive: false, cards: [] };
  searchContainerRef = React.createRef();
  toggleMenu = this.props.toggleMenu;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board !== this.props.board && this.props.menu.isOpen) this.updateStateCards();
  }

  updateStateCards = () => {
    const cards = this.state.cards.map(card => cardService.getCardById(this.props.board, card.id) || cardService.getCardFromArchive(this.props.board, card.id));
    this.setState({ cards });
  };

  openMenu = ev => {
    if (ev) ev.stopPropagation();
    !this.props.menu.isOpen && this.toggleMenu(true, 'header-search', this.searchContainerRef.current);
  };

  handleChange = ev => {
    const search = ev.target.value;
    this.openMenu();
    const searchRegex = new RegExp(search, 'i');
    const cards = [];
    this.props.board.lists.forEach(list =>
      list.cards.forEach(card => searchRegex.test(card.title) && cards.push({ ...card, listTitle: list.title }))
    );
    this.props.board.archive.cards.forEach(archivedCard => {
      const cardList = this.props.board.lists.find(list => list.id === archivedCard.listId)
      return searchRegex.test(archivedCard.card.title) && cards.push({ ...archivedCard.card, listTitle: cardList.title })
    })
    this.setState({ cards, search });
  };

  cleanSearch = () => {
    this.setState({ search: '' })
    this.toggleMenu(false);
  }
  get recentCards() {
    let cards = [];
    this.props.board.lists &&
      this.props.board.lists.forEach(list => list.cards && list.cards.forEach(card => cards.push(card)));
    cards = cards.sort((a, b) => b?.createdAt - a?.createdAt);
    return cards.slice(0, 5);
  }

  render() {
    const { isActive, cards, search } = this.state;
    const { board } = this.props;
    if (!board) return <></>;
    return (
      <div ref={this.searchContainerRef} className={'header-search flex align-center' + (isActive ? ' active' : '')}>
        <span>
          <SearchIcon className="search-icon" />
        </span>
        <input
          autoCorrect="off"
          autoComplete="off"
          type="text"
          placeholder="Search"
          onClick={this.openMenu}
          onFocus={() => this.setState({ isActive: true })}
          onBlur={ev => this.setState({ isActive: false })}
          value={search}
          onChange={this.handleChange}
        />
        {isActive && (
          <span style={{ height: '16px' }}>
            <CloseIcon className="icon-close" />
          </span>
        )}
        <PopoverMenu id="header-search" classNames="header-search-popper" placement="bottom">
          {search && (
            <div>
              <div className="sub-header">Cards</div>
              <SearchCardList boardId={board._id} cards={cards} cleanSearch={this.cleanSearch} />
            </div>
          )}
          {!search && (
            <div>
              <div className="sub-header">Recent Cards</div>
              <RecentCardList recentCards={this.recentCards} />
            </div>
          )}
        </PopoverMenu>
      </div>
    );
  }
}

function _SearchCardList({ cards, history, boardId, cleanSearch }) {
  if (!cards.length) return <div>No cards match your search.</div>;
  return (
    <section className="search-card-list">
      {cards.map(card => (
        <div key={card.id} className="search-card flex" onClick={cleanSearch}>
          <CardPreviewInfo key={card.id} card={card} />
          <section>
            <div className="card-title" onClick={() => history.push(`/board/${boardId}/card/${card.id}`)}>
              {card.title}
            </div>
            <div className="list-title">
              in <span>{card.listTitle}</span>
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}
const SearchCardList = withRouter(_SearchCardList);

function RecentCardList({ recentCards }) {
  if (!recentCards.length) return <div>No Recent cards.</div>;
  return (
    <section className="recent-card-list flex column">
      {recentCards.map(card => (
        <div key={card.id} className="recent-card">
          <CardPreviewInfo key={card.id} card={card} />
        </div>
      ))}
    </section>
  );
}
