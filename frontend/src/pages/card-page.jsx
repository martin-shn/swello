import { CircularProgress } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import { updateBoard } from '../store/actions/board.actions';
import { setCardPopover } from '../store/actions/system.actions';
import { withRouter } from 'react-router';
import { CardDescription } from '../cmps/card/card-description';
import { CardLabels } from '../cmps/card/card-labels';
import { CardHeader } from '../cmps/card/card-header';
import { boardService } from '../services/board.service';
import { CardPopover } from '../cmps/card/card-popover';
import { CardChecklists } from '../cmps/card/card-checklists';
import { cardService } from '../services/board-services/card.service';
import { CardDueDate } from '../cmps/card/card-due-date';
import { CardLocation } from '../cmps/card/card-location'

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
    const { description, title, checklists, dueDate, members = [], location } = this.state.card;
    const { card } = this.state;
    const { cardPopover, board } = this.props;
    const { updateField } = this;
    return (
      <Modal open={true} onClose={this.onCloseCard}>
        <div className="card-page-wrapper">
          {cardPopover.name && cardPopover.anchorEl && <CardPopover />}
          <section className="card-page">
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
                  {/* <CardMembers /> */}
                  <CardDueDate
                    dueDate={dueDate}
                    updateField={updateField}
                    onOpenPopover={this.onOpenPopover}
                  />
                </section>
                <CardDescription description={description} updateField={updateField} />
                <CardLocation card={card} updateField={updateField} onOpenPopover={this.onOpenPopover} />
                <CardChecklists card={card} checklists={checklists} updateField={updateField} />
              </main>
              <aside className="card-sidebar">
                <h3>Add to card</h3>
                <button name="add-members" onClick={ev => this.onOpenPopover(ev, { members })}>
                  Members
                </button>
                <button
                  name="add-labels"
                  onClick={ev => this.onOpenPopover(ev, { board, card, updateField })}>
                  Labels
                </button>
                <button
                  name="add-checklist"
                  onClick={ev => this.onOpenPopover(ev, { card, updateField })}>
                  Checklist
                </button>
                <button
                  name="add-due-date"
                  onClick={ev => this.onOpenPopover(ev, { dueDate, updateField })}>
                  Date
                </button>
                <button>Attachment</button>
                <button
                  name="add-location"
                  onClick={ev => this.onOpenPopover(ev, { card, updateField, currPage: 'save', isFromNav: true })}>
                  Location
                </button>
                <button>Cover</button>
              </aside>
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
};

const mapStateToProps = state => ({
  board: state.boardModule.board,
  cardPopover: state.systemModule.cardPopover,
});

export const CardPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_CardPage));
