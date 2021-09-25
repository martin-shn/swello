import React, { Component } from 'react';
import { Modal } from 'react-responsive-modal';
import { withRouter } from 'react-router';
import { CardDescription } from '../cmps/card/card-description';
import { CardHeader } from '../cmps/card/card-header';

class _CardPage extends Component {
  state = { card: this.props.card };

  updateField = data => {
    this.setState(prevState => ({ card: { ...prevState.card, ...data } }));
  };

  render() {
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

export const CardPage = withRouter(_CardPage);
