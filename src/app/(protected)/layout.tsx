import React from "react";

import Sidebar from "@/components/Sidebar";
import { UserNav } from "@/components/Header/UserNav";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 min-h-screen max-h-screen overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-indigo-500/8 to-cyan-500/8 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="hidden md:block min-w-[256px] max-w-[256px] relative z-10">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 relative z-10 max-h-screen overflow-hidden">
        {/* Header */}
        <div className="flex justify-end h-[64px] items-center px-6 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-b border-white/10 w-full flex-shrink-0">
          <UserNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 relative overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
