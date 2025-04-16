import React, { useState } from 'react';
import bayoudImage from '../assets/bayoud.jpeg';
import brownLeafSpotImage from '../assets/brown_leaf_spot.jpeg';
import '../styles/ImageConfirmation.css';

const ImageConfirmation = ({ language, onConfirm }) => {
  const [answer, setAnswer] = useState('');

  const handleConfirm = () => answer && onConfirm(answer);

  return (
    <div className="image-confirmation-container">
      <h2 className="confirmation-title">
        {language === 'ar' 
          ? 'هل حالة الشجرة تشبه أي من الصور التالية؟' 
          : 'Does the tree condition resemble any of the following images?'}
      </h2>

      <div className="image-grid">
        {/* Bayoud Disease Option */}
        <div 
          className={`image-card ${answer === 'bayoud' ? 'selected' : ''}`}
          onClick={() => setAnswer('bayoud')}
        >
          <div className="image-wrapper">
            <img 
              src={bayoudImage} 
              alt="Bayoud Disease" 
              className="disease-image"
            />
            <div className="image-overlay" />
          </div>
          <p className="disease-label">
            {language === 'ar' ? 'مرض البيوض' : 'Bayoud Disease'}
          </p>
        </div>

        {/* Brown Leaf Spot Option */}
        <div 
          className={`image-card ${answer === 'brown_leaf_spot' ? 'selected' : ''}`}
          onClick={() => setAnswer('brown_leaf_spot')}
        >
          <div className="image-wrapper">
            <img 
              src={brownLeafSpotImage} 
              alt="Brown Leaf Spot" 
              className="disease-image"
            />
            <div className="image-overlay" />
          </div>
          <p className="disease-label">
            {language === 'ar' ? 'مرض البقع البنية' : 'Brown Leaf Spot'}
          </p>
        </div>

        {/* Different Option */}
        <div 
          className={`image-card text-only ${answer === 'different' ? 'selected' : ''}`}
          onClick={() => setAnswer('different')}
        >
          <div className="different-content">
            <span className="different-icon">❌</span>
            <p className="different-label">
              {language === 'ar' ? 'لا، يبدو مختلفًا' : 'No, it looks different'}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={handleConfirm} 
        className="confirm-button" 
        disabled={!answer}
      >
        {language === 'ar' ? 'تأكيد' : 'Confirm'}
      </button>
    </div>
  );
};

export default ImageConfirmation;