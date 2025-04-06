import React from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal isOpen={!!image} onRequestClose={onClose} className={styles.modal} overlayClassName={styles.overlay} shouldCloseOnOverlayClick={true}>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
      <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
      <div className={styles.details}>
        <p>
          <strong>Author:</strong> {image.user.name}
        </p>
        <p>
          <strong>Likes:</strong> {image.likes}
        </p>
        {image.alt_description && (
          <p>
            <strong>Description:</strong> {image.alt_description}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
