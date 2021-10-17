import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { DebounceInput } from 'react-debounce-input';

export class SaveLocation extends React.Component {
  state = {
    search: '',
  };
  handleChange = (search) => {
    this.setState({ search });
  };

  setAddress = async suggestion => {
    // const data = await cardService.getLocationData(address.place_id);
    try {
      const results = await geocodeByAddress(suggestion);
      const latLng = await getLatLng(results[0]);
      const location = {
        title: suggestion,
        lat: latLng.lat,
        lng: latLng.lng,
        address: results[0].formatted_address
      };
      this.props.onSaveLocation(location);
    } catch (err) {
      console.error('Error', err);
    }
  };

  render () {
    const {
      card,
      closeCardPopover,
      onSetPage,
      // onSaveLocation,
      isFromNav,
    } = this.props;
    const { search } = this.state;
    return (
      <>
        <section className="popper-header">
          {!isFromNav && <button className="back-btn" onClick={() => onSetPage('main')}></button>}
          <div>{card.location ? 'Change location' : 'Add location'}</div>
          <button className="close-btn" onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content save-location flex column">
          <PlacesAutocomplete
            value={search}
            onChange={this.handleChange}
            onSelect={this.setAddress}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <>
                <DebounceInput
                  debounceTimeout={500}
                  minLength={2}
                  autoFocus
                  {...getInputProps({
                    placeholder: 'Search location',
                    className: 'search',
                  })}
                  type="search"
                  autoCorrect="off"
                  autoComplete="off"
                />


                {suggestions && (
                  <div className="address-results">
                    <ul>
                      {suggestions.map(suggestion => {
                        return (
                          <li className="address-container" key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {
                          })}>
                            <div className="address">
                              {suggestion.description}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </>
            )}
          </PlacesAutocomplete>
        </section>
      </>
    );
  }
}
