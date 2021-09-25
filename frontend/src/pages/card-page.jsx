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
import { CardChecklist } from '../cmps/card/card-checklist';

class _CardPage extends Component {
  state = { card: null, popoverType: null, popoverAnchor: null };

  componentDidMount() {
    this.loadCard(this.props.match.params.cardId);
  }

  loadCard = async cardId => {
    const { board } = this.props;
    const card = boardService.getCardById(board, cardId);
    if (!card) this.props.history.replace('/board/' + board._id);
    this.setState({ card });
  };

  updateField = data => {
    const { board } = this.props;
    this.setState(
      prevState => ({ card: { ...prevState.card, ...data } }),
      async () => {
        const updatedBoard = boardService.updateCard(board, this.state.card);
        this.props.updateBoard(updatedBoard);
      }
    );
  };

  onTogglePopover = popoverType => {
    this.setState({ popoverType });
  };

  onClosePopover = () => {
    this.setState({ popoverType: null, popoverAnchor: null });
  };

  render() {
    if (!this.state.card) return <CircularProgress sx={{ position: 'absolute' }} />;
    const { description, title, checklist } = this.state.card;
    const { boardId } = this.props.match.params;
    const { popoverType, popoverAnchor } = this.state;
    return (
      <Modal open={true} onClose={() => this.props.history.push(`/board/${boardId}`)}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'unset',
            outline: 'none',
            fontSize: '14px',
          }}>
          {popoverType && popoverAnchor && (
            <CardPopover
              popoverType={popoverType}
              popoverAnchor={popoverAnchor}
              card={this.state.card}
              onClosePopover={this.onClosePopover}
            />
          )}
          <section className="card-page">
            <CardHeader updateField={this.updateField} title={title} />
            <div className="data-and-sidebar flex">
              <main className="card-data">
                <CardLabels />
                <CardDescription description={description} updateField={this.updateField} />
                <CardChecklist checklist={checklist} />
              </main>
              <aside className="card-sidebar">
                <h3>Add to card</h3>
                <button
                  onClick={ev =>
                    this.setState({ popoverType: 'add-members', popoverAnchor: ev.target })
                  }>
                  Members
                </button>
                <button
                  onClick={ev =>
                    this.setState({ popoverType: 'add-labels', popoverAnchor: ev.target })
                  }>
                  Labels
                </button>
                <button>Checklist</button>
                <button>Dates</button>
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
