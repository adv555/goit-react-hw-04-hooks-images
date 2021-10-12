import { Component } from 'react';
import Loader from 'react-loader-spinner';
import fetchImages from 'service/Api';
import scrollContent from 'utils/scroll';

import ImageGalleryList from 'components/ImageGallery/ImageGalleryList';
import Button from 'components/Button';
import Modal from 'components/Modal';
import {
  ShearchMessage,
  NothingFoundMessage,
} from 'components/Notices/Notices';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loadMore: false,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    imageAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending' });

      fetchImages(nextSearchQuery, nextPage)
        .then(images => {
          this.setState({
            images: [...prevState.images, ...images],
            loadMore: true,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' })); //== если не 404
    }
    if (prevPage !== nextPage) {
      fetchImages(nextSearchQuery, nextPage)
        .then(images => {
          this.setState({
            images: [...prevState.images, ...images],
            loadMore: true,
            status: 'resolved',
          });
          scrollContent();
        })
        .catch(error => this.setState({ error, status: 'rejected' })); //== если не 404
    }
  }

  onLoadMore = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onImageClick = e => {
    const dataSrc = e.target.dataset.src;
    const alt = e.target.alt;
    this.setState({
      largeImageURL: dataSrc,
      imageAlt: alt,
      showModal: true,
    });
  };

  render() {
    const {
      state: {
        status,
        error,
        images,
        loadMore,
        showModal,
        largeImageURL,
        imageAlt,
      },
      onImageClick,
      onLoadMore,
      toggleModal,
    } = this;

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
}

export default ImageGallery;
