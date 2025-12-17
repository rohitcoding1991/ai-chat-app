"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Chat } from "@prisma/client";
import { useChatStore } from "@/store/ChatStore";
import ChatItem from "./ChatItem";

const Chats = ({ chats }: { chats: Chat[] }) => {
  const chatsFromStore = useChatStore((state) => state.chats);
  const params = useParams();
  const chatId = (params?.slug ?? "") as string;

  const renderCharts = chatsFromStore.length ? chatsFromStore : chats;

  if (renderCharts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No chats yet
          </h3>
          <p className="text-white/60 text-sm">
            Start a new conversation to see your chats here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {renderCharts.map((chat) => (
        <ChatItem key={chat.id} chat={chat} selected={chat.id === chatId} />
      ))}
    </div>
  );
};

export default Chats;
