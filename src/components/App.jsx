import { Component, React } from 'react';
import { Dna } from 'react-loader-spinner';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import FetchPhoto from 'utils/PhotosApi';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export default class App extends Component {
  state = {
    photos: [],
    status: 'idle',
    img: '',
    page: 1,
    search: '',
  };
  submitForm = value => {
    this.setState({
      search: value,
    });
  };

  modalOpen = img => {
    this.setState({ img: img.largeImageURL });
  };

  modalClose = () => {
    this.setState({ img: '' });
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    if (prevState.search !== search) {
      this.setState({
        status: 'pending',
        page: 1,
        photos: [],
      });
      this.getPhotos();
    }
    if (prevState.page !== page) {
      this.setState({
        status: 'pending',
      });
      this.getPhotos();
    }
  }

  getPhotos() {
    const { page, search } = this.state;
    FetchPhoto(search, page)
      .then(({ hits, totalHits }) => {
        console.log(hits.length <= 0);
        if (totalHits <= 0) {
          return Promise.reject(
            new Error(`Ooops, we can't download this request`)
          );
        }
        this.setState(({ photos }) => ({
          photos: [...photos, ...hits],
          hits: this.state.page * 12,
          totalHits,
          status: 'resolved',
        }));
      })
      .catch(error => {
        this.setState({
          status: 'reject',
          error: error.message,
        });
      });
  }

  showMoreBtnHandle = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { photos, status, img, hits, totalHits, error } = this.state;
    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.submitForm} />
        </>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.submitForm} />
          <ImageGallery photos={photos} onClick={this.modalOpen} />
          <div className={css.Loader}>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        </div>
      );
    }
    if (status === 'reject') {
      return (
        <>
          <Searchbar onSubmit={this.submitForm} />
          <ImageGallery photos={photos} onClick={this.modalOpen} />
          <p className={css.Text}>{error}</p>
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.submitForm} />
          <ImageGallery photos={photos} onClick={this.modalOpen} />
          {hits <= totalHits && <Button onBtnClick={this.showMoreBtnHandle} />}
          {img.length > 0 && <Modal photo={img} onClose={this.modalClose} />}
        </div>
      );
    }
  }
}
