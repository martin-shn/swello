import { CardPreview } from './card-preview';

export const CardList = ({ cards }) => {
  return (
    <section className="card-list">
      {cards.map(card => (
        <CardPreview key={card.id} card={card} />
      ))}
    </section>
  );
};
