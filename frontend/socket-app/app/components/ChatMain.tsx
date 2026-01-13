"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Hash, Search, Bell } from "lucide-react";

interface Message {
  user: string;
  text: string;
  time: string;
  isSystem?: boolean;
}

interface ChatMainProps {
  username: string;
}

const SOCKET_URL = "http://localhost:3001";

export default function ChatMain({ username }: ChatMainProps) {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    socketRef.current = newSocket;

    newSocket.emit("join", username);

    newSocket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("userList", (userList: string[]) => {
      setUsers(userList);
    });

    newSocket.on("userTyping", (user: string) => {
      if (user !== username) setTypingUser(user);
    });

    newSocket.on("userStopTyping", () => {
      setTypingUser(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  const sendMessage = useCallback(
    (text: string) => {
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", { user: username, text });
        socketRef.current.emit("stopTyping");
      }
    },
    [username]
  );

  const handleTyping = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit("typing", username);
      // Optional: debounced stopTyping
    }
  }, [username]);

  return (
    <div className="flex h-screen w-full bg-[#0f1115] overflow-hidden">
      <Sidebar users={users} currentUser={username} />

      <div className="flex flex-1 flex-col relative">
        {/* Header */}
        <header className="glass flex h-18.25 items-center justify-between px-8 border-b border-white/10 z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
              <Hash size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Public Lounge</h3>
              <p className="text-xs text-zinc-500">
                {typingUser ? (
                  <span className="text-blue-400 animate-pulse">
                    {typingUser} is typing...
                  </span>
                ) : (
                  `${users.length} members online`
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <button className="hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
              <Search size={20} />
            </button>
            <button className="hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 border border-[#0f1115]"></span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <MessageList messages={messages} currentUser={username} />

        {/* Input */}
        <MessageInput onSendMessage={sendMessage} onTyping={handleTyping} />
      </div>

      {/* Background Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 blur-[120px] pointer-events-none"></div>
    </div>
  );
}
