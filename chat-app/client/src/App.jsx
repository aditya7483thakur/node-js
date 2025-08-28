import React, { useState } from "react";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [room, setRoom] = useState(null);

  return (
    <div>{room ? <ChatRoom room={room} /> : <Home onJoin={setRoom} />}</div>
  );
}

export default App;
