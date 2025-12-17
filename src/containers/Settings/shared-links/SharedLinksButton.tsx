"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import ControlledDialog from "@/components/ControlledDialog";
import { useSettingStore } from "@/store/SettingStore";

const SharedLinksButton = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useSettingStore((state) => state.sharedLinks);
  const openSharedLinks = useSettingStore((state) => state.openSharedLinks);
  const closeSharedLinks = useSettingStore((state) => state.closeSharedLinks);

  return (
    <>
      {/* Trigger */}
      {/* <Button className="text-black" variant="outline" size="sm" onClick={openSharedLinks}>
        Manage
      </Button> */}
        <Button 
              className="cursor-pointer text-white hover:text-cyan-300 bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all duration-300 hover:scale-[1.02] focus:bg-white/10 focus:text-cyan-300 border border-white/10 hover:border-cyan-400/30 group font-medium"
              variant="ghost" 
              size="sm" 
              onClick={openSharedLinks}
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span className="flex-1">Manage</span>
              </div>
            </Button>

      <ControlledDialog
        size="md"
        title="Shared Links"
        open={isOpen}
        onClose={closeSharedLinks}
        footer={null}
      >
        {children}
      </ControlledDialog>
    </>
  );
};

export default SharedLinksButton;
