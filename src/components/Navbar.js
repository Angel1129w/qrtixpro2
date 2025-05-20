import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldShowNavButtons = () => {
    return !["/login", "/registro"].includes(location.pathname);
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="logo-title">QRTIXPRO</h1>
      <div className="flex gap-4">
        {shouldShowNavButtons() && (
          !isAuthenticated ? (
            <>
              <Link to="/" className="nav-button">Inicio</Link>
              <Link to="/registro" className="nav-button">Registrar</Link>
              <Link to="/login" className="nav-button">Iniciar Sesión</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-button">Inicio</Link>
              <Link to="/actualizar-usuario" className="nav-button">Actualizar Usuario</Link>
              <button onClick={cerrarSesion} className="nav-button">Cerrar Sesión</button>
            </>
          )
        )}
      </div>
    </nav>
  );
}