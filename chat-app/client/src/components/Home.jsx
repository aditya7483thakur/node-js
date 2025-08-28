import React, { useState } from "react";

function Home({ onJoin }) {
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (room.trim()) {
      onJoin(room.trim());
    }
  };

  return (
    <div>
      <h2>Enter Room Name</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room name"
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default Home;
