import React, { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { withRouter } from 'react-router';

class _CardPreview extends Component {
  render() {
    const { id, title } = this.props.card;
    return (
      <div
        className="content card-preview"
        onClick={() => this.props.history.push(this.props.location.pathname + `/card/${id}`)}>
        <button className="edit-icon">
          <EditIcon fontSize="small" />
        </button>
        {title}
      </div>
    );
  }
}

export const CardPreview = withRouter(_CardPreview);
