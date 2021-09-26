import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router';

class _CardPreview extends Component {
  render() {
    const { card, board, isFullLabels, labelsClass, onToggleFullLabels } = this.props;
    return (
      <div
        className="content card-preview"
        onClick={() => this.props.history.push(this.props.location.pathname + `/card/${card.id}`)}>
        <div className="labels-container flex" onClick={onToggleFullLabels}>
          {card.labelIds.map(labelId => {
            const label = board.labels.find(label => label.id === labelId);
            return (
              <div key={labelId} className={`label ${label.color}${isFullLabels ? ' open' : ''}${labelsClass}`}>
                {isFullLabels ? label.title : ''}
              </div>
            );
          })}
        </div>
        <button className="edit-icon">
          <EditIcon fontSize="small" />
        </button>
        {card.title}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board
  }
}

export const CardPreview = connect(mapStateToProps)(withRouter(_CardPreview))
