import { Component, React } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { photos, onClick } = this.props;
    return (
      <ul className={css.ImageGallery}>
        <ImageGalleryItem photos={photos} onClick={onClick} />
      </ul>
    );
  }
}

ImageGallery.propTypes = {
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
