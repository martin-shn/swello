import React from 'react';
import { cardService } from '../../../../services/board-services/card.service';
export class SaveLocation extends React.Component {
  state = {
    search: ''
  }
  handleChange = ({ target }) => {
    this.setState({ search: target.value }, async () => {
      const res = await cardService.getLocationResults(this.state.search)
      console.log(res);
    })
  }
  render() {
    const { card, closeCardPopover, onSetPage, 
      // onSaveLocation, 
      isFromNav } = this.props
    const { search } = this.state;
    return (
      <>
        <section className="popper-header">
          {!isFromNav && <button className="back-btn" onClick={() => onSetPage('main')}></button>}
          <div>{card.location ? 'Change location' : 'Add location'}</div>
          <button className="close-btn" onClick={closeCardPopover}></button>
        </section>
        <section className="popper-content save-location flex column">
          <input className="search" type="text" placeholder="Search location" autoCorrect="off" autoComplete="off" value={search} onChange={this.handleChange} />
          <div className="results">

          </div>
        </section>
      </>
    );
  }
}

