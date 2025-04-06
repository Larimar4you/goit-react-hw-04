import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api/Unsplash';

Modal.setAppElement('#root');

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const newImages = await fetchImages(query, page);
        if (page === 1 && newImages.length === 0) {
          toast.error('No images found for your request');
        }
        setImages(prev => (page === 1 ? newImages : [...prev, ...newImages]));
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching images.');
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (!newQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => setPage(prev => prev + 1);

  const openModal = image => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setShowModal(false);
  };

  return (
    <>
      <Toaster position='top-center' />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} openModal={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}
      {showModal && modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </>
  );
};

export default App;
