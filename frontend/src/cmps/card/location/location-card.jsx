import { createRef, Component } from 'react';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export class LocationCard extends Component {
    state = {
        isMenuOpen: false,
    };
    inputRef = createRef();

    onClick = () => {
        this.setState({ isMenuOpen: true });
    };

    onAdressClick = (url) => {
        window.open(url, '_blank');
    };

    onClose = (ev) => {
        ev.preventDefault();
        this.setState({ isMenuOpen: false });
    };

    onRemove = () => {
        const { updateField } = this.props;
        updateField({ location: null });
    };

    onUpdate = (title) => {
        const { updateField } = this.props;
        updateField({ location: {
            ...this.props.location, title
        } });
    };

    render() {
        const { location } = this.props;
        const { isMenuOpen } = this.state;
        if (!location) return <></>;
        const { lat, lng, title, address } = location;
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
                                <textarea ref={this.inputRef} dir='auto' defaultValue={title} onKeyDown={(ev)=>{
                                    if(ev.code==='Enter') {
                                        // this.onUpdate(ev.target.value)
                                        this.inputRef.current.blur()
                                    }
                                    }} 
                                    onBlur={({target})=>{this.onUpdate(target.value)}}/>
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
                                <button className='open-options-btn' title='Map options' onClick={this.onClick}></button>
                            </div>
                        </div>
                    </div>
                </div>
                <Popper
                    className='inner-card-popper'
                    open={isMenuOpen}
                    anchorEl={this.inputRef.current}
                    role={undefined}
                    placement='bottom-start'
                    // placement='bottom-end'
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.onClose}>
                                    <MenuList
                                        //   autoFocusItem={isBoardsMenuOpen}
                                        id='composition-menu'
                                        aria-labelledby='composition-button'
                                    >
                                        <div className='popper-header'>
                                            <div>{title}</div>
                                            <button onClick={this.onClose}></button>
                                        </div>
                                        <div className='popper-menu'>
                                            <ul>
                                                <MenuItem
                                                    onClick={(ev) => {
                                                        this.onClose(ev);
                                                    }}
                                                >
                                                    <button>Change location</button>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={(ev) => {
                                                        this.onClose(ev);
                                                    }}
                                                >
                                                    <button onClick={this.onRemove}>Remove</button>
                                                </MenuItem>
                                            </ul>
                                        </div>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </section>
        );
    }
}
