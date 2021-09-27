import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/EditOutlined';
import { cardService } from '../../../../services/board-services/card.service'
import { boardService } from '../../../../services/board.service';
import { updateBoard } from '../../../../store/actions/board.actions';
import { AddEditLabel } from './add-edit-label';
import { RemoveLabel } from './remove-label';

export class _AddLabels extends Component {
  state = {
    currPage: 'main',
    currEditingLabel: '',
    search: ''
  }

  handleChange = ({ target }) => {
    this.setState({ search: target.value })
  }

  isFoundLabel = () => {
    const { search } = this.state;
    const { board } = this.props;
    return board.labels.some(label => label.title.toLowerCase().includes(search.toLowerCase()))
  }


  onToggleLabel = (labelId) => {
    const updatedCard = cardService.toggleLabel(this.props.card, labelId)
    this.props.updateField({ labelIds: updatedCard.labelIds })
  }
  onSetPage = (page, label = null) => {
    if (page === 'edit') {
      this.setState({ currPage: 'edit', currEditingLabel: label })
    } else {
      this.setState({ currPage: page })
    }
  }
  onSaveLabel = (label) => {
    const updatedBoard = boardService.saveLabel(this.props.board, label);
    this.props.updateBoard(updatedBoard)
    this.cleanState()
  }

  onRemoveLabel = (labelId) => {
    const updatedBoard = boardService.removeLabel(this.props.board, labelId)
    this.props.updateBoard(updatedBoard)
    this.cleanState()
  }

  cleanState = () => {
    this.setState({ currPage: 'main', currEditingLabel: '', search: '' })
  }

  render() {
    const { card, board, onTogglePopover } = this.props;
    const { currPage, currEditingLabel, search } = this.state;
    return (
      <>
        {currPage === 'main' &&
          <>
            <section className="popper-header">
              <div>Labels</div>
              <button onClick={onTogglePopover}></button>
            </section>
            <section className="popper-content add-labels flex column">
              <input type="text" placeholder="Search labels..." value={this.state.search} onChange={this.handleChange} />
              <span className="title">Labels</span>
              {board.labels.map(label => (
                label.title.toLowerCase().includes(search.toLowerCase()) &&
                <div key={label.id} className="label-container flex">
                  <div className={`label add flex align-center ` + label.color} onClick={() => this.onToggleLabel(label.id)}>
                    <span>{label.title}</span>
                    <span className="check-icon" style={{ display: card.labelIds?.includes(label.id) ? 'block' : 'none' }}></span>
                  </div>
                  <button className="edit-icon" onClick={() => this.onSetPage('edit', label)}><EditIcon sx={{ color: '#42526e', fontSize: '16px' }} /></button>
                </div>
              ))}
              <button onClick={() => this.onSetPage('add')}>{`Create a new ${!this.isFoundLabel() ? (search + ' ') : ''}label`}</button>
            </section>
          </>
        }
        {
          currPage === 'add' &&
          <AddEditLabel onTogglePopover={onTogglePopover} onSetPage={this.onSetPage} onSaveLabel={this.onSaveLabel} isAdd search={this.isFoundLabel() ? '' : this.state.search} />
        }
        {
          currPage === 'edit' &&
          <AddEditLabel label={currEditingLabel} onTogglePopover={onTogglePopover} onSetPage={this.onSetPage} onSaveLabel={this.onSaveLabel} />
        }
        {
          currPage === 'remove' &&
          <RemoveLabel label={currEditingLabel} onSetPage={this.onSetPage} onRemoveLabel={this.onRemoveLabel} />
        }
      </>

    );
  }
}

const mapDispatchToProps = {
  updateBoard
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board
  }
}

export const AddLabels = connect(mapStateToProps, mapDispatchToProps)(_AddLabels)