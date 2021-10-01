import React, { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router';
import { Draggable } from 'react-beautiful-dnd';
import { CardPreviewLabels } from './card-preview-labels';
import { CardPreviewData } from './card-preview-data';

export class _CardPreview extends React.Component {
  render() {
    const { card, idx } = this.props;
    const coverImg = card.cover?.imgs?.find(img => img.id === card.cover.bgImgId)
    const coverStyle = (coverImg && card.cover.size === 'full-cover') ? { backgroundImage: `url(${coverImg.url})`, height: `${coverImg.previewHeight}px` } : {}
    // prettier-ignore
    return (
      <Draggable draggableId={card.id} index={idx}>
        {(provided, snapshot) => (
          <>
            <div
              className="card-preview-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={() =>
                this.props.history.push(this.props.location.pathname + `/card/${card.id}`)
              }>
              <div
                className={'content card-preview flex column ' + (card.cover?.size === 'full-cover' ? `full-cover ${card.cover.color ? card.cover.color : 'cover-img'}` : '')}
                style={coverStyle}
              >
                {card.cover && (card.cover.color || coverImg) && card.cover.size === 'top-cover' &&
                  <div className={`card-cover${card.cover.color ? ' ' + card.cover.color : ''}${card.cover.bgImgId ? ' cover-img' : ''}`}
                    style={coverImg ? { backgroundImage: `url(${coverImg.url})`, height: `${coverImg.previewHeight}px` } : {}}
                  >

                  </div>}
                {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewLabels card={card} />}
                <button className="edit-icon">
                  <EditIcon fontSize="small" />
                </button>
                <div className={`${card.cover?.size === 'full-cover' ? 'full-cover-helper' : ''}${coverImg ? ' theme ' + coverImg.theme : ''}`}>
                  <span style={{ color: card.cover?.color === 'black' && card.cover?.size === 'full-cover' ? '#fff' : '' }}>{card.title}</span>
                  {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewData card={card} />}
                </div>
              </div>
            </div>
          </>
        )
        }
      </Draggable>
    );
  }
}

export const CardPreview = withRouter(_CardPreview);
