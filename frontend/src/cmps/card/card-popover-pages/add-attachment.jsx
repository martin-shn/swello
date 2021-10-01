import React, { Component } from 'react';
import { cloudinaryService } from '../../../services/cloudinary-service';
import { utilService } from '../../../services/util.service';

export class AddAttachment extends Component {
  inputRef = React.createRef();
  state = { errMsg: null, url: '', name: '' };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState(prevState => ({ ...prevState, [field]: value }));
  };

  onUploadFile = async ev => {
    try {
      const attachment = await cloudinaryService.uploadFile(ev);
      this.onSave(attachment);
    } catch (err) {
      this.setState({ errMsg: 'That file size exceeds the 10MB limit' });
      console.error('upload file error', err);
    }
  };

  onAttachLink = ev => {
    ev.preventDefault();
    const { url, name } = this.state;
    if (!utilService.isValidUrl(url)) {
      this.setState({ errMsg: 'Please attach a valid link' });
      return;
    }
    const attachment = {
      id: utilService.makeId(),
      createdAt: Date.now(),
      url,
      name,
    };
    this.setState({ url: '', name: '' });
    this.onSave(attachment);
  };

  onSave = attachment => {
    const { attachments = [] } = this.props.card;
    this.props.closeCardPopover();
    this.props.updateField({ attachments: [...attachments, attachment] }, 'ADD-ATTACHMENT', {
      attachment,
    });
  };

  render() {
    const { closeCardPopover } = this.props;
    const { url, name, errMsg } = this.state;
    return (
      <>
        <section className="popper-header">
          <div>Attach from...</div>
          <button onClick={closeCardPopover}></button>
        </section>
        {errMsg && <div className="err-msg popper-content">{errMsg}</div>}
        <section className="add-attachment flex column">
          <div className="upload-computer">
            <button className="btn-computer" onClick={() => this.inputRef.current.click()}>
              Computer
            </button>
            <input
              ref={this.inputRef}
              type="file"
              className="computer"
              onChange={ev => this.onUploadFile(ev)}
            />
          </div>
          <section className="popper-content">
            <hr />
            <form onSubmit={this.onAttachLink}>
              <span className="sub-header-attach">Attach a link</span>
              <input
                name="url"
                className="search"
                onChange={this.handleChange}
                value={url}
                placeholder="Paste any link here..."
              />
              {url && (
                <>
                  <span className="sub-header-attach link-name-header">Link name (optional)</span>
                  <input name="name" className="search" onChange={this.handleChange} value={name} />
                </>
              )}
              <button className="btn-card">Attach</button>
            </form>
          </section>
        </section>
      </>
    );
  }
}
