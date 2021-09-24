import React, { Component } from 'react';
import { ReactComponent as LogoIcon } from '../assets/svg/logo-icon.svg';
import { ReactComponent as LogoText } from '../assets/svg/logo-text.svg';
import { Link } from 'react-router-dom';

export class HomeHeader extends Component {
  state = {
    style: {
      backgroundColor: 'transparent'
    }
  }

  handleScroll = (ev) => {
    const scrollTop = ev.target.documentElement.scrollTop;
    if (scrollTop > 10) this.setColoredHeader();
    else this.setTransparentHeader()
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setTransparentHeader();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setTransparentHeader = () => {
    this.setState({ style: { backgroundColor: 'transparent' } });
  };

  setColoredHeader = () => {
    this.setState({ style: { backgroundColor: '#fff', boxShadow: '0 0 10px rgb(0 0 0 / 30%)' } });
  };

  render() {
    const { style } = this.state;
    return (
      <header className="flex align-center" style={style}>
        <div className="logo">
          <LogoIcon />
          <LogoText />
        </div>
        <div className="btns flex">
          <Link to="/login">Log in</Link>
          <Link to="/signup" className="btn">Sign up</Link>
        </div>
      </header>
    );
  }
}
