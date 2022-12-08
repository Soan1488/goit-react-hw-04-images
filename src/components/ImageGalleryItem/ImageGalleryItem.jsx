import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ photos, onClick }) {
  return photos.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <li
        onClick={() => onClick({ largeImageURL, tags })}
        className={css.ImageGalleryItem}
        key={id + nanoid()}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func,
};
