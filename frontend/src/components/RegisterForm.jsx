import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { register } from '../services/authService';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // <-- Nuevo estado para mensaje de éxito
  
  const navigate = useNavigate();

  // Un solo manejador para todos los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Pasamos el objeto formData directamente, que coincide con lo que espera el backend
      await register(formData);
      
      // Mostramos un mensaje de éxito
      setSuccess('¡Cuenta creada con éxito! Redirigiendo al login...');
      
      // Esperamos 2 segundos y luego redirigimos
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      // Manejo de errores más específico, común en NestJS
      if (err.response && err.response.data && err.response.data.message) {
        // NestJS a menudo envía errores en err.response.data.message
        const errorMessage = err.response.data.message;
        setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      } else {
        setError('No se pudo crear la cuenta. Revisa tu conexión.');
      }
      setIsLoading(false);
    }
  };

  return (
    // Deshabilitamos el formulario entero si hay un éxito para evitar doble envío
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>} {/* Mensaje de éxito */}
      
      <div className="input-group">
        <label htmlFor="username" className="sr-only">Nombre de usuario</label>
        <User className="input-icon" />
        <input
          id="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
          required
          disabled={isLoading || success}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <Mail className="input-icon" />
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
          disabled={isLoading || success}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password" className="sr-only">Contraseña</label>
        <Lock className="input-icon" />
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          required
          disabled={isLoading || success}
        />
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={isLoading || success}
      >
        {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  );
}