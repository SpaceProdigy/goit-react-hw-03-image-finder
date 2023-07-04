import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags, id }) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        id={id}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
