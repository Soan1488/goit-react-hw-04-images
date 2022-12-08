import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  render() {
    const { photo } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClose}>
        <div className={css.Modal}>
          <img src={photo.largeImageURL} alt={photo.tads} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tads: PropTypes.string,
  }),
};
