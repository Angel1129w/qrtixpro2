import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from '@react-pdf/renderer';
import EntradaPDF from './EntradaPDF';

export default function Compra() {
  const location = useLocation();
  const navigate = useNavigate();
  const { zona, cantidad, total } = location.state || {};

  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    direccion: '',
    correo: '',
    ventaRealizada: false,
    datosVenta: null
  });

  const [errores, setErrores] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    direccion: '',
    correo: ''
  });

  const [mensajeError, setMensajeError] = useState('');
  const [alertaVisible, setAlertaVisible] = useState(false);

  useEffect(() => {
    if (mensajeError) {
      setAlertaVisible(true);
      const timer = setTimeout(() => {
        setAlertaVisible(false);
        setTimeout(() => {
          setMensajeError('');
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensajeError]);

  const validarNombre = (valor) => {
    if (!valor.trim()) {
      return "El nombre es obligatorio";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
      return "El nombre solo debe contener letras";
    } else if (valor.length < 2) {
      return "El nombre debe tener al menos 2 caracteres";
    }
    return "";
  };

  const validarCedula = (valor) => {
    if (!valor.trim()) {
      return "La cédula es obligatoria";
    } else if (!/^\d+$/.test(valor)) {
      return "La cédula solo debe contener números";
    } else if (valor.length < 5 || valor.length > 12) {
      return "La cédula debe tener entre 5 y 12 dígitos";
    }
    return "";
  };

  const validarTelefono = (valor) => {
    if (!valor.trim()) {
      return "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(valor)) {
      return "El teléfono solo debe contener números";
    } else if (valor.length < 7 || valor.length > 15) {
      return "El teléfono debe tener entre 7 y 15 dígitos";
    }
    return "";
  };

  const validarDireccion = (valor) => {
    if (!valor.trim()) {
      return "La dirección es obligatoria";
    } else if (valor.length < 5) {
      return "La dirección debe tener al menos 5 caracteres";
    }
    return "";
  };

  const validarCorreo = (valor) => {
    if (!valor.trim()) {
      return "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      return "Ingrese un correo electrónico válido";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar el campo según su tipo
    let error = '';
    switch (name) {
      case 'nombre':
        error = validarNombre(value);
        break;
      case 'cedula':
        error = validarCedula(value);
        break;
      case 'telefono':
        error = validarTelefono(value);
        break;
      case 'direccion':
        error = validarDireccion(value);
        break;
      case 'correo':
        error = validarCorreo(value);
        break;
      default:
        break;
    }

    setErrores(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg relative">
        {alertaVisible && mensajeError && (
          <div className="absolute top-0 left-0 right-0 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 animate-fade-in-down">
            {mensajeError}
          </div>
        )}
        <h2 className="text-3xl font-semibold text-center mb-6">Compra tu entrada</h2>

        {zona && (
          <div className="mb-6">
            <p className="text-lg">
              <strong>Zona:</strong> {zona}
            </p>
            <p className="text-lg">
              <strong>Cantidad de entradas:</strong> {cantidad}
            </p>
            <p className="text-lg font-bold">
              <strong>Total a pagar:</strong> ${total.toLocaleString("es-CO")}
            </p>
          </div>
        )}

        <form onSubmit={async (e) => {
          e.preventDefault();

          // Validar todos los campos antes de enviar
          const erroresValidacion = {
            nombre: validarNombre(formData.nombre),
            cedula: validarCedula(formData.cedula),
            telefono: validarTelefono(formData.telefono),
            direccion: validarDireccion(formData.direccion),
            correo: validarCorreo(formData.correo)
          };

          setErrores(erroresValidacion);

          // Verificar si hay errores
          if (Object.values(erroresValidacion).some(error => error !== '')) {
            setMensajeError('Por favor, corrija los errores en el formulario');
            return;
          }

          try {
            const ventaData = {
              ...formData,
              zona,
              cantidad,
              total,
              fecha: new Date(),
              estado: 'pendiente'
            };

            const response = await fetch('http://localhost:8080/ventas', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(ventaData)
            });

            if (response.ok) {
              const responseData = await response.json();
              const ventaData = {
                ...responseData,
                nombre: formData.nombre,
                cedula: formData.cedula,
                telefono: formData.telefono,
                direccion: formData.direccion,
                correo: formData.correo,
                zona: zona,
                cantidad: cantidad,
                total: total,
                fecha: new Date().toISOString()
              };
              setFormData(prev => ({ ...prev, ventaRealizada: true, datosVenta: ventaData }));
            } else {
              const error = await response.json();
              throw new Error(error.message || 'Error al procesar la compra');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Error al procesar la compra. Por favor, intente nuevamente.');
          }
        }}>
          <div className="mb-4">
            <label className="block text-lg mb-2">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu nombre"
              required
            />
            {errores.nombre && (
              <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Cédula</label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg ${errores.cedula ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu número de cédula"
              required
            />
            {errores.cedula && (
              <p className="text-red-500 text-sm mt-1">{errores.cedula}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg ${errores.telefono ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu número de teléfono"
              required
            />
            {errores.telefono && (
              <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg ${errores.direccion ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu dirección"
              required
            />
            {errores.direccion && (
              <p className="text-red-500 text-sm mt-1">{errores.direccion}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-lg mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg ${errores.correo ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ingresa tu correo"
              required
            />
            {errores.correo && (
              <p className="text-red-500 text-sm mt-1">{errores.correo}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Finalizar compra
          </button>
        </form>

        {formData.ventaRealizada && formData.datosVenta && (
          <div className="mt-6 text-center">
            <div className="mb-4 text-green-600 font-bold text-lg">
              ¡Compra realizada con éxito!
            </div>
            <PDFDownloadLink
              document={<EntradaPDF ventaData={formData.datosVenta} />}
              fileName={`entradas-${formData.datosVenta.cedula}.pdf`}
              className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Generando PDF...' : 'Descargar Entradas'
              }
            </PDFDownloadLink>
            <button
              onClick={() => navigate('/')}
              className="block w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
