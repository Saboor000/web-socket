"use client";

import { useState } from "react";
import { Send, Smile } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onTyping: () => void;
}

export default function MessageInput({
  onSendMessage,
  onTyping,
}: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    onTyping();
  };

  return (
    <div className="p-6 border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <button
          type="button"
          className="absolute left-4 p-1 text-zinc-500 transition-colors hover:text-white"
        >
          <Smile size={20} />
        </button>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Type a message..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-14 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-blue-500/30 focus:bg-white/10"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
