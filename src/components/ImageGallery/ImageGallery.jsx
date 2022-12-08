import { Component, React } from 'react';
import { Dna } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import css from './ImageGallery.module.css';
import FetchPhoto from 'utils/PhotosApi';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    photos: [],
    status: 'idle',
    img: null,
    showModal: false,
    page: 1,
  };

  modalOpen = img => {
    this.setState({ img, showModal: true });
  };

  modalClose = () => {
    this.setState({ showModal: false });
  };
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { search } = this.props;
    if (prevProps.search !== search) {
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
    const { page } = this.state;
    const { search } = this.props;
    FetchPhoto(search, page)
      .then(({ hits }) => {
        if (hits.length <= 0) {
          return Promise.reject(
            new Error(`Ooops, we can't download this request`)
          );
        }
        this.setState(({ photos }) => ({
          photos: [...photos, ...hits],
          status: 'resolved',
        }));
      })
      .catch(error => {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        this.setState({
          status: 'reject',
        });
      });
  }

  showMoreBtnHandle = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, photos, showModal } = this.state;
    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return (
        <>
          <ul className={css.ImageGallery}>
            <ImageGalleryItem photos={photos} onClick={this.modalOpen} />
          </ul>
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
        </>
      );
    }
    if (status === 'reject') {
      return (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem photos={photos} onClick={this.modalOpen} />
        </ul>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={css.ImageGallery}>
            <ImageGalleryItem photos={photos} onClick={this.modalOpen} />
          </ul>
          <Button onBtnClick={this.showMoreBtnHandle} />
          {showModal && (
            <Modal photo={this.state.img} onClose={this.modalClose} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  search: PropTypes.string.isRequired,
};
