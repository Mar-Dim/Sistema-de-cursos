import React, { useState, useEffect } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import LessonModal from '../components/LessonModal';
import Sidebar from '../components/Sidebar';
import { getProfile } from '../services/authService';

// --- NUEVA ESTRUCTURA DE DATOS ---
const courseData = {
  1: { id: 1, name: 'Introducción', type: 'LESSON', content: 'Bienvenido al curso...', unlocks: [2] },
  2: { id: 2, name: 'Conceptos Básicos', type: 'LESSON', content: 'Variables, tipos de datos...', unlocks: [3] },
  3: { id: 3, name: 'Ejercicios', type: 'QUIZ', content: 'Pon a prueba tus conocimientos...', requiredScore: 70, unlocks: [4, 6], unlocksOnFail: [5] },
  4: { id: 4, name: 'Caso de Estudio', type: 'CASE_STUDY', content: 'Analicemos un problema real...', unlocks: [] },
  5: { id: 5, name: 'Repaso de Conceptos', type: 'REMEDIATION', content: 'Reforcemos los conceptos...', unlocks: [3] },
  6: { id: 6, name: 'Evaluación Final', type: 'EVALUATION', content: 'Demuestra todo lo que has aprendido.', unlocks: [] }
};

const initialUserProgress = {
  1: { status: 'UNLOCKED', score: null },
  2: { status: 'LOCKED', score: null },
  3: { status: 'LOCKED', score: null },
  4: { status: 'LOCKED', score: null },
  5: { status: 'LOCKED', score: null },
  6: { status: 'LOCKED', score: null },
};


export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  
  // --- NUEVOS ESTADOS PARA EL ÁRBOL DE APRENDIZAJE ---
  const [userProgress, setUserProgress] = useState(initialUserProgress);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  // El useEffect para obtener el perfil de usuario se mantiene igual
  useEffect(() => {
    // ... tu código para getProfile ...
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLessonClick = (lessonId) => {
    if (userProgress[lessonId].status !== 'LOCKED') {
      setCurrentLessonId(lessonId);
    }
  };

  const closeModal = () => {
    setCurrentLessonId(null);
  };
  
  // --- LÓGICA CENTRAL PARA ACTUALIZAR EL PROGRESO ---
  const handleCompleteLesson = (lessonId, score = null) => {
    const lessonRules = courseData[lessonId];
    
    setUserProgress(prevProgress => {
      const newProgress = { ...prevProgress };

      // 1. Actualizar la lección actual
      if (lessonRules.type === 'QUIZ') {
        const passed = score >= lessonRules.requiredScore;
        newProgress[lessonId] = { status: passed ? 'COMPLETED' : 'FAILED', score };
        
        // 2. Desbloquear las siguientes lecciones según el resultado
        const lessonsToUnlock = passed ? lessonRules.unlocks : lessonRules.unlocksOnFail;
        lessonsToUnlock.forEach(id => {
          // Solo desbloquear si estaba bloqueada, para no sobreescribir otros estados
          if (newProgress[id].status === 'LOCKED') {
            newProgress[id].status = 'UNLOCKED';
          }
        });

      } else {
        // Para lecciones normales, de repaso, etc.
        newProgress[lessonId] = { status: 'COMPLETED', score: null };
        
        // 2. Desbloquear las siguientes lecciones
        lessonRules.unlocks.forEach(id => {
           // Si desbloquea un QUIZ, lo resetea a UNLOCKED para poder reintentarlo
           if (newProgress[id].status === 'FAILED' || newProgress[id].status === 'LOCKED') {
             newProgress[id] = { status: 'UNLOCKED', score: null };
           }
        });
      }
      
      return newProgress;
    });

    closeModal();
  };

  // Obtiene el objeto completo para el modal
  const modalLessonData = currentLessonId ? courseData[currentLessonId] : null;

  return (
    <div className="home-container">
      <Sidebar username={username} onLogout={handleLogout} />

      <div className="tree-vertical">
        <h2 className="tree-title">Tu camino de aprendizaje</h2>
        <div className="lesson-path">
          {Object.values(courseData).map((lesson, index, arr) => (
            <div key={lesson.id} className="lesson-wrapper">
              <button
                className={`lesson-node ${userProgress[lesson.id].status.toLowerCase()}`}
                onClick={() => handleLessonClick(lesson.id)}
                disabled={userProgress[lesson.id].status === 'LOCKED'}
              >
                {lesson.name}
                {userProgress[lesson.id].score !== null && 
                  <span className="lesson-score">{userProgress[lesson.id].score}%</span>}
              </button>
              {index < arr.length - 1 && <div className="vertical-connector" />}
            </div>
          ))}
        </div>
      </div>

      {modalLessonData && (
        <LessonModal 
          lesson={modalLessonData}
          onClose={closeModal}
          onComplete={handleCompleteLesson}
        />
      )}
    </div>
  );
}