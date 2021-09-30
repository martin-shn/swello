import React from "react";
import { RemoveLocation } from "./remove-location";
import { SaveLocation } from "./save-location";
export class AddLocation extends React.Component {
    state = {
        currPage: this.props.currPage || 'main',
    }
    onSetPage = (page) => {
        this.setState({ currPage: page })
    }
    onRemoveLocation = () => {
        const { updateField } = this.props;
        updateField({ location: null });
        this.props.closeCardPopover()
    };
    onSaveLocation = (location) => { // gets the full location object
        const { updateField } = this.props;
        updateField({ location });
        this.props.closeCardPopover()
    }
    render() {
        const { card, closeCardPopover, isFromNav } = this.props;
        const { currPage } = this.state
        return (
            <>
                {currPage === 'main' &&
                    <>
                        <div className='popper-header'>
                            <div>{card.location.title}</div>
                            <button onClick={closeCardPopover}></button>
                        </div>
                        <div className='popper-menu'>
                            <button>Change location</button>
                            <button onClick={() => this.onSetPage('remove')}>Remove</button>
                        </div>
                    </>
                }
                {currPage === 'remove' && <RemoveLocation closeCardPopover={closeCardPopover} onSetPage={this.onSetPage} onRemoveLocation={this.onRemoveLocation} />}
                {currPage === 'save' && <SaveLocation card={card} closeCardPopover={closeCardPopover} onSetPage={this.onSetPage} onSaveLocation={this.onSaveLocation} isFromNav={isFromNav} />}
            </>
        )
    }
}