import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../assets/svg/search.svg';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import { PopoverMenu } from './menu/popover-menu';

export class HeaderSearch extends Component {
  state = { search: '', isActive: false };
  searchContainerRef = React.createRef();
  toggleMenu = this.props.toggleMenu;

  handleChange = ev => {
    const search = ev.target.value;
    this.setState({ search });
    if (search) {
      this.toggleMenu(true, 'header-search', this.searchContainerRef.current);
    } else {
      this.toggleMenu(false);
    }
  };

  render() {
    const { isActive } = this.state;
    return (
      <div ref={this.searchContainerRef} className={'header-search flex align-center' + (isActive ? ' active' : '')}>
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
          onChange={this.handleChange}
        />
        {isActive && (
          <span style={{ height: '16px' }}>
            <CloseIcon />
          </span>
        )}
        <PopoverMenu id="header-search" classNames="header-search-popper" placement="bottom">
          <div className="sub-header">Cards</div>
          <section></section>
        </PopoverMenu>
      </div>
    );
  }
}
