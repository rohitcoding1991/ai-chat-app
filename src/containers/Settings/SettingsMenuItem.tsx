"use client";

import React from "react";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useSettingStore } from "@/store/SettingStore";

interface IProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenuItem = () => {
  const openSettings = useSettingStore((state) => state.openSettings);

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer text-white hover:text-cyan-300 bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] focus:bg-white/10 focus:text-cyan-300 border border-white/10 hover:border-cyan-400/30 group"
        onClick={openSettings}
      >
        <div className="flex items-center space-x-3 w-full">
          <svg
            className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 text-white/80 group-hover:text-cyan-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="font-medium flex-1">Settings</span>
          <DropdownMenuShortcut className="text-white/60 group-hover:text-cyan-400 transition-colors duration-300 text-xs bg-white/10 px-2 py-1 rounded-md border border-white/20">
            ⌘S
          </DropdownMenuShortcut>
        </div>
      </DropdownMenuItem>
    </>
  );
};

export default SettingsMenuItem;
