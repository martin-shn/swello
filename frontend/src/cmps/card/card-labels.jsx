import React from 'react';
export class CardLabels extends React.Component {
  state = {
    currLabelId: null,
  };
  componentDidUpdate() {
    const { currLabelId } = this.state;
    if (currLabelId && !this.props.card.labelIds.includes(this.state.currLabelId)) {
      this.setState({ currLabelId: null });
      this.props.onTogglePopover(null, null);
    }
  }
  render() {
    const { card, board, onTogglePopover } = this.props;
    if (!card.labelIds || !card.labelIds.length) return <></>;
    return (
      <div className="card-item card-labels flex column">
        <span>labels</span>
        <div className="labels-container flex">
          {card.labelIds &&
            card.labelIds.map(labelId => {
              const label = board.labels.find(label => label.id === labelId);
              if (!label) return <></>;
              return (
                <div
                  key={labelId}
                  className={'label detail flex justify-center ' + label.color}
                  onClick={ev => {
                    this.setState({ currLabelId: labelId });
                    onTogglePopover('add-labels', ev.target);
                  }}>
                  {label.title}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
