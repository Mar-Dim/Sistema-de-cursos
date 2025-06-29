import React, { useState, useEffect } from 'react';
import '../css/lessonModal.css';

const LessonModal = ({ lesson, onClose, onComplete }) => {
  const isInteractive = lesson.type === 'QUIZ' || lesson.type === 'EVALUATION';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [blankValue, setBlankValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (lesson) {
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setSelectedOption(null);
      setBlankValue('');
      setFeedback(null);
      setIsFinished(false);
      setScore(0);
    }
  }, [lesson]);

  if (!lesson) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const currentQuestion = isInteractive && lesson.questions.length > 0 ? lesson.questions[currentQuestionIndex] : null;

  const handleSubmitAnswer = () => {
    if (!currentQuestion || (currentQuestion.type === 'MCQ' && selectedOption === null) || (currentQuestion.type === 'FILL_IN_BLANK' && blankValue.trim() === '')) {
      return;
    }

    let isCorrect = false;
    if (currentQuestion.type === 'MCQ') {
      isCorrect = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'FILL_IN_BLANK') {
      isCorrect = blankValue.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    }

    setUserAnswers([...userAnswers, { question: currentQuestionIndex, correct: isCorrect }]);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      setBlankValue('');

      if (currentQuestionIndex < lesson.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const finalAnswers = [...userAnswers, { question: currentQuestionIndex, correct: isCorrect }];
        const correctCount = finalAnswers.filter(ans => ans.correct).length;
        const finalScore = Math.round((correctCount / lesson.questions.length) * 100);
        setScore(finalScore);
        setIsFinished(true);
      }
    }, 1500);
  };

  const renderMCQ = () => (
    <div className="mcq-options">
      {currentQuestion.options.map((option, index) => (
        <label key={index} className={`mcq-option ${selectedOption === index ? 'selected' : ''}`}>
          <input type="radio" name="mcq" value={index} checked={selectedOption === index} onChange={() => setSelectedOption(index)} disabled={feedback !== null} />
          {option}
        </label>
      ))}
    </div>
  );

  const renderFillInBlank = () => (
    <div className="fill-blank-container">
      <p className="code-snippet">{currentQuestion.text.split('___')[0]}</p>
      <input type="text" className="code-input" value={blankValue} onChange={(e) => setBlankValue(e.target.value)} disabled={feedback !== null} autoFocus />
      <p className="code-snippet">{currentQuestion.text.split('___')[1]}</p>
    </div>
  );

  const renderInteractiveContent = () => {
    if (isFinished) {
      return (
        <div className="quiz-summary">
          <h3>¡Quiz completado!</h3>
          <p className="final-score">Tu puntuación: <span>{score}%</span></p>
          <p>{score >= lesson.requiredScore ? '¡Felicidades, has aprobado!' : 'Necesitas repasar un poco más.'}</p>
          <button className="complete-button" onClick={() => onComplete(lesson.id, score)}>
            Continuar
          </button>
        </div>
      );
    }
    
    // Manejar el caso de un quiz sin preguntas
    if (!currentQuestion) {
      return (
        <div className="quiz-summary">
          <p>Esta lección interactiva aún no tiene preguntas.</p>
          <button className="complete-button" onClick={() => onComplete(lesson.id, 100)}>
            Marcar como completada
          </button>
        </div>
      );
    }

    return (
      <div className="question-container">
        <p className="question-text">{currentQuestion.type === 'MCQ' ? currentQuestion.text : 'Completa el código:'}</p>
        {currentQuestion.type === 'MCQ' && renderMCQ()}
        {currentQuestion.type === 'FILL_IN_BLANK' && renderFillInBlank()}
        
        {feedback && <div className={`feedback ${feedback}`}>{feedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}</div>}
        
        <button className="submit-answer-button" onClick={handleSubmitAnswer} disabled={feedback !== null}>
          {feedback ? '...' : 'Confirmar Respuesta'}
        </button>
      </div>
    );
  };

  const renderSimpleContent = () => (
    <div className="modal-actions">
      <p className="lesson-main-content">{lesson.content}</p>
      <button className="complete-button" onClick={() => onComplete(lesson.id)}>
        Marcar como completada
      </button>
    </div>
  );

  return (
    <div className="lesson-modal">
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{lesson.name}</h3>
          <p className="lesson-type-badge">{lesson.type}</p>
        </div>

        {isInteractive ? renderInteractiveContent() : renderSimpleContent()}

        {}
        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LessonModal;