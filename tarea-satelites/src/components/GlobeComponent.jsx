// src/components/GlobeComponent.jsx
import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";

const GlobeComponent = ({ satellites }) => {
  const globeEl = useRef();

  useEffect(() => {
    const globeInstance = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointOfView({ lat: 0, lng: 0, altitude: 2 });

    // Actualiza los puntos de satélite cada vez que cambia el estado:
    if (satellites && satellites.length > 0) {
      // Mapea cada satélite a un objeto con latitud y longitud. 
      // Asegúrate de que tus datos tengan estas propiedades (puedes necesitar adaptarlas)
      const points = satellites.map((sat) => ({
        lat: sat.position ? sat.position.lat : 0,
        lng: sat.position ? sat.position.long : 0,
        size: 0.5, // Puedes ajustar el tamaño, o asignar un tamaño basado en la potencia, por ejemplo
        color: "red", // Puedes usar distintos colores según el tipo o estado del satélite
      }));
      
      // Usa Globe.js para agregar los puntos en el globo
      globeInstance.pointsData(points)
        .pointAltitude('size')
        .pointColor('color');
    }
  }, [satellites]);

  return (
    <div ref={globeEl} style={{ width: "100%", height: "600px", marginBottom: "2rem" }} />
  );
};

export default GlobeComponent;
