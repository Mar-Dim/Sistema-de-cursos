
import { Link } from 'react-router-dom';
import '../css/login.css';
import LoginForm from '../components/LoginForm'; 
import mascotImage from '../assets/labubu.png';

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="mascot-corner">
        <img 
          src={mascotImage} 
          alt="Mascota de la aplicación" 
          className="mascot-img"
        />
      </div>

      <main>
        <div className="login-card">
          <header className="login-header">
            <h1 className="welcome-title">¡Hola de nuevo!</h1>
            <p className="welcome-subtitle">Continúa tu aventura de aprendizaje</p>
          </header>

          <LoginForm />
        </div>

        <div className="register-section">
          <p>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="register-link">
              Crear una gratis
            </Link>
          </p>
        </div>
     
      </main>
    </div>
    
  );
}