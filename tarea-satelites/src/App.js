// src/App.js
import React, { useState, useEffect } from "react";
import GlobeComponent from "./components/GlobeComponent";
import ChatComponent from "./components/ChatComponent";
import SatellitesTable from "./components/SatellitesTable";
import WebSocketService from "./services/websocketService";

function App() {
  const [satellites, setSatellites] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    WebSocketService.connect();

    const handleMessage = (data) => {
      switch (data.type) {
        case "SATELLITES":
          if (Array.isArray(data.satellites)) {
            setSatellites(data.satellites);
          }
          break;
        case "COMM":
          const newMsg = {
            sender: data.station_id || data.satellite_id || "Servidor",
            date: new Date().toLocaleTimeString(),
            level: data.message?.level || "info",
            content: data.message?.content || data.message,
          };
          setChatMessages((prev) => [...prev, newMsg]);
          break;
        default:
          console.log("Evento recibido:", data);
      }
    };

    WebSocketService.subscribe(handleMessage);
    return () => {
      WebSocketService.unsubscribe(handleMessage);
    };
  }, []);

  const handleSendMessage = (text) => {
    if (text.startsWith("/")) {
      const [command, ...args] = text.trim().split(" ");
      if (command === "/destroy" && args.length === 1) {
        WebSocketService.sendMessage({ type: "DESTROY", satellite_id: args[0] });
      } else if (command === "/power" && args.length === 2) {
        WebSocketService.sendMessage({
          type: "CHANGE-POWER",
          satellite_id: args[0],
          amount: parseInt(args[1], 10),
        });
      } else {
        console.error("Comando no reconocido o parámetros incorrectos");
      }
    } else {
      WebSocketService.sendMessage({ type: "COMM", message: text });
    }
  };

  return (
    <div className="App" style={{ padding: "1rem" }}>
      <h1>🌍 Tarea Satelital</h1>
      <GlobeComponent satellites={satellites} />
      <ChatComponent onSendMessage={handleSendMessage} messages={chatMessages} />
      <SatellitesTable satellites={satellites} />
    </div>
  );
}

export default App;
