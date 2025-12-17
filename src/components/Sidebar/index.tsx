import React from "react";

import Link from "next/link";
import CreateIcon from "@/icons/svg/create.svg";
import SidebarIcon from "@/icons/svg/sidebar.svg";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatHistory from "@/components/ChatHistory";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-r border-white/20 h-screen shadow-2xl">
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 min-h-[64px] flex justify-between items-center w-full px-4 py-4 border-b border-white/10 bg-white/5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <SidebarIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800/95 backdrop-blur-xl border border-white/20 text-white">
              <span>Close Sidebar</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-300 hover:text-cyan-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 backdrop-blur-sm"
                >
                  <CreateIcon />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800/95 backdrop-blur-xl border border-white/20 text-white">
              <span>New Chat</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Chat History */}
      <div className="relative z-10 p-4 h-[calc(100vh-64px)] overflow-y-auto">
        <ChatHistory />
      </div>
    </div>
  );
};

export default Sidebar;
