import { Link } from "react-router-dom";

export default function Evento() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-black text-white py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <div>
            <h1 className="text-3xl font-semibold">Once Caldas vs Corinthians</h1>
            <p className="text-lg">Copa Sudamericana 2025</p>
          </div>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Volver a la página principal
          </Link>
        </div>
      </header>

      {/* Banner principal */}
      <section className="relative">
      <img 
  src="/img/once1.jpg" 
  alt="Once Caldas vs Corinthians" 
  className="w-full h-[500px] object-cover" 
  style={{ width: "100%", height: "550px", objectFit: "cover" }} 
/>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h2 className="text-white text-3xl font-bold">Once Caldas vs Corinthians</h2>
        </div>
      </section>

      {/* Detalles del evento */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">Detalles del Evento</h3>
          <p className="text-lg mb-4">
            Vive la emoción de la Copa Sudamericana 2025. Disfruta de este increíble encuentro entre Once Caldas y su rival en un estadio lleno de historia y pasión.
          </p>
          <ul className="list-disc pl-5 text-lg mb-6">
            <li>Fecha: 15 de Agosto de 2025</li>
            <li>Hora: 8:00 PM</li>
            <li>Lugar: Estadio Palogrande, Manizales</li>
          </ul>
        </div>
      </section>

      {/* Opciones de boletos */}
      <section className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">Precios de Boletos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold mb-2">General</h4>
              <p className="text-lg mb-4">$50,000</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
            <div className="border rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold mb-2">VIP</h4>
              <p className="text-lg mb-4">$100,000</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
            <div className="border rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold mb-2">Platino</h4>
              <p className="text-lg mb-4">$150,000</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ingreso a los boletos */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-2xl font-semibold mb-4">¡Compra tu entrada ahora!</h3>
          <p className="text-lg mb-6">
            Compra tu entrada y no te pierdas este gran evento. ¡Asegura tu lugar en el estadio ahora mismo!
          </p>
          <Link to="/compra" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Comprar Entradas
          </Link>
        </div>
      </section>
    </div>
  );
}
