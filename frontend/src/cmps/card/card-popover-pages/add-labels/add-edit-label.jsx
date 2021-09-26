import React, { Component } from 'react';

export class AddEditLabel extends Component {
    state = {
        title: this.props.label?.title || this.props.search || '',
        color: this.props.label?.color || ''
    }

    handleChange = ({ target }) => {
        this.setState({ title: target.value })
    }

    onSaveLabel = () => {
        let { title, color } = this.state;
        if (!title) return;
        if (!color) color = "gray"
        const labelToSave = { title, color }
        if (!this.props.isAdd) labelToSave.id = this.props.label.id
        this.props.onSaveLabel(labelToSave)
    }

    colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black']

    render() {
        const { onTogglePopover, onSetPage, isAdd } = this.props;
        const { title, color } = this.state;
        return (
            <>
                <section className="popper-header">
                    <button className="back-btn" onClick={() => onSetPage('main')}></button>
                    <div>{isAdd ? 'Create label' : 'Change label'}</div>
                    <button className="close-btn" onClick={onTogglePopover}></button>
                </section>
                <section className="popper-content add-edit-label flex column">
                    <label htmlFor="name" className="title">Name</label>
                    <input type="text" name="name" id="name" value={title} onChange={this.handleChange} autoFocus />
                    <span className="title">Select a color</span>
                    <div className="colors-container flex">
                        {this.colors.map(currColor => (
                            <div key={currColor} className={"label label-box flex align-center justify-center " + currColor} onClick={() => this.setState({ color: currColor })}>
                                <span className="check-icon" style={{ display: color === currColor ? 'block' : 'none' }}></span>
                            </div>
                        ))}
                    </div>
                    <div className="btns-container flex">
                        <button className="save" onClick={this.onSaveLabel}>{isAdd ? 'Create' : 'Save'}</button>
                        {!isAdd && <button className="remove" onClick={() => onSetPage('remove')}>Delete</button>}
                    </div>
                </section>
            </>
        );
    }
}
