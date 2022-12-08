import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ onBtnClick }) {
  return (
    <button type="button" className={css.Button} onClick={onBtnClick}>
      Show more
    </button>
  );
}

Button.propTypes = {
  onBtnClick: PropTypes.func,
};
