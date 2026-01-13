"use client";

import { useState } from "react";
import { User } from "lucide-react";

interface LoginProps {
    onJoin: (username: string) => void;
}

export default function Login({ onJoin }: LoginProps) {
    const [username, setUsername] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onJoin(username.trim());
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0f1115]">
            <div className="glass w-full max-w-md rounded-2xl p-8 shadow-2xl animate-fade-in">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
                        <User size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-zinc-400">Enter a username to join the chat</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-blue-500/50 focus:bg-white/10"
                            autoFocus
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-500 active:scale-[0.98]"
                    >
                        Join Chat
                    </button>
                </form>
            </div>
        </div>
    );
}
