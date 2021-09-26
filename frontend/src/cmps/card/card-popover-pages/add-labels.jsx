import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/EditOutlined';
import { cardService } from '../../../services/board-services/card.service'

export class _AddLabels extends Component {
  state = {
    search: ''
  }

  handleChange = ({ target }) => {
    this.setState({ search: target.value })
  }
  onToggleLabel = (labelId) => {
    const updatedCard = cardService.toggleLabel(this.props.card, labelId)
    this.props.updateField({ labelIds: updatedCard.labelIds })
  }
  render() {
    const { card, board, onTogglePopover } = this.props;
    return (
      <>
        <section className="popper-header">
          <div>Labels</div>
          <button onClick={onTogglePopover}></button>
        </section>
        <section className="popover-content add-labels flex column">
          <input type="text" placeholder="Search labels..." value={this.state.search} onChange={this.handleChange} />
          <span className="title">Labels</span>
          {board.labels.map(label => (
            <div key={label.id} className="label-container flex">
              <div className={`label add flex align-center ` + label.color} onClick={() => this.onToggleLabel(label.id)}>
                <span>{label.title}</span>
                <span className="check-icon" style={{ display: card.labelIds?.includes(label.id) ? 'block' : 'none' }}></span>
              </div>
              <button className="edit-icon"><EditIcon sx={{ color: '#42526e', fontSize: '16px' }} /></button>
            </div>
          ))}
          <button>Create a new label</button>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board
  }
}

export const AddLabels = connect(mapStateToProps)(_AddLabels)