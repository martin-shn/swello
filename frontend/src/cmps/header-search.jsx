import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

export class HeaderSearch extends Component {
  state = { isActive: false };
  render() {
    const { isActive } = this.state;
    return (
      <div className={'search flex align-center' + (isActive ? ' active' : '')}>
        <span>
          <SearchIcon />
        </span>
        <input
          autoCorrect="off"
          autoComplete="off"
          type="text"
          placeholder="Search"
          onFocus={() => this.setState({ isActive: true })}
          onBlur={() => this.setState({ isActive: false })}
        />
        {isActive && (
          <span style={{ height: '16px' }}>
            <CloseIcon />
          </span>
        )}
      </div>
    );
  }
}
