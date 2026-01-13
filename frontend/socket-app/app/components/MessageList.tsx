"use client";

import { useEffect, useRef } from "react";

interface Message {
    user: string;
    text: string;
    time: string;
    isSystem?: boolean;
}

interface MessageListProps {
    messages: Message[];
    currentUser: string;
}

export default function MessageList({ messages, currentUser }: MessageListProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
        >
            {messages.map((msg, idx) => {
                if (msg.isSystem) {
                    return (
                        <div key={idx} className="system-message text-center animate-fade-in">
                            {msg.text}
                        </div>
                    );
                }

                const isMine = msg.user === currentUser;

                return (
                    <div
                        key={idx}
                        className={`flex flex-col ${isMine ? "items-end" : "items-start"} animate-fade-in`}
                    >
                        {!isMine && (
                            <span className="mb-1 ml-1 text-xs font-medium text-zinc-500">
                                {msg.user}
                            </span>
                        )}
                        <div className={`message-bubble ${isMine ? "message-mine" : "message-others"}`}>
                            {msg.text}
                        </div>
                        <span className="mt-1 text-[10px] text-zinc-600 px-1">
                            {msg.time}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
