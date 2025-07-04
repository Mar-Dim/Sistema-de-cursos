import React, { useState, useEffect, useMemo, useCallback } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import LessonModal from '../components/LessonModal';
import Sidebar from '../components/Sidebar';
import { getProfile } from '../services/authService';
import { getLearningPath, submitProgress, getLessonDetails } from '../services/courseService';

// ========================================================================
// UMBRAL DE APROBACIÓN FIJO
// Todas las lecciones completadas con un score menor a este valor serán rojas.
const PASSING_SCORE = 75;
// ========================================================================

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [learningPath, setLearningPath] = useState([]);
  const [isLoadingPath, setIsLoadingPath] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const fetchLearningPath = useCallback(() => {
    getLearningPath()
      .then(res => {
        setLearningPath(res.data);
      })
      .catch(err => {
        console.error('Error al obtener la ruta de aprendizaje:', err);
        if (err.response?.status === 401) navigate('/');
      })
      .finally(() => {
        setIsLoadingPath(false);
      });
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getProfile(token).then(res => setUsername(res.data?.username || ''));
      fetchLearningPath();
    } else {
        navigate('/');
    }
  }, [navigate, fetchLearningPath]);

  // FUNCIÓN CLAVE PARA DETERMINAR EL COLOR (ROJO/VERDE)
  const getLessonStatusClass = (lws) => {
    const { status, score } = lws;

    if (status === 'completed') {
      // Comparamos el score del usuario con nuestro umbral fijo.
      // Nos aseguramos de que 'score' sea un número.
      if (typeof score === 'number') {
        return score >= PASSING_SCORE ? 'completed' : 'failed';
      }
      // Si no hay score, la marcamos como completada por defecto.
      return 'completed';
    }
    
    // Para cualquier otro estado ('locked', 'available', etc.), devolvemos el estado tal cual.
    return status;
  };
  
  // STATS - Actualizado para usar el umbral fijo
  const stats = useMemo(() => {
    if (!learningPath.length) return { total: 0, completed: 0, percentage: 0 };
    const completableLessons = learningPath.filter(lws => lws.lesson.type !== 'remediation');
    const totalLessons = completableLessons.length;
    
    const approvedCount = completableLessons.filter(lws => 
      lws.status === 'completed' && lws.score >= PASSING_SCORE
    ).length;

    const progressPercentage = totalLessons > 0 ? Math.round((approvedCount / totalLessons) * 100) : 0;
    return { total: totalLessons, completed: approvedCount, percentage: progressPercentage };
  }, [learningPath]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLessonClick = (lessonWithStatus) => {
    if (lessonWithStatus.status !== 'locked' && !isLoadingModal && !isSubmitting) {
      setIsLoadingModal(true);
      getLessonDetails(lessonWithStatus.lesson.id)
        .then(res => {
          setCurrentLesson(res.data);
        })
        .catch(err => {
          console.error(`Error al obtener detalles de la lección:`, err);
          alert('No se pudieron cargar los detalles de la lección.');
        })
        .finally(() => {
          setIsLoadingModal(false);
        });
    }
  };

  const closeModal = () => {
    if (!isLoadingModal) {
      setCurrentLesson(null);
    }
  };

  const handleCompleteLesson = (lessonId, answers) => {
    const payload = { lessonId, answers };
    
    setIsSubmitting(true);
    setCurrentLesson(null); 

    submitProgress(payload)
      .then(() => {
        fetchLearningPath();
      })
      .catch(err => {
        console.error('Error al guardar el progreso:', err);
        alert('Hubo un error al guardar tu progreso. Inténtalo de nuevo.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoadingPath) {
    return <div className="loading-fullscreen">Cargando tu ruta de aprendizaje...</div>;
  }
  
  return (
    <div className={`home-container ${isSubmitting ? 'submitting-progress' : ''}`}>
      {isSubmitting && <div className="loading-overlay"><span>Actualizando...</span></div>}
      
      <Sidebar username={username} onLogout={handleLogout} stats={stats} />

      <div className="tree-vertical">
        <h2 className="tree-title">Tu camino de aprendizaje</h2>
        <div className="lesson-path">
          {learningPath.map((lws, index, arr) => (
            <div key={lws.lesson.id} className="lesson-wrapper">
              <button
                className={`lesson-node ${getLessonStatusClass(lws)}`}
                onClick={() => handleLessonClick(lws)}
                disabled={lws.status === 'locked' || isSubmitting || isLoadingModal}
              >
                {lws.lesson.title}
                {/* Mostramos el score solo si la lección está completada */}
                {lws.status === 'completed' && typeof lws.score === 'number' &&
                  <span className="lesson-score">{lws.score}%</span>}
              </button>
              {index < arr.length - 1 && <div className="vertical-connector" />}
            </div>
          ))}
        </div>
      </div>

      {currentLesson && (
        <LessonModal 
          lesson={currentLesson}
          onClose={closeModal}
          onComplete={handleCompleteLesson}
        />
      )}
    </div>
  );
}