import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, photo }) {
  useEffect(() => {
    function handleClose(e) {
      if (e.code === 'Escape') {
        onClose();
      }
      if (e.currentTarget === e.target) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img src={photo} alt={photo} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  photo: PropTypes.string,
};
