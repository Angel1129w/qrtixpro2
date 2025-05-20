import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  return (
    <div>
      <Slider />
      <CategoryList />
      <EventList />
    </div>
  );
}

function Slider() {
  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay>
      <div>
        <img src="img/festival.png" alt="Evento 1" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
        <p className="legend">Festival de Música</p>
      </div>
      <div>
        <img src="img/bannern.png" alt="Evento 2" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
        <p className="legend">Partido de Fútbol</p>
      </div>
    </Carousel>
  );
}

function CategoryList() {
  const categories = ["Conciertos", "Teatro", "Deportes", "Festivales"];
  return (
    <div className="flex flex-col items-center gap-4 mt-10 mb-6">
      {categories.map((category, index) => (
        <button key={index} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 w-40 text-center">
          {category}
        </button>
      ))}
    </div>
  );
}

function EventList() {
  const events = [
    { id: 1, name: "Conciertos", type: "concierto", img: "/img/anuel.jpg", style: { width: "100%", height: "400px", objectFit: "cover" } },
    { id: 2, name: "Partidos de Baloncesto", type: "deporte", img: "/img/lakers.jpg", style: { width: "100%", height: "500px", objectFit: "cover" } },
    { id: 3, name: "Final de Fútbol", type: "futbol", img: "/img/banner.jpg", style: { width: "100%", height: "400px", objectFit: "cover" } },
    { id: 4, name: "Teatro", type: "teatro", img: "/img/bannert.avif", style: { width: "100%", height: "400px", objectFit: "cover" } }
  ];

  const navigate = useNavigate();

  const handleComprarEntradas = (event) => {
    if (event.type === "futbol") {
      navigate(`/estadio/${event.id}`);
    } else {
      navigate('/evento');
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden flex flex-col">
          <h3 className="text-xl font-bold text-center mt-4">{event.name}</h3>
          <img
            src={event.img}
            alt={event.name}
            style={event.style}
            className="my-2"
          />
          <div className="text-center mb-4">
            <button 
              onClick={() => handleComprarEntradas(event)} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Comprar entradas
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
