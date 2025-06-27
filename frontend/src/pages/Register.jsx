import { Link } from 'react-router-dom';
import '../css/login.css'; // Reutilizamos los mismos estilos
import RegisterForm from '../components/RegisterForm'; 
import mascotImage from '../assets/labubu.png'; // Importamos la imagen de la mascota

export default function RegisterPage() {
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
        {/* Usamos la misma clase de tarjeta para mantener el estilo */}
        <div className="login-card">
          <header className="login-header">
            <h1 className="welcome-title">Crea tu cuenta</h1>
            <p className="welcome-subtitle">¡Únete y comienza tu aventura de aprendizaje!</p>
          </header>

          <RegisterForm />
        </div>

        {/* Enlace para volver al login */}
        <div className="register-section">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="register-link">
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}