import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/EditOutlined';
import { cardService } from '../../../../services/board-services/card.service';
import { boardService } from '../../../../services/board.service';
import { updateBoard } from '../../../../store/actions/board.actions';
import { AddEditLabel } from './add-edit-label';
import { RemoveItem } from './../remove-item';
import { constService } from '../../../../services/const.service';

export class _AddLabels extends Component {
  state = {
    currPage: 'main',
    currEditingLabel: '',
    search: '',
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  isFoundLabel = () => {
    const { search } = this.state;
    const { board } = this.props;
    return board.labels.some(label => label.title.toLowerCase().includes(search.toLowerCase()));
  };

  onToggleLabel = label => {
    const { card: updatedCard, activity } = cardService.toggleLabel(this.props.card, label);
    this.props.updateField({ labelIds: updatedCard.labelIds }, activity.type, activity.values);
  };

  onSetPage = (page, label = null) => {
    if (page === 'edit') {
      this.setState({ currPage: 'edit', currEditingLabel: label });
    } else {
      this.setState({ currPage: page });
    }
  };
  onSaveLabel = label => {
    const updatedBoard = boardService.saveLabel(this.props.board, label);
    this.props.updateBoard(updatedBoard);
    this.cleanState();
  };

  onRemoveLabel = label => {
    const updatedBoard = boardService.removeLabel(this.props.board, label.id);
    this.props.updateBoard(updatedBoard);
    this.cleanState();
  };

  cleanState = () => {
    this.setState({ currPage: 'main', currEditingLabel: '', search: '' });
  };

  render() {
    const { card, board, closeCardPopover } = this.props;
    const { currPage, currEditingLabel, search } = this.state;
    return (
      <>
        {currPage === 'main' && (
          <>
            <section className="popper-header">
              <div>Labels</div>
              <button onClick={closeCardPopover}></button>
            </section>
            <section className="popper-content add-labels flex column">
              <input
                autoCorrect="off"
                autoComplete="off"
                type="text"
                placeholder="Search labels..."
                value={this.state.search}
                onChange={this.handleChange}
              />
              <span className="sub-header">Labels</span>
              {board.labels.map(
                label =>
                  label.title.toLowerCase().includes(search.toLowerCase()) && (
                    <div key={label.id} className="label-container flex">
                      <div
                        className={`label add flex align-center ` + label.color}
                        onClick={() => this.onToggleLabel(label)}>
                        <span>{label.title}</span>
                        <span
                          className="check-icon"
                          style={{ display: card.labelIds?.includes(label.id) ? 'block' : 'none' }}></span>
                      </div>
                      <button className="edit-icon" onClick={() => this.onSetPage('edit', label)}>
                        <EditIcon sx={{ color: '#42526e', fontSize: '16px' }} />
                      </button>
                    </div>
                  )
              )}
              <button onClick={() => this.onSetPage('add')}>{`Create a new ${
                !this.isFoundLabel() ? search + ' ' : ''
              }label`}</button>
            </section>
          </>
        )}
        {currPage === 'add' && (
          <AddEditLabel
            closeCardPopover={closeCardPopover}
            onSetPage={this.onSetPage}
            onSaveLabel={this.onSaveLabel}
            isAdd
            search={this.isFoundLabel() ? '' : this.state.search}
          />
        )}
        {currPage === 'edit' && (
          <AddEditLabel
            label={currEditingLabel}
            closeCardPopover={closeCardPopover}
            onSetPage={this.onSetPage}
            onSaveLabel={this.onSaveLabel}
          />
        )}
        {currPage === 'remove' && (
          <RemoveItem
            item={currEditingLabel}
            closeCardPopover={closeCardPopover}
            onBackClick={this.onSetPage}
            onRemoveItem={this.onRemoveLabel}
            msg={constService.MSG_REMOVE_LABEL}
            itemType="label"
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = {
  updateBoard,
};

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

export const AddLabels = connect(mapStateToProps, mapDispatchToProps)(_AddLabels);
