import React, { Component } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from '@material-ui/pickers';

export class AddDueDate extends Component {
  state = { date: this.date };

  get date() {
    const { dueDate } = this.props.card;
    const date = dueDate?.date ? new Date(dueDate.date).toLocaleString() : new Date();
    return date;
  }

  onSave = () => {
    const { date } = this.state;
    const dueDate = { ...this.props.card.dueDate, date: Date.parse(date) };
    this.props.updateField({ dueDate });
    this.props.onClosePopover();
  };

  onRemove = () => {
    this.props.updateField({ dueDate: null });
    this.props.onClosePopover();
  };

  render() {
    const { onClosePopover } = this.props;
    const { date } = this.state;
    return (
      <div>
        <section className="popper-header">
          <div>Date</div>
          <button onClick={onClosePopover}></button>
        </section>
        <section className="popper-content add-checklist flex column align-center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              variant="static"
              openTo="date"
              value={date}
              disableToolbar
              onChange={date => this.setState({ date })}
            />
          </MuiPickersUtilsProvider>
          <div className="flex column" style={{ width: '100%', gap: '5px' }}>
            <button
              className="btn-add"
              onClick={this.onSave}
              style={{ width: '100%', justifyContent: 'center' }}>
              Save
            </button>
            <button
              className="btn-card"
              onClick={this.onRemove}
              style={{ width: '100%', justifyContent: 'center' }}>
              Remove
            </button>
          </div>
        </section>
      </div>
    );
  }
}
