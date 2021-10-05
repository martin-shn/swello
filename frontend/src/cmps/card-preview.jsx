import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import { Draggable } from 'react-beautiful-dnd';
import { CardPreviewLabels } from './card-preview-labels';
import { CardPreviewData } from './card-preview-data';
import { setQuickEdit } from '../store/actions/system.actions';
import { cardService } from '../services/board-services/card.service';
import { updateBoard } from '../store/actions/board.actions';
import { closeCardPopover } from '../store/actions/system.actions';


export class CardPreview extends Component {
  state = {
    title: this.props.card.title,
  };
  render() {
    const { card, idx } = this.props;

    // prettier-ignore
    return (
      <Draggable draggableId={card.id} index={idx}>
        {(provided, snapshot) => {
          return <>
            <div
              className="card-preview-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <CardPreviewInfo card={card} title={this.state.title} handleChange={({ target }) => this.setState({ title: target.value })} />
            </div>
          </>
        }}
      </Draggable>
    );
  }
}

function _CardPreviewInfo({
  card,
  history,
  location,
  cardQuickEdit,
  setQuickEdit,
  title,
  handleChange,
  board,
  updateBoard,
  closeCardPopover
}) {
  const updateCardTitle = () => {
    const updatedBoard = cardService.updateCard(board, { ...card, title });
    updateBoard(updatedBoard);
    setQuickEdit(null);
  };
  const coverImg = card.cover?.imgs?.find(img => img.id === card.cover.bgImgId);
  const coverStyle =
    coverImg && card.cover.size === 'full-cover'
      ? { backgroundImage: `url(${coverImg.url})`, height: `${coverImg.previewHeight}px` }
      : {};
  const previewRef = React.createRef();
  const isOnQuickEdit = cardQuickEdit && cardQuickEdit.id === card.id;
  return (
    <div
      className={
        'content card-preview flex column ' +
        (card.cover?.size === 'full-cover' ? `full-cover ${card.cover.color ? card.cover.color : 'cover-img'}` : '') +
        (isOnQuickEdit ? ' quick-edit' : '')
      }
      ref={previewRef}
      style={coverStyle}
      onClick={() => !isOnQuickEdit && history.push(location.pathname + `/card/${card.id}`)}>
      {card.cover && (card.cover.color || coverImg) && card.cover.size === 'top-cover' && (
        <div
          className={`card-cover${card.cover.color ? ' ' + card.cover.color : ''}${card.cover.bgImgId ? ' cover-img' : ''
            }`}
          style={
            coverImg ? { backgroundImage: `url(${coverImg.url})`, height: `${coverImg.previewHeight}px` } : {}
          }></div>
      )}
      {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewLabels card={card} />}
      <button
        className="edit-icon"
        onClick={ev => {
          ev.stopPropagation();
          const cardPos = previewRef.current.getBoundingClientRect();
          closeCardPopover()
          setQuickEdit({ pos: cardPos, id: card.id });
        }}>
        <EditIcon fontSize="small" />
      </button>
      <div
        className={`${card.cover?.size === 'full-cover' ? 'full-cover-helper' : ''}${coverImg ? ' theme ' + coverImg.theme : ''
          }`}>
        {!isOnQuickEdit && (
          <span style={{ color: card.cover?.color === 'black' && card.cover?.size === 'full-cover' ? '#fff' : '' }}>
            {card.title}
          </span>
        )}
        {isOnQuickEdit && <textarea autoFocus value={title} onChange={handleChange}></textarea>}
        {isOnQuickEdit && (
          <button className="save-quick-edit" onClick={updateCardTitle}>
            Save
          </button>
        )}
        {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewData card={card} />}
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setQuickEdit,
  updateBoard,
  closeCardPopover,
};

const mapStateToProps = state => {
  return {
    cardQuickEdit: state.systemModule.cardQuickEdit,
    board: state.boardModule.board,
  };
};

export const CardPreviewInfo = connect(mapStateToProps, mapDispatchToProps)(withRouter(_CardPreviewInfo));
