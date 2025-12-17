import { Message } from "ai";
import RenderMd from "../Markdown/RenderMd";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

type ChatLineProps = Message;

export default function ChatLine({ role, content }: ChatLineProps) {
  const { data: session } = useSession();

  const avatarSrc =
    role === "assistant"
      ? "/chatgptlogo.svg"
      : session?.user?.image || "/user-circle.svg";
  const roleName = role === "assistant" ? "AI Assistant" : "You";
  const isAssistant = role === "assistant";

  return (
    <div
      className={`w-full flex gap-4 group ${isAssistant ? "flex-row" : ""} ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex-shrink-0">
        <Avatar
          className={`h-10 w-10 ring-2 transition-all duration-300 ${
            isAssistant
              ? "ring-purple-400/30 group-hover:ring-purple-400/50"
              : "ring-cyan-400/30 group-hover:ring-cyan-400/50"
          }`}
        >
          <AvatarImage className="h-10 w-10 object-cover" src={avatarSrc} />
          <AvatarFallback
            className={`text-white font-bold text-sm ${
              isAssistant
                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                : "bg-gradient-to-r from-cyan-500 to-blue-500"
            }`}
          >
            {isAssistant ? "AI" : session?.user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </div>

      <div
        className={`w-[90%] sm:w-[85%] md:w-[80%] flex flex-col space-y-2 ${
          isAssistant ? "bg-white/5" : "bg-cyan-600/30"
        } rounded-2xl p-4 transition-all duration-300 hover:bg-white/10 border ${
          isAssistant
            ? "border-white/5 hover:border-white/20"
            : "border-cyan-400/20 hover:border-cyan-400/40"
        } backdrop-blur-sm`}
      >
        <div className="flex items-center space-x-3">
          <p
            className={`font-semibold text-sm ${
              isAssistant ? "text-purple-300" : "text-cyan-300"
            }`}
          >
            {roleName}
          </p>

          {/* Status indicator */}
          <div
            className={`w-2 h-2 rounded-full ${
              isAssistant ? "bg-purple-400" : "bg-cyan-400"
            } animate-pulse`}
          ></div>

          {/* Timestamp could go here */}
          <span className="text-xs text-white/40">now</span>
        </div>

        <div className="prose prose-invert max-w-none text-white prose-headings:text-white prose-p:text-white prose-li:text-white prose-strong:text-white prose-em:text-white prose-code:text-white prose-pre:text-white prose-blockquote:text-white/90 break-words overflow-wrap-anywhere">
          <RenderMd text={content} />
        </div>

        {/* Message actions */}
        <div
          className={`flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 ${
            isAssistant ? "justify-start" : "justify-end"
          }`}
        >
          <button className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200">
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>

          {isAssistant && (
            <>
              <button className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200">
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
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
