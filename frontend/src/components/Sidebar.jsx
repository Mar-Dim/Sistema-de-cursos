import React from 'react';
import '../css/sidebar.css'; // Asegúrate de tener este archivo CSS para estilos

const Sidebar = ({ username, onLogout }) => {
  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="user-avatar">
          {username.slice(0, 2).toUpperCase()}
        </div>
        <div className="username">{username}</div>
      </div>
      <div className="stats">
        <p>Progreso: 50%</p>
        <p>Lecciones completadas: 2/4</p>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;