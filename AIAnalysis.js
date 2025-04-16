import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import DiagnosisResult from './DiagnosisResult';
import bayoudImage from '../assets/bayoud.jpeg';
import brownLeafSpotImage from '../assets/brown_leaf_spot.jpeg';
import '../styles/ImageConfirmation.css';

const ImageConfirmation = ({ language, onConfirm }) => {
  const [answer, setAnswer] = useState('');
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [diagnosisInfo, setDiagnosisInfo] = useState(null);

  // Mock data storage
  const diagnosisData = {
    bayoud: {
      disease: language === 'ar' ? 'مرض البيوض' : 'Bayoud Disease',
      confidence: 95,
      treatment: language === 'ar' 
        ? 'العلاج الموصى به: إزالة الأشجار المصابة، استخدام مبيدات الفطريات'
        : 'Recommended treatment: Remove infected trees, apply fungicides'
    },
    brown_leaf_spot: {
      disease: language === 'ar' ? 'مرض البقع البنية' : 'Brown Leaf Spot',
      confidence: 85,
      treatment: language === 'ar' 
        ? 'العلاج الموصى به: تقليم الأوراق المصابة، تحسين التهوية'
        : 'Recommended treatment: Prune infected leaves, improve air circulation'
    },
    different: {
      disease: language === 'ar' ? 'حالة غير معروفة' : 'Unknown Condition',
      confidence: 0,
      treatment: language === 'ar' 
        ? 'يرجى استشارة أخصائي زراعي'
        : 'Please consult an agricultural specialist'
    }
  };

  const handleConfirm = () => {
    if (!answer) return;
    
    try {
      const selectedDiagnosis = diagnosisData[answer];
      if (!selectedDiagnosis) throw new Error('Invalid diagnosis selection');
      
      setDiagnosisInfo(selectedDiagnosis);
      setShowDiagnosis(true);
      onConfirm(answer);
    } catch (error) {
      console.error('Confirmation error:', error);
    }
  };

  if (showDiagnosis && diagnosisInfo) {
    return (
      <DiagnosisResult
        disease={diagnosisInfo.disease}
        confidence={diagnosisInfo.confidence}
        treatment={diagnosisInfo.treatment}
        language={language}
      />
    );
  }

  return (
    <div className="image-confirmation-container">
      <h2 className="confirmation-title">
        {language === 'ar' 
          ? 'هل حالة الشجرة تشبه أي من الصور التالية؟' 
          : 'Does the tree condition resemble any of the following images?'}
      </h2>

      <div className="image-grid">
        <div 
          className={`image-card ${answer === 'bayoud' ? 'selected' : ''}`}
          onClick={() => setAnswer('bayoud')}
        >
          <div className="image-wrapper">
            <img 
              src={bayoudImage} 
              alt="Bayoud Disease" 
              className="disease-image"
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Failed to load bayoud image');
              }}
            />
            <div className="image-overlay" />
          </div>
          <p className="disease-label">
            {language === 'ar' ? 'مرض البيوض' : 'Bayoud Disease'}
          </p>
        </div>

        <div 
          className={`image-card ${answer === 'brown_leaf_spot' ? 'selected' : ''}`}
          onClick={() => setAnswer('brown_leaf_spot')}
        >
          <div className="image-wrapper">
            <img 
              src={brownLeafSpotImage} 
              alt="Brown Leaf Spot" 
              className="disease-image"
              onError={(e) => {
                e.target.style.display = 'none';
                console.error('Failed to load brown leaf spot image');
              }}
            />
            <div className="image-overlay" />
          </div>
          <p className="disease-label">
            {language === 'ar' ? 'مرض البقع البنية' : 'Brown Leaf Spot'}
          </p>
        </div>

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