import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditIcon from '@mui/icons-material/EditOutlined';

export class _AddLabels extends Component {
  state = {
    search: ''
  }

  handleChange = ({ target }) => {
    this.setState({ search: target.value })
  }
  render() {
    const { card, board, onClosePopover } = this.props;
    console.log(card);
    return (
      <>
        <section className="popper-header">
          <div>Labels</div>
          <button onClick={onClosePopover}></button>
        </section>
        <section className="popover-content add-labels flex column">
          <input type="text" placeholder="Search labels..." value={this.state.search} onChange={this.handleChange} />
          <span className="title">Labels</span>
          {/* <div className="label pink flex align-center"><span>Ziv</span><span className="check-icon"></span></div>
            <button className="edit-icon"><EditIcon sx={{ color: '#42526e', fontSize: '16px' }} /></button> */}
          {board.labels.map(label => (
            <div key={label.id} className="label-container flex">
              <div className={`label flex align-center ` + label.color}>
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