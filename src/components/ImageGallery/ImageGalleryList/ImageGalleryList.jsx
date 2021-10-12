import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

export default function ImageGalleryList({ images, onImageClick }) {
  // console.log(images, onImageClick);
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li className="ImageGalleryItem" key={image.id}>
          <ImageGalleryItem {...image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onImageClick: PropTypes.func.isRequired,
};
