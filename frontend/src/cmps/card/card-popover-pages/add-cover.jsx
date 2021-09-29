import React, { Component } from 'react';
export class AddCover extends Component {
    state = {
        size: '',
        color: ''
    };
    colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black']
    inputRef = React.createRef();

    onSetColor = (color) => {
        this.setState(prevState => ({ color, size: prevState.size ? prevState.size : 'top-cover' }))
    }
    onSetSize = (size) => {
        if (!this.state.color) return;
        this.setState({ size })
    }
    render() {
        const { closeCardPopover } = this.props;
        const coverClass = this.state.color ? ' color ' + this.state.color : ''
        const coverStyle = this.state.color ? { backgroundColor: '#5e6c84', opacity: '1' } : {}
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
                            className={'top-cover' + (this.state.size === 'top-cover' ? ' active' : '')}
                            onClick={() => this.onSetSize('top-cover')}
                            style={{ cursor: this.state.color ? 'pointer' : 'default' }}
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
                        <div className={'full-cover' + (this.state.size === 'full-cover' ? ' active' : '') + coverClass}
                            onClick={() => this.onSetSize('full-cover')}
                            style={coverStyle}
                        >
                            <div className="rows-container">
                                <div className="row-1" style={coverStyle}></div>
                                <div className="row-2" style={coverStyle}></div>
                            </div>
                        </div>
                    </div>
                    <div className="sub-header">colors</div>
                    <div className="colors-contanier">
                        {this.colors.map(color => (
                            <div className={'color ' + color + (this.state.color === color ? ' active' : '')} onClick={() => this.onSetColor(color)}></div>
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