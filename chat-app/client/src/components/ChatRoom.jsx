import React, { useEffect, useState, useRef } from "react";
import Worker from "../worker/socketWorker.js?worker";

function ChatRoom({ room }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const workerRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker();
    workerRef.current.postMessage({ type: "init", roomName: room });

    workerRef.current.onmessage = (e) => {
      if (e.data.type === "new_message") {
        setMessages((prev) => [...prev, e.data.data]);
      }
    };

    return () => {
      workerRef.current.terminate();
    };
  }, [room]);

  const handleSend = () => {
    if (input.trim()) {
      workerRef.current.postMessage({
        type: "send",
        roomName: room,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div>
      <h3>Room: {room}</h3>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatRoom;
