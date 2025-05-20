import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        onClick={toggleMenu} 
        className="flex items-center space-x-2 text-white focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <span>Mi Cuenta</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <div className={`user-menu-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="py-1">
          <Link to="/perfil" className="user-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Mi Perfil
          </Link>
          <Link to="/mis-tickets" className="user-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
            </svg>
            Mis Tickets
          </Link>
          <Link to="/actualizar-usuario" className="user-menu-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Actualizar Datos
          </Link>
        </div>
        <div className="py-1">
          <button onClick={onLogout} className="user-menu-item text-red-600 hover:text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V8z" clipRule="evenodd" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;