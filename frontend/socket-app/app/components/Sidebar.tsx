"use client";

import { Users, LogOut, Circle } from "lucide-react";

interface SidebarProps {
    users: string[];
    currentUser: string;
}

export default function Sidebar({ users, currentUser }: SidebarProps) {
    return (
        <div className="glass flex h-full w-[300px] flex-col border-r border-white/10 hidden md:flex">
            <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {currentUser[0]?.toUpperCase()}
                </div>
                <div>
                    <h2 className="font-semibold text-white">{currentUser}</h2>
                    <div className="flex items-center gap-1.5 ">
                        <Circle size={8} className="fill-green-500 text-green-500" />
                        <span className="text-xs text-zinc-400">Online</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                <div className="mb-4 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Users size={14} />
                    Active Users ({users.length})
                </div>
                <div className="space-y-1">
                    {users.map((user, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${user === currentUser ? "bg-white/5" : "hover:bg-white/5"
                                }`}
                        >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-sm font-medium border border-white/5">
                                {user[0]?.toUpperCase()}
                            </div>
                            <span className={`text-sm ${user === currentUser ? "text-white font-medium" : "text-zinc-300"}`}>
                                {user} {user === currentUser && "(You)"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => window.location.reload()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
}
