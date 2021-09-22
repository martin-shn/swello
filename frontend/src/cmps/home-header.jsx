import React, { Component } from 'react';
import { ReactComponent as LogoIcon } from '../assets/svg/logo-icon.svg';
import { ReactComponent as LogoText } from '../assets/svg/logo-text.svg';

export class HomeHeader extends Component {
  render() {
    return (
      <header className="flex">
        <div className="logo">
          <LogoIcon />
          <LogoText />
        </div>

        <div className="btns">
          <a href="/">Log in</a>
          <button>Sign Up</button>
        </div>
      </header>
    );
  }
}
