import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) {
  return (
    <>
      <img
        onClick={e => {
          onImageClick(e);
        }}
        src={webformatURL}
        data-src={largeImageURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
