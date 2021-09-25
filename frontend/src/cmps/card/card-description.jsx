import React, { Component } from 'react';
import { ReactComponent as DescriptionIcon } from '../../assets/svg/card/description.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';

export class CardDescription extends Component {
  state = { isEditing: false, description: '' };
  descriptionRef = React.createRef();

  componentDidMount() {
    this.loadDescription();
  }

  loadDescription = () => {
    const { description = '' } = this.props;
    this.setState({ description, isEditing: false });
  };

  onSave = () => {
    const { description } = this.state;
    this.setState({ isEditing: false });
    this.props.updateField({ description });
  };

  onEdit = () => {
    this.setState({ isEditing: true }, () => this.descriptionRef.current.select());
  };

  onCancel = () => {
    this.loadDescription();
  };

  render() {
    const { isEditing, description } = this.state;
    return (
      <section className="card-section card-description" onClick={this.onAnyClick}>
        <div className="section-header">
          <DescriptionIcon />
          <div className="flex align-center">
            <h3 className="section-title">Description</h3>
            {!isEditing && description && (
              <button className="btn-edit" onClick={this.onEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="section-data">
          {!isEditing && (
            <p className={'description-view' + (description ? '' : ' empty')} onClick={this.onEdit}>
              {description || 'Add a more detailed description...'}
            </p>
          )}
          {isEditing && (
            <>
              <textarea
                name="description"
                placeholder="Add a more detailed description..."
                onChange={ev => this.setState({ description: ev.target.value })}
                onFocus={ev => this.setState({ isEditing: true })}
                ref={this.descriptionRef}
                onKeyDown={ev => {
                  ev.target.style.height = '5px';
                  ev.target.style.height = ev.target.scrollHeight + 'px';
                }}
                value={description}
              />
              <div className="add-controls">
                <button onClick={this.onSave} className="btn-add">
                  Save
                </button>
                <CloseIcon className="close-icon" onClick={this.onCancel} />
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}
