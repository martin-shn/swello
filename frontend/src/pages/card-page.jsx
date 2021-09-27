import { CircularProgress } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@mui/material/Modal';
import { updateBoard } from '../store/actions/board.actions';
import { withRouter } from 'react-router';
import { CardDescription } from '../cmps/card/card-description';
import { CardLabels } from '../cmps/card/card-labels';
import { CardHeader } from '../cmps/card/card-header';
import { boardService } from '../services/board.service';
import { CardPopover } from '../cmps/card/card-popover';
import { CardChecklists } from '../cmps/card/checklist/card-checklists';
import { cardService } from '../services/board-services/card.service';
import { CardDueDate } from '../cmps/card/card-due-date';

class _CardPage extends Component {
  state = { card: null, popoverType: null, popoverAnchor: null };

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

  onTogglePopover = (popoverType, popoverAnchor) => {
    this.setState({ popoverType, popoverAnchor });
  };

  render() {
    if (!this.state.card) return <CircularProgress sx={{ position: 'absolute' }} />;
    const { description, title, checklists, dueDate } = this.state.card;
    const { card, popoverType, popoverAnchor } = this.state;
    return (
      <Modal open={true} onClose={this.onCloseCard}>
        <div className="card-page-wrapper">
          {popoverType && popoverAnchor && (
            <CardPopover
              popoverType={popoverType}
              popoverAnchor={popoverAnchor}
              card={card}
              onTogglePopover={this.onTogglePopover}
              updateField={this.updateField}
            />
          )}
          <section className="card-page">
            <CardHeader
              updateField={this.updateField}
              title={title}
              onCloseCard={this.onCloseCard}
              board={this.props.board}
              card={card}
            />
            <div className="data-and-sidebar flex">
              <main className="card-data">
                <section className="card-members-labels flex">
                  <CardLabels
                    card={card}
                    board={this.props.board}
                    onTogglePopover={this.onTogglePopover}
                  />
                  {/* <CardMembers /> */}
                  <CardDueDate
                    dueDate={dueDate}
                    updateField={this.updateField}
                    onTogglePopover={this.onTogglePopover}
                  />
                </section>
                <CardDescription description={description} updateField={this.updateField} />
                <CardChecklists
                  card={card}
                  checklists={checklists}
                  updateField={this.updateField}
                />
              </main>
              <aside className="card-sidebar">
                <h3>Add to card</h3>
                <button onClick={ev => this.onTogglePopover('add-members', ev.target)}>
                  Members
                </button>
                <button onClick={ev => this.onTogglePopover('add-labels', ev.target)}>
                  Labels
                </button>
                <button onClick={ev => this.onTogglePopover('add-checklist', ev.target)}>
                  Checklist
                </button>
                <button onClick={ev => this.onTogglePopover('add-due-date', ev.target)}>
                  Date
                </button>
                <button>Attachment</button>
                <button>Location</button>
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
};

const mapStateToProps = state => ({
  board: state.boardModule.board,
});

export const CardPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(_CardPage));
