import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImg: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  handleEscapeKey = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  hendleCloseModal = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.largeImg;
    return createPortal(
      <div className={css.Overlay} onClick={this.hendleCloseModal}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
