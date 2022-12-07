import { Component, React } from 'react';
import { ToastContainer } from 'react-toastify';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    search: '',
  };
  submitForm = value => {
    this.setState({
      search: value,
    });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.submitForm} />
        <ImageGallery search={this.state.search} />
        <ToastContainer />
      </div>
    );
  }
}
