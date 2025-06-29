import React from 'react';
import '../css/lessonModal.css';

const LessonModal = ({ lesson, onClose, onComplete }) => {
  if (!lesson) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderActions = () => {
    // Si la lección es un QUIZ, mostramos botones de simulación
    if (lesson.type === 'QUIZ') {
      return (
        <div className="quiz-actions">
          <p>Simula el resultado de tu examen:</p>
          <button 
            className="quiz-button pass"
            onClick={() => onComplete(lesson.id, 85)} // Simula Aprobado
          >
            Aprobar (85%)
          </button>
          <button 
            className="quiz-button fail"
            onClick={() => onComplete(lesson.id, 50)} // Simula Fallo
          >
            Fallar (50%)
          </button>
        </div>
      );
    }

    // Para cualquier otro tipo de lección
    return (
      <button className="complete-button" onClick={() => onComplete(lesson.id)}>
        Marcar como completada
      </button>
    );
  };

  return (
    <div className="lesson-modal">
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="modal-content">
        <h3>{lesson.name}</h3>
        <p className="lesson-type-badge">{lesson.type}</p>
        <p>{lesson.content}</p>
        
        <div className="modal-actions">
          {renderActions()}
        </div>

        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LessonModal;