import React, { useState, useEffect} from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import LessonModal from '../components/LessonModal';
import Sidebar from '../components/Sidebar';
import { getProfile } from '../services/authService';
const lessons = [
  { id: 1, name: 'Introducción', unlocked: true, content: 'Contenido de la lección 1' },
  { id: 2, name: 'Conceptos Básicos', unlocked: true, content: 'Contenido de la lección 2' },
  { id: 3, name: 'Ejercicios', unlocked: false, content: 'Contenido de la lección 3' },
  { id: 4, name: 'Evaluación', unlocked: false, content: 'Contenido de la lección 4' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [modalLesson, setModalLesson] = useState(null);
  const [username, setUsername] = useState('US');
    useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('TOKEN:', token); // ✅ para confirmar si hay token

  if (token) {
    getProfile(token)
      .then(res => {
        console.log('RESPUESTA DEL PERFIL:', res.data); // ✅ revisa qué devuelve

        if (res.data && res.data.username) {
          setUsername(res.data.username);
        } else {
          console.warn('No se encontró el username en la respuesta');
        }
      })
      .catch(err => {
        console.error('Error al obtener perfil:', err);
        // Opcional: redirigir al login si el token ya no es válido
        // navigate('/');
      });
  } else {
    console.warn('No hay token en localStorage');
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleLessonClick = (lesson) => {
    if (lesson.unlocked) {
      setModalLesson(lesson);
    }
  };

  const closeModal = () => {
    setModalLesson(null);
  };

  return (
    <div className="home-container">
      <Sidebar 
        username={username} 
        onLogout={handleLogout} 
      />

      <div className="tree-vertical">
        <h2 className="tree-title">Tu camino de aprendizaje</h2>
        <div className="lesson-path">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="lesson-wrapper">
              <button
                className={`lesson-node ${lesson.unlocked ? '' : 'locked'}`}
                onClick={() => handleLessonClick(lesson)}
                disabled={!lesson.unlocked}
              >
                {lesson.name}
              </button>
              {index < lessons.length - 1 && <div className="vertical-connector" />}
            </div>
          ))}
        </div>
      </div>

      <LessonModal 
        lesson={modalLesson} 
        onClose={closeModal} 
      />
    </div>
  );
}