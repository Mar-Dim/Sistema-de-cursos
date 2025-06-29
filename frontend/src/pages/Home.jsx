import React, { useState, useEffect, useMemo } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import LessonModal from '../components/LessonModal';
import Sidebar from '../components/Sidebar';
import { getProfile } from '../services/authService';

// --- ESTRUCTURA DE DATOS DEL CURSO (Estática) ---
const courseData = {
  1: { 
    id: 1, name: 'Introducción', type: 'LESSON', 
    content: 'Bienvenido al curso. Aquí aprenderás los fundamentos de la programación con JavaScript. ¡Vamos a empezar!', 
    unlocks: [2]
  },
  2: { 
    id: 2, name: 'Conceptos Básicos', type: 'LESSON', 
    content: 'Una variable es un contenedor para un valor. En JavaScript, se declaran con `let`, `const` o `var`. `const` es para valores que no cambiarán, mientras que `let` es para valores que sí pueden cambiar.', 
    unlocks: [3]
  },
  3: { 
    id: 3, name: 'Ejercicios', type: 'QUIZ', 
    requiredScore: 70,
    unlocks: [4, 6],
    unlocksOnFail: [5],
    questions: [
      { type: 'MCQ', text: '¿Cuál es la palabra clave para declarar una variable que no se puede reasignar?', options: ['let', 'var', 'const', 'static'], correctAnswer: 2 },
      { type: 'FILL_IN_BLANK', text: 'Escribe el operador para comprobar si dos valores son iguales en valor Y tipo: `5 ___ 5`', correctAnswer: '===' },
      { type: 'MCQ', text: '¿Qué mostrará `console.log(typeof "Hello")`?', options: ['string', 'text', 'String', 'object'], correctAnswer: 0 }
    ]
  },
  4: { 
    id: 4, name: 'Caso de Estudio', type: 'CASE_STUDY', 
    content: 'Analicemos una función real para sumar dos números: `function sumar(a, b) { return a + b; }`.', 
    unlocks: [] 
  },
  5: { 
    id: 5, name: 'Repaso de Conceptos', type: 'REMEDIATION', 
    content: 'Recuerda: `const` previene la reasignación. El operador de igualdad estricta es `===`, que comprueba valor y tipo. El tipo de dato de un texto es `"string"`.', 
    unlocks: [3]
  },
  6: { 
    id: 6, name: 'Evaluación Final', type: 'EVALUATION',
    requiredScore: 80,
    unlocks: [],
    questions: [
        // Puedes añadir más preguntas para la evaluación final aquí
    ]
  }
};

// --- ESTADO INICIAL DEL PROGRESO DEL USUARIO ---
const initialUserProgress = {
  1: { status: 'UNLOCKED', score: null },
  2: { status: 'LOCKED', score: null },
  3: { status: 'LOCKED', score: null },
  4: { status: 'LOCKED', score: null },
  5: { status: 'LOCKED', score: null },
  6: { status: 'LOCKED', score: null },
};


export default function HomePage() {
  // 1. ---- HOOKS Y ESTADOS ----
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userProgress, setUserProgress] = useState(initialUserProgress);
  const [currentLessonId, setCurrentLessonId] = useState(null);

  // 2. ---- EFECTOS (useEffect) ----
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token)
        .then(res => {
          if (res.data && res.data.username) {
            setUsername(res.data.username);
          } else {
            console.warn('No se encontró el username en la respuesta');
          }
        })
        .catch(err => {
          console.error('Error al obtener perfil:', err);
        });
    } else {
      console.warn('No hay token en localStorage');
    }
  }, []);

  // 3. ---- CÁLCULOS MEMORIZADOS (useMemo) ----
  const stats = useMemo(() => {
    const completableLessons = Object.values(courseData).filter(
      lesson => lesson.type !== 'REMEDIATION'
    );
    const totalLessons = completableLessons.length;
    const completedCount = completableLessons.filter(
      lesson => userProgress[lesson.id]?.status === 'COMPLETED'
    ).length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return {
      total: totalLessons,
      completed: completedCount,
      percentage: progressPercentage,
    };
  }, [userProgress]);

  // 4. ---- FUNCIONES MANEJADORAS (handlers) ----
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

  const handleCompleteLesson = (lessonId, score = null) => {
    const lessonRules = courseData[lessonId];
    
    setUserProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      if (lessonRules.type === 'QUIZ' || lessonRules.type === 'EVALUATION') {
        const passed = score >= lessonRules.requiredScore;
        newProgress[lessonId] = { status: passed ? 'COMPLETED' : 'FAILED', score };
        
        const lessonsToUnlock = passed ? lessonRules.unlocks : (lessonRules.unlocksOnFail || []);
        lessonsToUnlock.forEach(id => {
          if (newProgress[id].status === 'LOCKED') {
            newProgress[id].status = 'UNLOCKED';
          }
        });
      } else {
        newProgress[lessonId] = { status: 'COMPLETED', score: null };
        
        lessonRules.unlocks.forEach(id => {
           if (newProgress[id].status === 'FAILED' || newProgress[id].status === 'LOCKED') {
             newProgress[id] = { status: 'UNLOCKED', score: null };
           }
        });
      }
      return newProgress;
    });

    closeModal();
  };

  // 5. ---- PREPARACIÓN DE DATOS PARA EL RENDER ----
  const modalLessonData = currentLessonId ? courseData[currentLessonId] : null;

  // 6. ---- RENDERIZADO DEL COMPONENTE (return) ----
  return (
    <div className="home-container">
      <Sidebar 
        username={username} 
        onLogout={handleLogout}
        stats={stats} 
      />

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
              {/* Renderiza el conector solo si no es el último elemento */}
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