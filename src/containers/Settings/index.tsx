"use client";

import React from "react";

import { cn } from "@/lib/utils";
import GeneralTab from "./tabs/General";
import DataControlTab from "./tabs/DataControl";
import SecurityTab from "./tabs/Security";

const Settings = () => {
  const [selectedTab, setSelectedTab] = React.useState("general");

  return (
    <div className="flex justify-start pb-2 gap-x-6 min-h-[200px]">
      <nav className="flex flex-col text-sm w-[140px] bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20 rounded-xl p-6 gap-y-6">
        <span
          className={cn(
            "cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 font-medium border border-transparent",
            selectedTab === "general"
              ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text border-cyan-400/30 shadow-lg shadow-cyan-500/25"
              : "text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105"
          )}
          onClick={() => setSelectedTab("general")}
        >
          General
        </span>
        <span
          className={cn(
            "cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 font-medium border border-transparent",
            selectedTab === "data_control"
              ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text border-cyan-400/30 shadow-lg shadow-cyan-500/25"
              : "text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105"
          )}
          onClick={() => setSelectedTab("data_control")}
        >
          Data Control
        </span>
        <span
          className={cn(
            "cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 font-medium border border-transparent",
            selectedTab === "security"
              ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text border-cyan-400/30 shadow-lg shadow-cyan-500/25"
              : "text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-105"
          )}
          onClick={() => setSelectedTab("security")}
        >
          Security
        </span>
      </nav>
      <div className="flex-1 flex-col spacing-y-6 bg-gradient-to-br from-white/5 via-white/2 to-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl shadow-black/10">
        {selectedTab === "general" && <GeneralTab />}
        {selectedTab === "data_control" && <DataControlTab />}
        {selectedTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
};

export default Settings;
