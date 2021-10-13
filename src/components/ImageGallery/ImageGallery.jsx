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

function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // const prevUmageRef = useRef();
  // prevUmageRef.current = images;
  // const prevStateImages = prevUmageRef.current;

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    console.log(page);
    if (page === 1) {
      setStatus('pending');
    }

    fetchData(searchQuery, page)
      .then(newImages => {
        // setStatus('pending');
        // setImages([...newImages]);
        setImages(images => [...images, ...newImages]);
        setLoadMore(true);
        setStatus('resolved');
        if (page > 1) {
          scrollContent();
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      }); //== если не 404
  }, [page, searchQuery]);

  const onLoadMore = () => {
    setPage(page + 1);
    console.log(page, images);
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

  if (status === 'idle') return <ShearchMessage />;

  if (status === 'pending')
    return <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />;

  if (status === 'rejected') return <h1>{error.message}</h1>;

  if (status === 'resolved' && images.length < 1)
    return <NothingFoundMessage />;

  if (status === 'resolved')
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

// if (status === 'pending')
//   return (
//     <>
//       <Loader type="ThreeDots" color="#3f51b5" height={80} width={80} />

//       {status === 'resolved' && images.length < 1 && <NothingFoundMessage />}

//       {status === 'resolved' && (
//         <div>
//           <ImageGalleryList images={images} onImageClick={onImageClick} />
//           {loadMore && <Button onClick={onLoadMore} />}

//           {showModal && (
//             <Modal onClose={toggleModal}>
//               <img
//                 src={largeImageURL}
//                 alt={imageAlt}
//                 style={{ maxHeight: '80vh', background: 'white' }}
//               />
//             </Modal>
//           )}
//         </div>
//       )}
//     </>
//   );
