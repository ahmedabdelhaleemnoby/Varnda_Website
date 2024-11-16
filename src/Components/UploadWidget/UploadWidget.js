import React, { useState } from 'react';
import styles from './UploadWidget.module.css'; // Importing styles from UploadWidget.module.css

const UploadWidget = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const deleteImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveImages = () => {
    // Implement the save functionality
    closeModal();
  };

  return (
    <div className={styles['upload-widget']}>
      <button onClick={openModal} className={styles['upload-button']}>ارفع الصور</button>

      {isModalOpen && (
        <div className={styles['modal']}>
          <div className={styles['modal-content']}>
            <span className={styles['close-button']} onClick={closeModal}>&times;</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="file-input"
              className={styles['file-input']}
              multiple
            />
            <label htmlFor="file-input" className={styles['file-input-label']}>
              اختر الصور
            </label>
            <div className={styles['image-preview']}>
              {images.map((image, index) => (
                <div key={index} className={styles['image-container-modal']}>
                  <img src={image.url} alt={`Preview ${index}`} />
                  <button className={styles['delete-button']} onClick={() => deleteImage(index)}>×</button>
                </div>
              ))}
            </div>
            <button className={styles['save-button']} onClick={saveImages}>حفظ</button>
          </div>
        </div>
      )}

      <div className={styles['image-preview']}>
        {images.map((image, index) => (
          <div key={index} className={styles['image-container']}>
            <img src={image.url} alt={`Preview ${index}`} />
            <button className={styles['delete-button']} onClick={() => deleteImage(index)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadWidget;
