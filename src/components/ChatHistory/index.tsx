import React from "react";

import { getChats } from "@/actions/get-chats";
import Chats from "./Chats";

const ChatHistory = async () => {
  const chats = await getChats();

  return (
    <div className="group flex flex-col gap-3 py-4 data-[collapsed=true]:py-2 bg-gradient-to-b from-slate-800/30 to-slate-900/30 backdrop-blur-md rounded-2xl border border-white/10">
      {/* Header */}
      <div className="px-4">
        <h2 className="text-sm font-semibold text-white/60 mb-2">
          Your chats
        </h2>
      </div>

      {/* Chat List */}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <Chats chats={chats} />
      </nav>
    </div>
  );
};

export default ChatHistory;
