import React from 'react';
import '../css/lessonModal.css'; // Asegúrate de tener este archivo CSS para estilos

const LessonModal = ({ lesson, onClose }) => {
  if (!lesson) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="lesson-modal">
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="modal-content">
        <h3>{lesson.name}</h3>
        <p>{lesson.content}</p>
        <button className="close-modal" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LessonModal;