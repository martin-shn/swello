import { CircularProgress } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { updateBoard } from '../store/actions/board.actions';
import { withRouter } from 'react-router';
import { CardDescription } from '../cmps/card/card-description';
import { CardHeader } from '../cmps/card/card-header';
import { boardService } from '../services/board.service';

class _CardPage extends Component {
  state = { card: null };

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
        const updatedBoard = boardService.saveCard(board, this.state.card);
        this.props.updateBoard(updatedBoard);
      }
    );
  };

  render() {
    if (!this.state.card) return <CircularProgress sx={{ position: 'absolute' }} />;
    const { description, title } = this.state.card;
    const { boardId } = this.props.match.params;
    return (
      <Modal
        open
        showCloseIcon={false}
        onClose={() => this.props.history.push(`/board/${boardId}`)}>
        <section className="card-page">
          <CardHeader updateField={this.updateField} title={title} />
          <div className="data-and-sidebar flex">
            <main className="card-data">
              <CardDescription description={description} updateField={this.updateField} />
            </main>
            <aside className="card-sidebar">
              <h3>Add to card</h3>
              <button>Members</button>
              <button>Labels</button>
              <button>Checklist</button>
              <button>Dates</button>
              <button>Attachment</button>
              <button>Location</button>
              <button>Cover</button>
            </aside>
          </div>
        </section>
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
