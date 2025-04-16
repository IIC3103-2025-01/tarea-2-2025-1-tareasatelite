// src/components/SatellitesTable.jsx
import React, { useState, useMemo } from "react";

const SatellitesTable = ({ satellites }) => {
  const [countryFilter, setCountryFilter] = useState("");
  const [missionFilter, setMissionFilter] = useState("");

  // Extraer listas únicas para el filtro de países y misiones
  const uniqueCountries = useMemo(() => {
    const countries = satellites
      .map((sat) => sat.organization?.country?.name || "")
      .filter((name) => name !== "");
    return Array.from(new Set(countries));
  }, [satellites]);

  const uniqueMissions = useMemo(() => {
    const missions = satellites
      .map((sat) => sat.mission)
      .filter((m) => m);
    return Array.from(new Set(missions));
  }, [satellites]);

  // Filtrar satélites según el país y la misión, y ordenar por altitud de forma descendente
  const filteredSatellites = useMemo(() => {
    let result = satellites;
    if (countryFilter) {
      result = result.filter(
        (sat) =>
          (sat.organization?.country?.name || "")
            .toLowerCase() === countryFilter.toLowerCase()
      );
    }
    if (missionFilter) {
      result = result.filter(
        (sat) =>
          sat.mission &&
          sat.mission.toLowerCase() === missionFilter.toLowerCase()
      );
    }
    result = result.sort((a, b) => (b.altitude || 0) - (a.altitude || 0));
    return result;
  }, [satellites, countryFilter, missionFilter]);

  return (
    <div>
      <h2>Tablero de Satélites</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filtrar por País: </label>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="">Todos</option>
          {uniqueCountries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "1rem" }}>Filtrar por Misión: </label>
        <select
          value={missionFilter}
          onChange={(e) => setMissionFilter(e.target.value)}
        >
          <option value="">Todas</option>
          {uniqueMissions.map((mission, index) => (
            <option key={index} value={mission}>
              {mission}
            </option>
          ))}
        </select>
      </div>

      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Bandera</th>
            <th>Misión</th>
            <th>Nombre Satélite</th>
            <th>Fecha Lanzamiento</th>
            <th>Tipo</th>
            <th>Potencia</th>
            <th>Vida Útil</th>
          </tr>
        </thead>
        <tbody>
          {filteredSatellites.map((sat) => (
            <tr key={sat.satellite_id}>
              <td>{sat.satellite_id}</td>
              <td>
                {sat.organization && sat.organization.country && (
                  <img
                    src={`https://flagcdn.com/24x18/${sat.organization.country.country_code.toLowerCase()}.png`}
                    alt={sat.organization.country.name}
                    title={sat.organization.country.name}
                  />
                )}
              </td>
              <td>{sat.mission}</td>
              <td>{sat.name}</td>
              <td>{sat.launch_date}</td>
              <td>{sat.type}</td>
              <td>{sat.power}</td>
              <td>{sat.lifespan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SatellitesTable;
