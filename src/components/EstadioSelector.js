import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importar useNavigate

const ZONAS = {
  Sur: { precio: 117717, color: "#EF5350" },
  Norte: { precio: 222046, color: "#42A5F5" },
  Oriental: { precio: 373660, color: "#66BB6A" },
  Occidental: { precio: 149585, color: "#FFD54F" },
};

export default function EstadioSelector({ isAuthenticated }) {
  const [zonaSeleccionada, setZonaSeleccionada] = useState("Sur");
  const [cantidadBoletos, setCantidadBoletos] = useState(1);
  const navigate = useNavigate(); // <-- Usar navigate

  const handleSeleccionZona = (zona) => {
    setZonaSeleccionada(zona);
  };

  const handleCantidadChange = (e) => {
    setCantidadBoletos(parseInt(e.target.value, 10));
  };

  const total = ZONAS[zonaSeleccionada].precio * cantidadBoletos;

  const irACompra = () => {
    if (!isAuthenticated) {
      alert("Por favor, inicia sesión para continuar con la compra");
      navigate("/login");
      return;
    }

    navigate("/compra", {
      state: {
        zona: zonaSeleccionada,
        cantidad: cantidadBoletos,
        total: total,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center p-8 bg-[#f8f9fa] min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Selecciona tu localidad</h2>

      {/* SVG del estadio */}
      <svg viewBox="0 0 400 400" width="320" height="320" className="mb-8">
        <circle cx="200" cy="200" r="190" fill="#e0e0e0" />
        <circle cx="200" cy="200" r="100" fill="#4caf50" />

        {/* Sur */}
        <path
          d="M80,310 A150,150 0 0,0 320,310 L270,250 A100,100 0 0,1 130,250 Z"
          fill={ZONAS.Sur.color}
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => handleSeleccionZona("Sur")}
        />

        {/* Norte */}
        <path
          d="M80,90 A150,150 0 0,1 320,90 L270,150 A100,100 0 0,0 130,150 Z"
          fill={ZONAS.Norte.color}
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => handleSeleccionZona("Norte")}
        />

        {/* Oriental */}
        <path
          d="M320,90 A150,150 0 0,1 320,310 L270,250 A100,100 0 0,0 270,150 Z"
          fill={ZONAS.Oriental.color}
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => handleSeleccionZona("Oriental")}
        />

        {/* Occidental */}
        <path
          d="M80,90 A150,150 0 0,0 80,310 L130,250 A100,100 0 0,1 130,150 Z"
          fill={ZONAS.Occidental.color}
          className="cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => handleSeleccionZona("Occidental")}
        />
      </svg>

      {/* Cuadro de selección */}
      <div className="w-[320px] bg-white border border-gray-300 shadow-lg rounded-lg p-5 text-left">
        <h3 className="text-lg font-bold mb-2">
          Zona seleccionada: {zonaSeleccionada}
        </h3>

        <p className="mb-2">
          Precio por boleto:{" "}
          <span className="font-medium text-gray-700">
            ${ZONAS[zonaSeleccionada].precio.toLocaleString("es-CO")}
          </span>
        </p>

        <div className="mb-4">
          <label className="text-gray-700 font-medium mr-2">
            Cantidad de boletos:
          </label>
          <select
            value={cantidadBoletos}
            onChange={handleCantidadChange}
            className="p-1 border border-gray-300 rounded"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <p className="font-semibold text-xl mb-4">
          Total: ${total.toLocaleString("es-CO")}
        </p>

        <button
          onClick={irACompra}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Comprar ahora
        </button>
      </div>
    </div>
    </>
  );
}
