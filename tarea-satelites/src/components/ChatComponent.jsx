// src/components/ChatComponent.jsx
import React, { useState } from "react";

const ChatComponent = ({ onSendMessage, messages }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    // Llama a la función enviada por props para procesar y enviar el mensaje
    onSendMessage(input);
    setInput("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "1rem" }}>
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid #eee",
          padding: "5px",
          marginBottom: "10px"
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ color: msg.level === "warn" ? "red" : "black" }}>
            <strong>{msg.sender}</strong> [{msg.date}]: {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu mensaje o comando..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%", marginRight: "5px" }}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatComponent;
