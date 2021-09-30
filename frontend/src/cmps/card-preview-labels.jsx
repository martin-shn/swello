import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFullLabels, setLabelsClass } from '../store/actions/board.actions';

export class _CardPreviewLabels extends Component {
  state = {
    labelClass: '',
  };

  onToggleFullLabels = ev => {
    ev.stopPropagation();
    const { isFullLabels } = this.props;
    this.props.setLabelsClass(isFullLabels ? ' close-animation' : ' open-animation');
    this.props.setFullLabels(!isFullLabels);
    this.timeout = setTimeout(() => {
      this.props.setLabelsClass('');
    }, 500);
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { board, card, isFullLabels, labelsClass } = this.props;
    if (!card.labelIds) return <></>;
    return (
      <div className="labels-container flex" onClick={this.onToggleFullLabels}>
        {card.labelIds.map(labelId => {
          const label = board.labels.find(label => label.id === labelId);
          return (
            <div
              key={labelId}
              className={`label ${label.color}${isFullLabels ? ' open' : ''}${labelsClass}`}>
              {isFullLabels ? label.title : ''}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setFullLabels,
  setLabelsClass,
};

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    isFullLabels: state.boardModule.isFullLabels,
    labelsClass: state.boardModule.labelsClass,
  };
}

export const CardPreviewLabels = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewLabels);
