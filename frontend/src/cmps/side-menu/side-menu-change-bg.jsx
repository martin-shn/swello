import React, { Component } from 'react';
import { createApi } from 'unsplash-js';
import { AppBtn } from '../general/app-btn';
import DUMMY_DATA from '../../data/unsplash.json';
import CloseIcon from '@mui/icons-material/Close';
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import _ from 'lodash';

const COLORS = [
  'rgb(0, 121, 191)',
  'rgb(210, 144, 52)',
  'rgb(81, 152, 57)',
  'rgb(176, 70, 50)',
  'rgb(137, 96, 158)',
  'rgb(205, 90, 145)',
  'rgb(75, 191, 107)',
  'rgb(0, 174, 204)',
];

export class SideMenuChangeBg extends Component {
  state = { colorOrImg: null };
  render() {
    const { setPage, toggleSideMenu, updateBoard, board } = this.props;
    const { colorOrImg } = this.state;
    return (
      <section className="side-menu-change-bg flex column">
        <div className="side-menu-header">
          <span
            className="back"
            onClick={() => (colorOrImg ? this.setState({ colorOrImg: null }) : setPage('index'))}
          ><BackIcon /></span>
          <h3>{colorOrImg === 'img' ? 'Photos by Unsplash' : 'Change Background'}</h3>
          <button className="close-side-menu" onClick={() => toggleSideMenu(false)}><CloseIcon /></button>
        </div>
        <section className="content">
          <hr style={{ margin: '0 auto 14px' }} />
          {!colorOrImg && (
            <div className="options flex">
              <div onClick={() => this.setState({ colorOrImg: 'img' })}>
                <div className="image photos" />
                <span className="title">Photos</span>
              </div>
              <div onClick={() => this.setState({ colorOrImg: 'color' })}>
                <div className="image colors" />
                <span className="title">Colors</span>
              </div>
            </div>
          )}
          {colorOrImg === 'img' && <ChangeBgImg board={board} updateBoard={updateBoard} />}
          {colorOrImg === 'color' && <ChangeBgColor board={board} updateBoard={updateBoard} />}
        </section>
      </section>
    );
  }
}

class ChangeBgImg extends Component {
  state = { images: DUMMY_DATA };

  onSearch = async ev => {
    ev.preventDefault();
    const unsplash = createApi({
      accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
      secret: process.env.REACT_APP_UNSPLASH_SECRET,
    });
    const res = await unsplash.search.getPhotos({
      query: ev.target.search.value,
      page: _.random(1, 10),
      perPage: 18,
      orientation: 'landscape',
    });
    const images = res.response.results.map(img => ({ id: img.id, urls: img.urls, user: img.user })); // remove useless info
    console.log(images);
    this.setState({ images });
  };

  render() {
    const { images } = this.state;
    const { board, updateBoard } = this.props;
    return (
      <section className="change-bg-img">
        <form className="search-form flex align-center" onSubmit={this.onSearch}>
          <input name="search" className="search" />
          <AppBtn className="btn-search">Search</AppBtn>
        </form>
        <div className="options flex wrap">
          {images?.length > 0 &&
            images.map(img => (
              <div key={img.id} onClick={() => updateBoard({ ...board, style: { imgUrl: img.urls.regular } })}>
                <div className="image" style={{ backgroundImage: `url(${img.urls.thumb})` }}>
                  <span className="username">{img.user.name}</span>
                </div>
              </div>
            ))}
        </div>
        {images?.length === 0 && <div>No images match your search</div>}
      </section>
    );
  }
}

function ChangeBgColor({ board, updateBoard }) {
  return (
    <section className="change-bg-color options flex wrap">
      {COLORS.map(color => (
        <div key={color} onClick={() => updateBoard({ ...board, style: { bgColor: color } })}>
          <div className="image" style={{ backgroundColor: color, width: '100%' }}></div>
        </div>
      ))}
    </section>
  );
}
