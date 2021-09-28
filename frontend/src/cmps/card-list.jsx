import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CardPreview } from './card-preview';

export class CardList extends React.Component {
  render() {
    const { cards, listId } = this.props;
    return (
      <Droppable droppableId={listId} type="card">
        {(provided, snapshot) => (
          <>
            <section className="card-list" ref={provided.innerRef} {...provided.droppableProps}>
              {cards.map((card, idx) => (
                <CardPreview
                  key={card.id}
                  card={card}
                  idx={idx}
                  isDraggingOver={snapshot.isDraggingOver}
                />
              ))}
            </section>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    );
  }
}
