import React from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [input, setInput] = useState('');

  const onInputChange = evt => {
    setInput(evt.currentTarget.value);
  };

  const submitHandle = e => {
    e.preventDefault();
    if (input.trim() === '') {
      return toast.warn('Please write something', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
    onSubmit(input.trim());

    setInput('');
  };
  return (
    <header className={css.Searchbar}>
      <form onSubmit={submitHandle} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch />
        </button>

        <input
          onChange={onInputChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
        />
      </form>
      <ToastContainer />
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
