import React from 'react';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    input: '',
  };

  onInputChange = evt => {
    this.setState({
      input: evt.currentTarget.value,
    });
  };

  submitHandle = e => {
    const { input } = this.state;
    const { onSubmit } = this.props;
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

    this.setState({
      input: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.submitHandle} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch />
          </button>

          <input
            onChange={this.onInputChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
