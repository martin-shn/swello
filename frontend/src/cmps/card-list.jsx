import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { CardPreview } from './card-preview';
import { MainCardMenu } from './card/card-popover-pages/main-card-menu';

export class CardList extends React.Component {
  style = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  render() {
    const { cards, listId } = this.props;
    return (
      <Droppable droppableId={listId} type="card">
        {(provided, snapshot) => (
          <>
            <section className="card-list" ref={provided.innerRef} {...provided.droppableProps} style={cards.length ? {} : this.style}>
              {cards.map((card, idx) => (
                <div key={card.id}>
                <CardPreview
                  key={card.id}
                  card={card}
                  idx={idx}
                  listId={listId}
                  isDraggingOver={snapshot.isDraggingOver}
                />
                <MainCardMenu id={card.id} header="test" classNames="main-card-menu" placement="right"/>
                </div>
              ))}
            </section>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    );
  }
}
