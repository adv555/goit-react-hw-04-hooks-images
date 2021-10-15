import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import fetchData from 'service/Api';
import scrollContent from 'utils/scroll';

import ImageGalleryList from 'components/ImageGallery/ImageGalleryList';
import Button from 'components/Button';
import Modal from 'components/Modal';
import {
  ShearchMessage,
  NothingFoundMessage,
} from 'components/Notices/Notices';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
function ImageGallery({ searchQuery }) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus(Status.PENDING);
    setQuery(searchQuery);
    setImages([]);
    setError(null);

    fetchImages(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = (query, page = 1) => {
    fetchData(query, page)
      .then(newImages => {
        setImages(images => [...images, ...newImages]);
        setLoadMore(true);
        setStatus(Status.RESOLVED);
        if (page > 1) {
          scrollContent();
        }
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const onLoadMore = () => {
    setPage(page + 1);
    // console.log(page, images);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = e => {
    const dataSrc = e.target.dataset.src;
    const alt = e.target.alt;
    setLargeImageURL(dataSrc);
    setImageAlt(alt);
    setShowModal(true);
  };

  if (status === Status.IDLE) return <ShearchMessage />;

  if (status === Status.PENDING)
    return <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />;

  if (status === Status.REJECTED) return <h1>{error.message}</h1>;

  if (status === Status.RESOLVED && images.length < 1)
    return <NothingFoundMessage />;

  if (status === Status.RESOLVED)
    return (
      <div>
        <ImageGalleryList images={images} onImageClick={onImageClick} />
        {loadMore && <Button onClick={onLoadMore} />}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img
              src={largeImageURL}
              alt={imageAlt}
              style={{ maxHeight: '80vh', background: 'white' }}
            />
          </Modal>
        )}
      </div>
    );
}

export default ImageGallery;
