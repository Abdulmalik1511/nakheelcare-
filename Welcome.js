import React, { useState } from 'react';
import '../styles/Welcome.css';
import logo from '../assets/squLogo.png'; // Import your logo

const Welcome = ({ onStart }) => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic

  // ✅ تحديث اللغة عند تغييرها
  const handleLanguageChange = (lang) => setLanguage(lang);

  // ✅ بدء التشخيص عند النقر على زر البداية
  const handleStart = () => onStart(language);

  return (
    <div className="welcome-container">
      {/* Logo in the middle */}
      <img src={logo} alt="Nakheel Care Logo" className="logo" />

      {/* عنوان التطبيق */}
      <h1>
        {language === 'ar' ? 'مرحبًا بك في نخيل كير' : 'Welcome to Nakheel Care'}
      </h1>

      {/* وصف التطبيق */}
      <p>
        {language === 'ar'
          ? 'ساعد في تشخيص حالة نخلك.'
          : 'Help diagnose the health condition of date palm trees .'}
      </p>

      {/* أزرار اختيار اللغة */}
      <div className="language-buttons">
        <button
          className={`language-button ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          English
        </button>
        <button
          className={`language-button ${language === 'ar' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('ar')}
        >
          العربية
        </button>
      </div>

      {/* زر البدء */}
      <button
        className="start-button"
        onClick={handleStart}
      >
        {language === 'ar' ? 'ابدأ التشخيص' : 'Start Diagnosis'}
      </button>
    </div>
  );
};

export default Welcome;
