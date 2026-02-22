import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "agent" },
    { id: 2, text: "I need some assistance with my account.", sender: "user" },
    { id: 3, text: "Sure, can you please provide me with your account ID?", sender: "agent" },
    { id: 4, text: "Yes, it’s ABCDEF123.", sender: "user" },
    { id: 5, text: "Thank you. Let me check the details for you.", sender: "agent" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" }
    ]);

    setInput("");
  };

  return (
    <div className="chat-app">
      <div className="chat-header">Support Chat</div>

      <div className="messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender === "user" ? "user-message" : "agent-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;