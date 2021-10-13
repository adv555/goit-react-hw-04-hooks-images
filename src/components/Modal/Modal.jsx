import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

function Modal(props) {
  // console.log(props);

  useEffect(() => {
    // console.log('ModalDidMount');
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        props.onClose();
      }
    }
    return () => {
      // console.log('ModalUnMount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      props.onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{props.children}</div>
    </div>,
    modalRoot,
  );
}

export default Modal;
