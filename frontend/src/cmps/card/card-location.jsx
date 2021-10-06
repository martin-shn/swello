import { createRef, Component } from 'react';

export class CardLocation extends Component {

    inputRef = createRef();

    onAdressClick = (url) => {
        window.open(url, '_blank');
    };

    onSaveLocation = (location) => {
        const { updateField } = this.props;
        updateField({ location });
        this.props.closeCardPopover();
    };

    render () {
        const { card, onOpenPopover, updateField } = this.props;
        if (!card.location) return <></>;
        const { lat, lng, title, address } = card.location;
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${ lat },${ lng }`;
        const key = 'AIzaSyDgw0mWmcS4OoFUyLUj5oNbfo4KGzpHiYA';
        return (
            <section className='card-location card-section'>
                <div className='section-header'>
                    <span className='location-icon'></span>
                    <h3>Location</h3>
                </div>
                <div className='section-data location-content'>
                    <div className='map'>
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?key=${ key }&libraries=places&zoom=14&size=676x200&scale=2&markers=icon%3Ahttps://trello.com/images/location-marker.png%7C${ lat },${ lng }`}
                            alt='card-location'
                        />
                        <div className='location-desc'>
                            <div className='desc-main'>
                                <div contentEditable suppressContentEditableWarning className="content-editable location-title" ref={this.inputRef} dir='auto' onKeyDown={(ev) => {
                                    if (ev.code === 'Enter') {
                                        this.inputRef.current.blur();
                                    }
                                }}
                                    onBlur={({ target }) => { this.onSaveLocation({ ...card.location, title: target.innerText }); }} >{title}</div>
                                <div
                                    onClick={() => {
                                        this.onAdressClick(mapLink);
                                    }}
                                >
                                    {address}
                                </div>
                            </div>
                            <div className='desc-btns'>
                                <a href={mapLink} target='_blank' rel="noreferrer" className='open-map-btn' title='Open map in google maps'>{''}</a>
                                <button className='open-options-btn' name='add-location' title='Map options' onClick={ev => onOpenPopover(ev, { card, updateField, isFromNav: false })}></button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}
