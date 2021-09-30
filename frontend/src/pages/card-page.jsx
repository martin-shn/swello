import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { CircularProgress } from '@mui/material';
import Modal from '@mui/material/Modal';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

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
  state = { card: null };

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
    if (!card) this.props.history.replace('/board/' + board._id);
    this.setState({ card });
  };

  updateField = data => {
    const { board } = this.props;
    const { card } = this.state;
    const updatedCard = { ...card, ...data };
    const updatedBoard = boardService.updateCard(board, updatedCard);
    this.props.updateBoard(updatedBoard);
  };

  onOpenPopover = (ev, props) => {
    const { name } = ev.target;
    this.props.setCardPopover(name, ev.target, props);
  };

  onClosePopover = () => {
    this.props.setCardPopover(null, null, null);
  };

  render() {
    if (!this.state.card) return <CircularProgress sx={{ position: 'absolute' }} />;
    const { description, title, checklists, dueDate, attachments } = this.state.card;
    const { card } = this.state;
    const { cardPopover, board } = this.props;
    const { updateField } = this;
    return (
      <Modal open={true} onClose={this.onCloseCard}>
        <div
          id="card-page-wrapper"
          className="card-page-wrapper"
          onClick={ev => ev.target.classList.contains('card-page-wrapper') && this.onCloseCard()}>
          {cardPopover.name && cardPopover.anchorEl && <CardPopover />}
          <section className="card-page">
            {card.cover && card.cover.color && card.cover.size && (
              <div className={'card-cover ' + card.cover.color}>
                <div className="card-cover-menu flex align-center">
                  <button
                    name="add-cover"
                    className={'add-cover-btn' + (card.cover?.color === 'black' ? ' light' : '')}
                    onClick={ev => this.onOpenPopover(ev, { card, updateField })}>
                    <VideoLabelIcon />
                    Cover
                  </button>
                </div>
              </div>
            )}
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
                  closeCardPopover={this.props.closeCardPopover}
                />
                <CardAttachments attachments={attachments} />
                <CardChecklists card={card} checklists={checklists} updateField={updateField} />
              </main>
              <CardSidebar
                board={board}
                card={card}
                updateField={updateField}
                onOpenPopover={this.onOpenPopover}
                dueDate={dueDate}
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
  closeCardPopover
};

const mapStateToProps = state => ({
  board: state.boardModule.board,
  cardPopover: state.systemModule.cardPopover,
});

export const CardPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_CardPage));
