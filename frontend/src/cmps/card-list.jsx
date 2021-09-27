import React from 'react';
import { CardPreview } from './card-preview';

export class CardList extends React.Component {
  render() {
    const { cards } = this.props
    return (
      <section className="card-list">
        {cards.map(card => (
          <CardPreview key={card.id} card={card} />
        ))}
      </section>
    );
  }
};
