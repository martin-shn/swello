import React, { Component } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from '@material-ui/pickers';

export class AddCheckitemDueDate extends Component {
  state = { updatedDate: this.date };

  get date() {
    const { dueDate } = this.props.item;
    const date = dueDate ? new Date(dueDate).toLocaleString() : new Date();
    return date;
  }

  handleChange = date => {
    const dueDate = date ? Date.parse(date) : null;
    this.props.onUpdateItem(this.props.item, { dueDate });
    this.props.closeCardPopover();
  };

  render() {
    const { closeCardPopover } = this.props;
    const { updatedDate } = this.state;
    return (
      <div>
        <section className="popper-header">
          <div>Date</div>
          <button onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content add-due-date flex column align-center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={updatedDate}
              disableToolbar
              onChange={date => this.handleChange(date)}
            />
          </MuiPickersUtilsProvider>
          <button
            className="btn-card"
            onClick={() => this.handleChange(null)}
            style={{ width: '100%', justifyContent: 'center' }}>
            Remove
          </button>
        </section>
      </div>
    );
  }
}
