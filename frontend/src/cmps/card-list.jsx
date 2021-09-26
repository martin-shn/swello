import React from 'react';
import { CardPreview } from './card-preview';

export class CardList extends React.Component {
  state = {
    isFullLabels: false,
    labelsClass: ''
  }
  onToggleFullLabels = (ev) => {
    ev.stopPropagation()
    const { isFullLabels } = this.state;
    this.setState({ labelsClass: isFullLabels ? ' close-animation' : ' open-animation', isFullLabels: !isFullLabels })
    setTimeout(() => { this.setState({ labelsClass: '' }) }, 500)
  }
  render() {
    const { cards } = this.props
    return (
      <section className="card-list">
        {cards.map(card => (
          <CardPreview key={card.id} card={card} isFullLabels={this.state.isFullLabels} labelsClass={this.state.labelsClass} onToggleFullLabels={this.onToggleFullLabels} />
        ))}
      </section>
    );
  }
};
