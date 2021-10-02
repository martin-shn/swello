import React from 'react';
import { cardService } from '../../../../services/board-services/card.service';
import { DebounceInput } from 'react-debounce-input';

export class SaveLocation extends React.Component {
  state = {
    search: '',
  };
  handleChange = ({ target }) => {
    if (target.value.trim().length < 3) {
      this.setState({ search: target.value, res: null });
    } else {
      this.setState({ search: target.value }, async () => {
        const res = await cardService.getLocationResults(this.state.search);
        this.setState({ res });
      });
    }
  };

  setAddress = async address => {
    const data = await cardService.getLocationData(address.place_id);

    this.props.onSaveLocation({
      title: data.result.name,
      lat: data.result.geometry.location.lat,
      lng: data.result.geometry.location.lng,
      address: data.result.formatted_address,
    });

    // const updatedBoard = cardService.updateCard(this.props.board, {...this.props.card, location:{
    //   title: data.result.name,
    //   lat: data.result.geometry.location.lat,
    //   lng: data.result.geometry.location.lng,
    //   address: data.result.formatted_address
    // }})
    // console.log('updated board:', updatedBoard);
    // this.props.updateBoard(updatedBoard)
  };

  render() {
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
          <DebounceInput
            debounceTimeout={500}
            minLength={2}
            className="search"
            type="search"
            placeholder="Search location"
            autoCorrect="off"
            autoComplete="off"
            value={search}
            onChange={this.handleChange}
          />
          {this.state.res && (
            <div className="address-results">
              <ul>
                {this.state.res.predictions.map(address => {
                  return (
                    <li className="address-container" key={address.place_id}>
                      <div
                        className="address"
                        onClick={() => {
                          this.setAddress(address);
                        }}>
                        {address.description}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      </>
    );
  }
}
