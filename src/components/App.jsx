import React, { Component } from 'react';
import { API } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Searchbar,
  ImageGallery,
  Modal,
  ImageGalleryItem,
  Button,
  Loader,
} from '.';

import css from './App.module.css';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

const status = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class App extends Component {
  state = {
    searchValue: '',
    modal: false,
    largeImg: '',
    pictures: [],
    currentStatus: status.idle,
    page: 1,
    error: '',
    loadMore: false,
  };

  handleSearchValue = value => {
    this.setState(
      {
        searchValue: value,
        page: 1,
      },
      () => this.scrollToTop()
    );
  };

  hendleModalClose = () => {
    this.setState({
      modal: false,
    });
  };

  handlePictureClick = id => {
    const selectedPicture = this.state.pictures.find(
      picture => picture.id === id
    );
    if (selectedPicture) {
      this.setState({
        largeImg: selectedPicture,
        modal: true,
      });
    }
  };

  handleButtonMore = () => {
    this.setState(prevStat => ({ page: prevStat.page + 1 }));
  };

  stateReset = () => {
    this.setState({
      modal: false,
      largeImg: '',
      pictures: [],
      currentStatus: status.idle,
      page: 1,
      error: '',
      totalView: 0,
      loadMore: false,
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  fetchImages = async () => {
    const { page, searchValue } = this.state;
    this.setState({
      currentStatus: status.pending,
    });
    try {
      const data = await API(searchValue, page);
      const { hits: images, total } = data;
      const totalView = total > 200 ? 200 : total;

      if (images.length > 0 && page === 1) {
        toast.info(
          `Total images ${total} .You can view${totalView} .`,
          toastConfig
        );
      }

      if (images.length === 0) {
        toast.info('No images were found for your request.', toastConfig);
        this.stateReset();
        return;
      }

      this.setState(prevState => ({
        pictures: page === 1 ? images : [...prevState.pictures, ...images],
        currentStatus: status.resolved,
        loadMore: page < Math.ceil(totalView / 12),
      }));
    } catch (error) {
      this.setState({
        error: error.message,
        currentStatus: status.rejected,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchValue } = this.state;
    if (page !== prevState.page || searchValue !== prevState.searchValue) {
      this.fetchImages();
    }
  }

  render() {
    const { modal, largeImg, pictures, currentStatus, error, loadMore } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar value={this.handleSearchValue} />
        {currentStatus === status.idle && null}
        {currentStatus === status.rejected && (
          <div>
            <p> Woops: {error}</p>
            {toast.error(`${error}. Please try again later.`, toastConfig)}
          </div>
        )}
        <ImageGallery onClick={this.handlePictureClick}>
          {pictures.map(({ tags, id, webformatURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              id={id}
            />
          ))}
        </ImageGallery>
        {currentStatus === status.pending && <Loader />}
        {currentStatus === status.resolved && loadMore && (
          <Button nextPage={this.handleButtonMore} />
        )}
        {modal && <Modal largeImg={largeImg} onClose={this.hendleModalClose} />}
        <ToastContainer />
      </div>
    );
  }
}
