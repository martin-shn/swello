import React, { Component } from 'react';

export class EditAttachment extends Component {
  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.select();
  }

  render() {
    const { attachment, onUpdateAttachment, closeCardPopover } = this.props;
    return (
      <>
        <section className="popper-header">
          <div>Edit attachment</div>
          <button onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content edit-attachment">
          <label>Link name</label>
          <form
            onSubmit={ev => {
              ev.preventDefault();
              onUpdateAttachment(attachment, { name: ev.target.title.value });
            }}>
            <input
              ref={this.inputRef}
              autoCorrect="off"
              autoComplete="off"
              className="search"
              name="title"
              type="text"
              defaultValue={attachment.name}
            />
            <button className="btn-add">Update</button>
          </form>
        </section>
      </>
    );
  }
}
