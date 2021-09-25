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
    this.descriptionRef.current.focus();
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
          <textarea
            name="description"
            placeholder="Add a more detailed description..."
            onChange={ev => this.setState({ description: ev.target.value })}
            onFocus={() => this.setState({ isEditing: true })}
            ref={this.descriptionRef}
            value={description}
          />
          {isEditing && (
            <div className="add-controls">
              <button onClick={this.onSave} className="btn-add">
                Save
              </button>
              <CloseIcon className="close-icon" onClick={this.onCancel} />
            </div>
          )}
        </div>
      </section>
    );
  }
}
