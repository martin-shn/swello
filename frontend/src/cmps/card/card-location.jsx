import { createRef, Component } from 'react';

export class CardLocation extends Component {

    inputRef = createRef();

    onAdressClick = (url) => {
        window.open(url, '_blank');
    };

    onSaveLocation = (location) => {
        const { updateField } = this.props;
        updateField({ location });
        this.props.closeCardPopover()
    }

    render() {
        const { card, onOpenPopover, updateField } = this.props;
        if (!card.location) return <></>;
        const { lat, lng, title, address } = card.location;
        const mapLink = `https://www.google.com/maps/place/@${lat},${lng},17z/data=!3m1!4b1!4m5!3m4!1s0x151d4c83ad21fce3:0x9b69cc3763d2eef2!8m2!3d32.0672452!4d34.7712316`;
        const key = 'AIzaSyDgw0mWmcS4OoFUyLUj5oNbfo4KGzpHiYA';
        return (
            <section className='location-card card-section'>
                <div className='section-header'>
                    <span className='location-icon'></span>
                    <h3>Location</h3>
                </div>
                <div className='section-data location-content'>
                    <div className='map'>
                        <img
                            src={`https://maps.googleapis.com/maps/api/staticmap?key=${key}&libraries=places&zoom=14&size=676x200&scale=2&markers=icon%3Ahttps://trello.com/images/location-marker.png%7C${lat},${lng}`}
                            alt='card-location'
                        />
                        <div className='location-desc'>
                            <div className='desc-main'>
                                <textarea ref={this.inputRef} dir='auto' value={title} onKeyDown={(ev) => {
                                    if (ev.code === 'Enter') {
                                        this.inputRef.current.blur()
                                    }
                                }}
                                    onChange={({ target }) => { this.onSaveLocation({ ...card.location, title: target.value }) }}
                                    onBlur={({ target }) => { this.onSaveLocation({ ...card.location, title: target.value }) }} />
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
