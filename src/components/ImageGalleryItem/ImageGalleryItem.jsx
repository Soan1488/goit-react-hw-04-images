import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ photos }) {
  return photos.map(({ id, webformatURL, tags }) => {
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  });
}
