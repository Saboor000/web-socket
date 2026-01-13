"use client";

import { useState } from "react";
import Login from "./components/Login";
import ChatMain from "./components/ChatMain";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  if (!username) {
    return <Login onJoin={setUsername} />;
  }

  return <ChatMain username={username} />;
}
