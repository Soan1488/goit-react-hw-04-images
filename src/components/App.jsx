import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import FetchPhoto from 'utils/PhotosApi';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [img, setImg] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchHits, setSearchHits] = useState(0);
  const [searchTotalHits, setSearchTotalHits] = useState(0);
  const [fetchError, setFetchError] = useState('');

  const submitForm = value => {
    setStatus('pending');
    setSearch(value);
    setPhotos([]);
    setPage(1);
  };

  const modalOpen = img => {
    setImg(img.largeImageURL);
  };

  const modalClose = () => {
    setImg('');
  };

  useEffect(() => {
    if (search === '') {
      return;
    }
    getPhotos();
  }, [search, page]);

  function getPhotos() {
    FetchPhoto(search, page)
      .then(({ hits, totalHits }) => {
        if (totalHits <= 0) {
          return Promise.reject(
            new Error(`Ooops, we can't download this request`)
          );
        }
        setPhotos([...photos, ...hits]);
        setSearchHits(page * 12);
        setSearchTotalHits(totalHits);
        setStatus('resolved');
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
        setFetchError(error.message);
        setStatus('reject');
      });
  }

  const showMoreBtnHandle = () => {
    setPage(page + 1);
  };

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={submitForm} />
      </>
    );
  }
  if (status === 'pending') {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={submitForm} />
        <ImageGallery photos={photos} onClick={modalOpen} />
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
        <Searchbar onSubmit={submitForm} />
        <ImageGallery photos={photos} onClick={modalOpen} />
        <p className={css.Text}>{fetchError}</p>
      </>
    );
  }
  if (status === 'resolved') {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={submitForm} />
        <ImageGallery photos={photos} onClick={modalOpen} />
        {searchHits <= searchTotalHits && (
          <Button onBtnClick={showMoreBtnHandle} />
        )}
        {img.length > 0 && <Modal photo={img} onClose={modalClose} />}
      </div>
    );
  }
}
