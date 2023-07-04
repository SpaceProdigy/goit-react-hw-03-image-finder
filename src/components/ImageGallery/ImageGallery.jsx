import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ children, ...props }) => {
  const handlePictureClick = e => {
    props.onClick(Number(e.target.id));
  };

  return (
    <ul className={css.ImageGallery} onClick={handlePictureClick}>
      {children}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
