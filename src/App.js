import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import UpdateUser from "./components/UpdateUser";
import Loginr from "./components/Loginr";
import "./styles/custom.css";
import Evento from './components/Evento';
import Compra from './components/Compra';
import Home from './components/Home';
import Navbar from './components/Navbar';
import EstadioSelector from './components/EstadioSelector';
 // <- Importación nueva


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="font-sans">
        {loading && (
          <div id="loader" className="loader-container">
            <img src="img/logo1.png" alt="Logo" className="logo-loading" />
          </div>
        )}

        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/evento" element={<Evento />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/login" element={<Loginr setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/actualizar-usuario" element={<UpdateUser />} />
          <Route path="/estadio/:id" element={<EstadioSelector isAuthenticated={isAuthenticated} />} />
        </Routes>
        <Footer />
      
      </div>
    </Router>
  );
}

function Registro() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <Register />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-8">
      <p>&copy; 2025 QRTIXPRO - Todos los derechos reservados.</p>
    </footer>
  );
}

export default App;
