import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={styles.list}>
      {images.map(image => (
        <li key={image.id} className={styles.item}>
          <ImageCard image={image} onClick={() => openModal(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
