"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChat, Message } from "ai/react";

import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatLine from "@/components/Chat/ChatLine";
import { createChat } from "@/actions/create-chat";
import { getMessagesByChatId } from "@/actions/get-messages-by-chatid";
import { useChatStore } from "@/store/ChatStore";
import OpenAIIcon from "@/icons/svg/open-ai.svg";
import Spinner from "@/components/Spinner";
import { ChatSkeleton, AIThinkingSkeleton } from "@/components/Skeleton";

function ChatInput() {
  const router = useRouter();
  const params = useParams();
  const chatId = (params?.slug ?? "") as string;

  const fetchChats = useChatStore((state) => state.fetchChats);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const newChatInitiated = useRef(false);

  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    messages,
    setInput,
    setMessages,
  } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scrollRef, messages]);

  useEffect(() => {
    if (newChatInitiated.current && !isLoading && messages.length >= 2) {
      createChat({
        chatId,
        title: messages[0].content,
        messages: messages.slice(-2),
      }).then((response) => {
        newChatInitiated.current = false;
        router.push(`/chat/${response.chat.id}`);
      });
    } else if (chatId && messages.length === 0 && !isLoading) {
      setFetchLoading(true);
      getMessagesByChatId({ chatId })
        .then((msgs) => {
          setMessages(msgs as Message[]);
          newChatInitiated.current = false;
        })
        .catch((error) => setError(error.message))
        .finally(() => setFetchLoading(false));
    } else if (!chatId && !isLoading) {
      setFetchLoading(false);
    }
  }, [isLoading, router, chatId]);

  useEffect(() => {
    if (chatId) {
      fetchChats();
    }
  }, [chatId]);

  return (
    <div className="relative h-[calc(100vh_-_64px)] bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-28 h-28 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div
        ref={scrollRef}
        className="h-[calc(100vh_-_64px_-_80px)] overflow-y-auto relative z-10 custom-scrollbar"
      >
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            transition: all 0.3s ease;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
          }

          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1);
          }

          /* Hide scrollbar on mobile */
          @media (max-width: 768px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 0px;
              background: transparent;
            }
          }
        `}</style>
        {fetchLoading ? (
          <ChatSkeleton />
        ) : (
          <>
            {messages.length === 0 && (
              <div className="absolute top-0 left-0 bottom-0 right-0 z-[-1] flex justify-center items-center">
                <div className="text-center">
                  <div className="mb-6 opacity-20">{/* <OpenAIIcon /> */}</div>
                  <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-2">
                    Welcome to AIHub
                  </h2>
                  <p className="text-white/60">
                    Start a conversation with any AI model
                  </p>
                </div>
              </div>
            )}
            <div className="w-full flex flex-col gap-10 pr-4 pb-8 px-2 pt-4">
              {messages.map((hist: Message, i) => (
                <ChatLine
                  key={hist.id + i}
                  id={hist.id + i}
                  role={hist.role}
                  content={hist.content}
                />
              ))}

              {/* AI Thinking Indicator - Only show if loading and last message is not assistant */}
              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role !== "assistant" && (
                <AIThinkingSkeleton />
              )}
              {isLoading && messages.length === 0 && <AIThinkingSkeleton />}
            </div>
            {error && (
              <div className="flex justify-center items-center h-[70vh]">
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-xl">
                  <p className="text-red-300 font-medium">{error}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced Input Area */}
      <div className="p-4 bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-xl border-t border-white/10 h-[80px] absolute bottom-0 w-full">
        <form
          className="h-full items-center flex gap-4"
          onSubmit={(...allParams) => {
            newChatInitiated.current = true;
            handleSubmit(...allParams);
          }}
        >
          <div className="h-full flex items-center w-full">
            <FormItem className="w-full">
              <Input
                placeholder="Enter your prompt..."
                value={input}
                onChange={handleInputChange}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-cyan-400/50 focus:ring-cyan-400/25 backdrop-blur-sm h-12 text-base rounded-xl transition-all duration-300 hover:bg-white/10"
                disabled={isLoading}
              />
            </FormItem>
          </div>
          <div className="h-full flex items-center">
            <Button
              disabled={isLoading || !input.trim()}
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {!isLoading ? (
                <span className="flex items-center space-x-2">
                  <span>Send</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              ) : (
                <div className="flex items-center space-x-2">
                  <Spinner
                    width="20px"
                    height="20px"
                    borderWidth="3px"
                    borderColor="white"
                    borderBottomColor="transparent"
                  />
                  <span>Sending...</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
