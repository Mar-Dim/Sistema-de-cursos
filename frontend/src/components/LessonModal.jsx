import React, { useState, useEffect } from 'react';
import '../css/lessonModal.css';

const LessonModal = ({ lesson, onClose, onComplete }) => {
  // 1. Hooks siempre arriba
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  // 2. useEffect para resetear
  useEffect(() => {
    if (lesson) {
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setSelectedOption(null);
      setFeedback(null);
      setIsFinished(false);
      setScore(0);
    }
  }, [lesson]);

  // 3. Salida temprana
  if (!lesson) {
    return null;
  }

  // 4. Lógica y variables
  const lessonType = lesson.type.toLowerCase();
  const isInteractive = lessonType === 'quiz' || lessonType === 'evaluation';

  const currentQuestion = isInteractive && lesson.questions && lesson.questions.length > 0
    ? lesson.questions[currentQuestionIndex]
    : null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const answerForApi = {
      questionId: currentQuestion.id,
      selectedOptionIndex: selectedOption,
    };
    
    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);

      const updatedAnswers = [...userAnswers, answerForApi];
      setUserAnswers(updatedAnswers);

      if (currentQuestionIndex < lesson.questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        let correctCount = 0;
        updatedAnswers.forEach(ans => {
            const q = lesson.questions.find(q => q.id === ans.questionId);
            if (q && q.correctOptionIndex === ans.selectedOptionIndex) correctCount++;
        });
        const finalScore = Math.round((correctCount / lesson.questions.length) * 100);
        setScore(finalScore);
        setIsFinished(true);
      }
    }, 1200);
  };

  const renderMCQ = () => (
    <div className="mcq-options">
      {currentQuestion.options.map((option, index) => (
        <label key={index} className={`mcq-option ${selectedOption === index ? 'selected' : ''}`}>
          <input
            type="radio"
            name={`question-${currentQuestion.id}`}
            value={index}
            checked={selectedOption === index}
            onChange={() => setSelectedOption(index)}
            disabled={feedback !== null}
          />
          {option}
        </label>
      ))}
    </div>
  );

  const renderInteractiveContent = () => {
    if (isFinished) {
      return (
        <div className="quiz-summary">
          <h3>¡Quiz completado!</h3>
          <p className="final-score">Tu puntuación: <span>{score}%</span></p>
          <p>{score >= lesson.requiredScore ? '¡Felicidades, has aprobado!' : 'Necesitas repasar.'}</p>
          <button className="complete-button" onClick={() => onComplete(lesson.id, userAnswers)}>Continuar</button>
        </div>
      );
    }
    
    if (!currentQuestion) {
      return (
        <div className="quiz-summary">
          <p>Esta lección interactiva no tiene preguntas.</p>
          <button className="complete-button" onClick={() => onComplete(lesson.id, [])}>Marcar como completada</button>
        </div>
      );
    }

    return (
      <div className="question-container">
        <p className="question-text">{currentQuestion.text}</p>
        {renderMCQ()}
        {feedback && <div className={`feedback ${feedback}`}>{feedback}</div>}
        <button className="submit-answer-button" onClick={handleSubmitAnswer} disabled={selectedOption === null || feedback !== null}>
          {feedback ? '...' : 'Confirmar'}
        </button>
      </div>
    );
  };

  const renderSimpleContent = () => (
    <div className="modal-actions">
      <p className="lesson-main-content">{lesson.content || 'Contenido no disponible.'}</p>
      <button className="complete-button" onClick={() => onComplete(lesson.id, [])}>Marcar como completada</button>
    </div>
  );

  return (
    <div className="lesson-modal">
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{lesson.title}</h3>
          <p className="lesson-type-badge">{lessonType.replace('_', ' ')}</p>
        </div>
        {isInteractive ? renderInteractiveContent() : renderSimpleContent()}
        <button className="close-modal" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default LessonModal;