import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { ReactComponent as ArchiveIcon } from '../assets/svg/archive-icon.svg';

import { cardService } from '../services/board-services/card.service';

import { updateBoard } from '../store/actions/board.actions';
import { setCardPopover, closeCardPopover } from '../store/actions/system.actions';

import { CardSidebar } from '../cmps/card/card-sidebar';
import { CardDescription } from '../cmps/card/card-description';
import { CardLabels } from '../cmps/card/card-labels';
import { CardHeader } from '../cmps/card/card-header';
import { boardService } from '../services/board.service';
import { CardPopover } from '../cmps/card/card-popover';
import { CardChecklists } from '../cmps/card/card-checklists';
import { CardDueDate } from '../cmps/card/card-due-date';
import { CardLocation } from '../cmps/card/card-location';
import { CardMembers } from '../cmps/card/card-members';
import { CardAttachments } from '../cmps/card/card-attachments';

class _CardPage extends Component {
  state = { card: null, isArchived: false };

  componentDidMount() {
    this.loadCard();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.board !== this.props.board) {
      console.log('board changed');
      this.loadCard();
    }
  }

  componentWillUnmount() {
    this.onClosePopover();
  }

  onCloseCard = () => {
    const { boardId } = this.props.match.params;
    this.props.history.push(`/board/${boardId}`);
  };

  loadCard = async () => {
    const { board } = this.props;
    const { cardId } = this.props.match.params;
    const card = cardService.getCardById(board, cardId);
    let archivedCard;
    if (!card) {
      archivedCard = cardService.getCardFromArchive(board, cardId)
      this.setState({ card: archivedCard.card, isArchived: true })
      return
    }
    if (!card && !archivedCard) this.props.history.replace('/board/' + board._id);
    this.setState({ card });
  };

  updateField = (data, activityType, activityValues) => {
    const { board } = this.props;
    const { card, isArchived } = this.state;
    const updatedCard = { ...card, ...data };
    const activity = activityType
      ? boardService.createActivity(updatedCard, activityType, activityValues)
      : null;
    const updatedBoard = boardService.updateCard(board, updatedCard, activity, isArchived);
    this.props.updateBoard(updatedBoard);
  };

  onOpenPopover = (ev, props) => {
    const { name } = ev.target;
    this.props.setCardPopover(name, ev.target, props);
  };

  onClosePopover = () => {
    this.props.setCardPopover(null, null, null);
  };

  onArchiveCard = () => {
    const updatedBoard = boardService.archiveCard(this.props.board, this.state.card)
    this.props.updateBoard(updatedBoard)
    this.setState({ isArchived: true })
  }

  onUnarchivedCard = () => {
    const updatedBoard = boardService.unarchiveCard(this.props.board, this.state.card.id)
    this.props.updateBoard(updatedBoard)
    this.setState({ isArchived: false })
  }

  onRemoveCard = () => {
    const updatedBoard = boardService.removeCard(this.props.board, this.state.card.id)
    this.props.updateBoard(updatedBoard)
    this.onCloseCard();
  }

  render() {
    if (!this.state.card) return <CircularProgress sx={{ position: 'absolute' }} />;
    const { description, title, checklists, dueDate, attachments } = this.state.card;
    const { card, isArchived } = this.state;
    const coverImg = card.cover?.imgs?.find(img => img.id === card.cover.bgImgId)
    const { cardPopover, board, setCardPopover, closeCardPopover } = this.props;
    const { updateField } = this;
    return (
      <Modal open={true} onClose={this.onCloseCard}>
        <div
          id="card-page-wrapper"
          className="card-page-wrapper"
          onClick={ev => ev.target.classList.contains('card-page-wrapper') && this.onCloseCard()}>
          {cardPopover.name && cardPopover.anchorEl && <CardPopover />}
          <section className="card-page">
            {card.cover && (card.cover.color || coverImg) && card.cover.size &&
              <div onClick={() => coverImg && window.open(coverImg.url, "_blank")} className={coverImg ? 'cover-img' : ''}>
                <div className={`card-cover${card.cover.color ? ' ' + card.cover.color : ''}`}
                  style={coverImg ? { backgroundImage: `url(${coverImg.url})`, height: '160px' } : {}}>
                  <div className="card-cover-menu flex align-center">
                    <button
                      name="add-cover"
                      className={'add-cover-btn' + (card.cover?.color === 'black' ? ' light' : '')}
                      onClick={ev => {
                        ev.stopPropagation();
                        if (cardPopover.name === 'add-cover') this.onClosePopover()
                        else this.onOpenPopover(ev, { card, updateField })
                      }}>
                      <VideoLabelIcon />
                      Cover
                    </button>
                  </div>
                </div>
              </div>
            }
            {isArchived && <div className="archive-banner flex align-center">
              <ArchiveIcon />
              <p>This card is archived.</p>
            </div>}
            <CardHeader
              updateField={updateField}
              title={title}
              onCloseCard={this.onCloseCard}
              board={this.props.board}
              card={card}
            />
            <div className="data-and-sidebar flex">
              <main className="card-data">
                <section className="card-section card-members-labels flex wrap">
                  <CardLabels
                    card={card}
                    board={this.props.board}
                    onClosePopover={this.onClosePopover}
                    onOpenPopover={this.onOpenPopover}
                    updateField={updateField}
                  />
                  <CardMembers board={board} card={card} updateField={updateField} />
                  <CardDueDate
                    dueDate={dueDate}
                    updateField={updateField}
                    onOpenPopover={this.onOpenPopover}
                  />
                </section>
                <CardDescription description={description} updateField={updateField} />
                <CardLocation
                  card={card}
                  updateField={updateField}
                  onOpenPopover={this.onOpenPopover}
                  closeCardPopover={closeCardPopover}
                />
                <CardAttachments
                  card={card}
                  attachments={attachments}
                  setCardPopover={setCardPopover}
                  closeCardPopover={closeCardPopover}
                  updateField={updateField}
                />
                <CardChecklists card={card} checklists={checklists} updateField={updateField} />
              </main>
              <CardSidebar
                board={board}
                card={card}
                updateField={updateField}
                onOpenPopover={this.onOpenPopover}
                dueDate={dueDate}
                isArchived={isArchived}
                onArchiveCard={this.onArchiveCard}
                onUnarchivedCard={this.onUnarchivedCard}
                onRemoveCard={this.onRemoveCard}
              />
            </div>
          </section>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
  setCardPopover,
  closeCardPopover,
};

const mapStateToProps = state => ({
  board: state.boardModule.board,
  cardPopover: state.systemModule.cardPopover,
});

export const CardPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_CardPage));
