import React, { Component } from 'react';
export class AddCover extends Component {
    state = {
        cover: {
            size: this.props.card.cover?.size || '',
            color: this.props.card.cover?.color || ''
        }
    };
    colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black']
    inputRef = React.createRef();

    onSetColor = (color) => {
        this.setState(prevState => ({ cover: { color, size: prevState.cover.size ? prevState.cover.size : 'top-cover' } }), this.updateField)
    }
    onSetSize = (size) => {
        if (!this.state.cover.color) return;
        this.setState(prevState => ({ cover: { ...prevState.cover, size } }), this.updateField)
    }
    onRemoveCover = () => {
        this.setState({ cover: { size: '', color: '' } }, this.updateField)
    }
    updateField = () => {
        this.props.updateField({ cover: this.state.cover })
    }
    render() {
        const { closeCardPopover } = this.props;
        const { cover } = this.state;
        const coverClass = cover.color ? ' color ' + cover.color : ''
        const coverStyle = cover.color ? { backgroundColor: '#5e6c84', opacity: '1' } : {}
        return (
            <>
                <section className="popper-header">
                    <div>Cover</div>
                    <button onClick={closeCardPopover}></button>
                </section>
                <section className="popper-content add-cover flex column">
                    <div className="sub-header">size</div>
                    <div className="size-container flex">
                        <div
                            className={'top-cover' + (cover.size === 'top-cover' ? ' active' : '')}
                            onClick={() => this.onSetSize('top-cover')}
                            style={{ cursor: cover.color ? 'pointer' : 'default' }}
                        >
                            <div className={'cover-header' + coverClass} style={coverStyle}>

                            </div>
                            <div className="cover-body flex column">
                                <div className="row-1" style={coverStyle}></div>
                                <div className="row-2" style={coverStyle}></div>
                                <div className="body-bottom flex">
                                    <div style={coverStyle}></div>
                                    <div style={coverStyle}></div>
                                    <div style={coverStyle}></div>
                                </div>
                            </div>
                        </div>
                        <div className={'full-cover' + (cover.size === 'full-cover' ? ' active' : '') + coverClass}
                            onClick={() => this.onSetSize('full-cover')}
                            style={{ ...coverStyle, cursor: cover.color ? 'pointer' : 'default' }}
                        >
                            <div className="rows-container">
                                <div className="row-1" style={coverStyle}></div>
                                <div className="row-2" style={coverStyle}></div>
                            </div>
                        </div>
                    </div>
                    {cover && cover.color && cover.size && <button onClick={this.onRemoveCover}>Remove cover</button>}
                    <div className="sub-header">colors</div>
                    <div className="colors-contanier">
                        {this.colors.map(color => (
                            <div key={color} className={'cover ' + color + (cover.color === color ? ' active' : '')} onClick={() => this.onSetColor(color)}></div>
                        ))}
                    </div>
                    <div className="sub-header">attachments</div>
                    <div className="add-attachments">
                        <input type="file" accept="image/*" ref={this.inputRef} />
                        <button onClick={() => this.inputRef.current.click()}>Upload a cover image</button>
                    </div>
                </section>
            </>
        )
    }
}