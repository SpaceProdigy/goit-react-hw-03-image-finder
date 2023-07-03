import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem, Loader, Button } from '../index';
import { fetchPictures } from '../../api/api';

const status = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
};

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

export class ImageGallery extends Component {
  static propTypes = {
    values: PropTypes.shape({
      searchValue: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    pictures: [],
    currentStatus: status.idle,
    error: '',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.props.values;
    const { page } = this.state;
    const { values } = prevProps;
    try {
      if (searchValue !== values.searchValue) {
        this.setState(
          { page: 1, pictures: [], currentStatus: status.pending },
          () => {
            fetchPictures(searchValue, page).then(({ hits: images, total }) => {
              if (images.length > 0) {
                const totalView = total > 200 ? 200 : total;

                toast.info(
                  `Total images ${total} .You can view${totalView} .`,
                  toastConfig
                );
              }

              if (images.length === 0) {
                toast.info(
                  'No images were found for your request.',
                  toastConfig
                );
                this.stateReset();
                return;
              }

              this.setState({
                pictures: images,
                currentStatus: status.resolved,
              });
            });
          }
        );
      }

      if (page !== 1 && page !== prevState.page) {
        fetchPictures(searchValue, page).then(({ hits: images }) => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...images],
            currentStatus: status.resolved,
          }));
        });
      }
    } catch (error) {
      this.setState({
        error: error.message,
        currentStatus: status.rejected,
      });
    }
  }
  stateReset = () => {
    return this.setState({
      pictures: [],
      currentStatus: status.idle,
      error: '',
      page: 1,
    });
  };

  addImages = () => {
    return this.setState(prevStat => ({ page: prevStat.page + 1 }));
  };

  handlePictureClick = e => {
    const { pictures } = this.state;
    const currentPicture = Number(e.target.id);
    const selectedPicture = pictures.find(
      picture => picture.id === currentPicture
    );
    if (selectedPicture) {
      this.props.onClick(selectedPicture);
    }
  };

  render() {
    const { pictures, currentStatus, error } = this.state;

    return (
      <>
        {currentStatus === status.idle && null}
        {currentStatus === status.rejected &&
          toast.error(`${error} . Please try again later.`, toastConfig)}
        <ul className={css.ImageGallery} onClick={this.handlePictureClick}>
          {pictures.map(({ tags, id, webformatURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              id={id}
            />
          ))}
        </ul>
        {currentStatus === status.pending && <Loader />}
        {currentStatus === status.resolved && (
          <Button nextPage={this.addImages} />
        )}
      </>
    );
  }
}
