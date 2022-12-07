import { Component, React } from 'react';
import { Dna } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ImageGallery.module.css';
import FetchPhoto from 'utils/PhotosApi';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    photos: null,
    status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.setState({ status: 'pending' });
      FetchPhoto(this.props.search)
        .then(data => {
          if (data.hits.length === 0) {
            toast.error('Please write correct request name', {
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
          this.setState({
            photos: data.hits,
            status: 'resolved',
          });
        })
        .catch(error =>
          toast.error(error.message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        );
    }
  }

  render() {
    const { status, photos } = this.state;
    if (status === 'idle') {
      return;
    }
    if (status === 'pending') {
      return (
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
      );
    }
    if (status === 'resolved') {
      return (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem photos={photos} />
        </ul>
      );
    }
  }
}
