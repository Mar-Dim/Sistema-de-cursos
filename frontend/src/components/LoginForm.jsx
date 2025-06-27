import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { login } from '../services/authService'; // Tu servicio de API

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Nuevos estados para una mejor UX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    setIsLoading(true);
    setError(''); // Limpiar errores previos

    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.data.access_token);
      navigate('/home');
    } catch (err) {
      // Proporciona un mensaje de error más útil
      setError('El correo o la contraseña son incorrectos.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p className="error-message">{error}</p>}
      
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

      <div className="input-group">
        <label htmlFor="password" className="sr-only">Contraseña</label>
        <Lock className="input-icon" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          disabled={isLoading}
        >
          {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
        </button>
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={isLoading}
      >
        {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}