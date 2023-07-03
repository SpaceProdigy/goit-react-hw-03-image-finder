import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar, ImageGallery, Modal } from '.';

import css from './App.module.css';

export class App extends Component {
  state = {
    searchValue: '',
    modal: false,
    largeImg: '',
  };

  handleSearchValue = value => {
    this.setState({
      searchValue: value,
    });
  };

  hendleModalClose = () => {
    this.setState({
      modal: false,
    });
  };

  handlePictureClick = e => {
    this.setState({
      largeImg: e,
      modal: true,
    });
  };

  render() {
    const { searchValue, modal, largeImg } = this.state;

    return (
      <div className={css.App}>
        <Searchbar value={this.handleSearchValue} />

        <ImageGallery
          values={{ searchValue }}
          onClick={this.handlePictureClick}
        />

        {modal && (
          <Modal
            largeImg={{ largeImg, modal }}
            onClose={this.hendleModalClose}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
