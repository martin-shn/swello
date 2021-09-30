import React, { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router';
import { Draggable } from 'react-beautiful-dnd';
import { CardPreviewLabels } from './card-preview-labels';
import { CardPreviewData } from './card-preview-data';

export class _CardPreview extends Component {
  render() {
    const { card, idx } = this.props;
    // prettier-ignore
    return (
      <Draggable draggableId={card.id} index={idx}>
        {(provided, snapshot) => (
          <>
            <div
              className={'content card-preview flex column ' + (card.cover?.size === 'full-cover' ? `full-cover ${card.cover.color}` : '')}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={() =>
                this.props.history.push(this.props.location.pathname + `/card/${card.id}`)
              }>
              {card.cover && card.cover.color && card.cover.size === 'top-cover' && <div className={'card-cover ' + card.cover.color}></div>}
              {card.cover && card.cover.size !== 'full-cover' && <CardPreviewLabels card={card} />}
              <button className="edit-icon">
                <EditIcon fontSize="small" />
              </button>
              <span style={{ color: card.cover?.color === 'black' ? '#fff' : '' }}>{card.title}</span>
              {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewData card={card} />}
            </div>
          </>
        )}
      </Draggable>
    );
  }
}

export const CardPreview = withRouter(_CardPreview);
