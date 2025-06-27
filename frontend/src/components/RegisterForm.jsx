// src/components/RegisterForm.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react'; // Importamos el icono de usuario
import { register } from '../services/authService';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register(username, email, password);
      // Opcional: podrías mostrar un mensaje de éxito antes de redirigir
      navigate('/login');
    } catch (err) {
      // Un error más específico sería ideal (ej. "El email ya está en uso")
      setError('No se pudo crear la cuenta. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p className="error-message">{error}</p>}
      
      {/* Campo de Nombre de Usuario */}
      <div className="input-group">
        <label htmlFor="username" className="sr-only">Nombre de usuario</label>
        <User className="input-icon" />
        <input
          id="username"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          required
          disabled={isLoading}
        />
      </div>

      {/* Campo de Email */}
      <div className="input-group">
        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <Mail className="input-icon" />
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          required
          disabled={isLoading}
        />
      </div>

      {/* Campo de Contraseña (sin el ojo para simplificar, puedes agregarlo si quieres) */}
      <div className="input-group">
        <label htmlFor="password" className="sr-only">Contraseña</label>
        <Lock className="input-icon" />
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={isLoading}
      >
        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  );
}