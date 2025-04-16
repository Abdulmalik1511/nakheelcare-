import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Questions from './components/Questions';
import DiagnosisResult from './components/DiagnosisResult';
import ImageConfirmation from './components/ImageConfirmation';
import AIAnalysis from './components/AIAnalysis';
import './styles/global.css'

const App = () => {
  const [stage, setStage] = useState('welcome');
  const [language, setLanguage] = useState('ar');
  const [diagnosis, setDiagnosis] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [confirmation, setConfirmation] = useState('');
  const [treatment, setTreatment] = useState('');

  // ✅ Start Diagnosis
  const handleStart = (lang) => {
    setLanguage(lang);
    setStage('questions');
  };

  // ✅ When Survey is Complete
  const handleSurveyComplete = () => {
    setStage('confirmation');
  };

  // ✅ When Image is Confirmed
  const handleConfirmation = (result) => {
    setConfirmation(result);
    setStage('analysis');
  };

  // ✅ Handle AI Result and Set Treatment Based on Disease
  const handleAIResult = (result, confidence) => {
    console.log('AI Result:', result);
    console.log('Confidence:', confidence);

    if (!result) {
      console.error('No result from AI!');
      return;
    }

    setDiagnosis(result);
    setConfidence(confidence);

    // ✅ Set treatment based on disease
    switch (result) {
      case 'Bayoud Disease':
        setTreatment('Use fungicide - Improve irrigation - Remove infected trees');
        break;
      case 'Brown Leaf Spot':
        setTreatment('Use bio-fungicides - Avoid overhead watering - Prune infected leaves');
        break;
      default:
        setTreatment('Environmental stress - Ensure proper soil drainage');
        break;
    }

    setStage('diagnosis');
  };

  return (
    <div style={{ backgroundColor: '#f0f9f4', minHeight: '100vh', padding: '20px' }}>
      {/* ✅ Header */}
      <Header />

      {/* ✅ Welcome Screen */}
      {stage === 'welcome' && <Welcome onStart={handleStart} />}

      {/* ✅ Questions */}
      {stage === 'questions' && <Questions language={language} onSubmit={handleSurveyComplete} />}

      {/* ✅ Image Confirmation */}
      {stage === 'confirmation' && (
        <ImageConfirmation language={language} onConfirm={handleConfirmation} />
      )}

      {/* ✅ AI Analysis */}
      {stage === 'analysis' && (
        <AIAnalysis
          language={language}
          confirmation={confirmation}
          onResult={handleAIResult}
        />
      )}

      {/* ✅ Diagnosis Result */}
      {stage === 'diagnosis' && (
        <DiagnosisResult
          disease={diagnosis || 'No result available'}
          confidence={confidence || 0}
          treatment={treatment || 'No treatment available'}
          language={language}
        />
      )}

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default App;
