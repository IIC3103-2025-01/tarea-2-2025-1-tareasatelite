// src/services/websocketService.js

const WS_URL = "wss://tarea-2.2025-1.tallerdeintegracion.cl/connect";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = [];
  }

  connect() {
    this.socket = new WebSocket(WS_URL);

    this.socket.onopen = () => {
      console.log("WebSocket conectado");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Mensaje recibido:", data);
        // Notifica a todos los suscriptores con el nuevo mensaje
        this.listeners.forEach((callback) => callback(data));
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket desconectado");
      // Aquí podrías implementar lógica de reconexión si es necesario.
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("Socket no está listo para enviar mensajes");
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  unsubscribe(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }
}

// Exporta una única instancia de WebSocketService
export default new WebSocketService();
