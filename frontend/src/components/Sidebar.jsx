import React from 'react';
import '../css/sidebar.css';

const Sidebar = ({ username, onLogout, stats }) => {
  // Proporcionamos valores por defecto en caso de que la prop 'stats' no llegue
  const progressPercentage = stats?.percentage || 0;
  const completedLessons = stats?.completed || 0;
  const totalLessons = stats?.total || 0;

  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="user-avatar">
          {/* Si no hay username, muestra '??' para evitar errores */}
          {username ? username.slice(0, 2).toUpperCase() : '??'}
        </div>
        <div className="username">{username || 'Cargando...'}</div>
      </div>

      <div className="stats">
        {/* --- DATOS DINÁMICOS --- */}
        <p>Progreso: {progressPercentage}%</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p>Lecciones completadas: {completedLessons} / {totalLessons}</p>
      </div>

      <button className="logout-button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;