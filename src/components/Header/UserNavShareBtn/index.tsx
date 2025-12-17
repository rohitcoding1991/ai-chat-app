"use client";

import ShareChat from "@/components/ShareChat";
import { ShareIcon } from "lucide-react";
import React from "react";
import { useChatStore } from "@/store/ChatStore";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const ShareBtn = () => {
  const [openShareChat, setOpenShareChat] = React.useState(false);
  const chatsFromStore = useChatStore((state) => state.chats);
  const params = useParams();
  const chatId = (params?.slug ?? "") as string;

  if (!chatId) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpenShareChat(true)}
        className="h-12 w-12 rounded-full p-0 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group"
      >
        <ShareIcon className="h-5 w-5 text-white/80 group-hover:text-purple-300 transition-colors duration-300" />
      </Button>
      {openShareChat &&
        chatsFromStore.map((chat) => {
          if (chat.id === chatId) {
            return (
              <ShareChat
                key={chat.id}
                id={chat.id}
                open={openShareChat}
                setOpen={setOpenShareChat}
              />
            );
          }
        })}
    </>
  );
};

export default ShareBtn;
