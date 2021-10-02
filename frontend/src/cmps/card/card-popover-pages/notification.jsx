import React, { Component } from 'react';

export class Notification extends Component {
    // inputRef = React.createRef();

    componentDidMount() {
        // this.inputRef.current.select();
    }

    render() {
        const { attachment, onUpdateAttachment, closeCardPopover } = this.props;
        return (
            <>
                <section className='popper-header'>
                    <div>Notification</div>
                    <button onClick={closeCardPopover}></button>
                </section>
                <section className='popper-content notification'>test </section>
            </>
        );
    }
}
