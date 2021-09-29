import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router';
import { updateBoard, setFullLabels, setLabelsClass } from '../store/actions/board.actions';
import { Draggable } from 'react-beautiful-dnd';

class _CardPreview extends Component {
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
    const { card, idx, board, isFullLabels, labelsClass } = this.props;
    return (
      <Draggable draggableId={card.id} index={idx}>
        {(provided, snapshot) => (
          <div className={snapshot.isDragging ? 'dragging' : ''}>
            <div
              className={`content card-preview`}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onClick={() =>
                this.props.history.push(this.props.location.pathname + `/card/${card.id}`)
              }>
              <div className="labels-container flex" onClick={this.onToggleFullLabels}>
                {card.labelIds &&
                  card.labelIds.map(labelId => {
                    const label = board.labels.find(label => label.id === labelId);
                    return (
                      <div
                        key={labelId}
                        className={`label ${label.color}${
                          isFullLabels ? ' open' : ''
                        }${labelsClass}`}>
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
          </div>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
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

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(withRouter(_CardPreview));
