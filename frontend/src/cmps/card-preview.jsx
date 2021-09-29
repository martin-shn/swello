import React, { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router';
import { Draggable } from 'react-beautiful-dnd';
import { CardPreviewLabels } from './card-preview-labels';
import { CardPreviewData } from './card-preview-data';

export class _CardPreview extends Component {
  render() {
    const { card, idx } = this.props;
    return (
      <Draggable draggableId={card.id} index={idx}>
        {(provided, snapshot) => (
          <div className={snapshot.isDragging ? 'dragging' : ''}>
            <div
              className="content card-preview flex column"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={() =>
                this.props.history.push(this.props.location.pathname + `/card/${card.id}`)
              }>
              <CardPreviewLabels card={card} />
              <button className="edit-icon">
                <EditIcon fontSize="small" />
              </button>
              <span>{card.title}</span>
              <CardPreviewData card={card} />
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export const CardPreview = withRouter(_CardPreview);
