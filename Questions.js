import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/Questions.css';

const Questions = ({ language, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      let { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('language', language);

      if (error) {
        console.error('Error fetching questions:', error);
      } else {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, [language]);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    for (const id in answers) {
      await supabase
        .from('surveys')
        .insert([{ question_id: id, response: answers[id] }]);
    }
    onSubmit();
  };

  if (questions.length === 0) return <p>Loading...</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="questions-container">
      <div className="question-card">
        <h2>{language === 'ar' ? 'استبيان الأعراض' : 'Symptoms Questionnaire'}</h2>
        <p className="question-text">{currentQuestion.question_text}</p>

        {currentQuestion.type === 'multiple-choice' ? (
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  answers[currentQuestion.id] === option ? 'selected' : ''
                }`}
                onClick={() => handleChange(currentQuestion.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            className="text-input"
            placeholder={language === 'ar' ? 'أدخل الإجابة' : 'Enter your answer'}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
          />
        )}

        <div className="controls">
          {/* Back Button */}
          <button
            className="back-btn"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            {language === 'ar' ? 'السابق' : 'Back'}
          </button>

          {/* Next/Submit Button */}
          <button
            className="next-btn"
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
          >
            {currentQuestionIndex < questions.length - 1
              ? language === 'ar' ? 'التالي' : 'Next'
              : language === 'ar' ? 'إرسال' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
