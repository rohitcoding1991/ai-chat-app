import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  EllipsisIcon,
  Trash2Icon,
  PencilIcon,
  ShareIcon,
  ArchiveIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { EditChatItem } from "@/types/chat";
import ConfirmDelete from "@/components/ConfirmDelete";
import { updateChatTitle } from "@/actions/update-chat-title";
import { useChatStore } from "@/store/ChatStore";
import { archiveChat } from "@/actions/archive-chat";
import ShareChat from "@/components/ShareChat";

const ChatItem = ({ chat, selected }: { chat: Chat; selected: boolean }) => {
  const router = useRouter();
  const moveChatToIndex = useChatStore((state) => state.moveChatToIndex);
  const deleteChat = useChatStore((state) => state.deleteChat);

  const [hover, setHover] = React.useState(false);
  const [editChat, setEditChat] = React.useState<EditChatItem>({
    id: "",
    title: "",
  });

  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [openShareChat, setOpenShareChat] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const fetchChats = useChatStore((state) => state.fetchChats);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteChat = async () => {
    try {
      setLoading(true);
      const deletedChat = await deleteChat(chat.id);
      setLoading(false);
      setOpenConfirmDelete(false);
      toast.success(`Chat #${deletedChat.id} deleted successfully`);
      router.replace("/chat");
      fetchChats();
    } catch (error) {
      toast.error("Error deleting chat");
    }
  };

  const handleEditChat = async () => {
    if (editChat.title === "" || editChat.title === chat.title) {
      setEditChat({ id: "", title: "" });
      return;
    }
    try {
      const updatedChat = await updateChatTitle({
        chatId: editChat.id,
        title: editChat.title,
      });
      if (updatedChat) {
        toast.success(`Chat #${updatedChat.id} updated successfully`);
        setEditChat({ id: "", title: "" });
        moveChatToIndex(editChat.id, 0, updatedChat);
      }
    } catch (error) {
      toast.error("Error updating chat");
    }
  };

  const handleArchiveChat = async () => {
    try {
      await archiveChat({ chatId: chat.id });
      toast.success(`Chat #${chat.id} archived successfully`, {
        description:
          "Tip: you can view it in the archived chats under the settings",
      });
      router.replace("/chat");
      fetchChats();
    } catch (error) {
      toast.error("Error archiving chat");
    }
  };

  if (editChat.id) {
    return (
      <Input
        value={editChat.title}
        onChange={(e) => setEditChat({ ...editChat, title: e.target.value })}
        onBlur={() => handleEditChat()}
        autoFocus
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleEditChat();
          }
        }}
        className="bg-white/5 border-white/20 text-white placeholder:text-white/60 focus:border-cyan-400/50 focus:ring-cyan-400/25 backdrop-blur-sm"
      />
    );
  }

  return (
    <>
      <Link
        key={chat.id}
        href={`/chat/${chat.id}`}
        className={cn(
          "group relative flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200",
          selected
            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white"
            : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between w-full gap-2">
          <p className="truncate flex-1 text-sm font-normal">{chat.title}</p>

          {isClient && (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                {(hover || dropdownOpen || selected) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200 flex-shrink-0"
                  >
                    <EllipsisIcon size={16} />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 text-white rounded-xl">
                <DropdownMenuItem
                  className="flex items-center gap-x-3 hover:cursor-pointer text-white hover:bg-white/10 hover:text-cyan-300 transition-all duration-300 rounded-lg"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenShareChat(true);
                  }}
                >
                  <ShareIcon size={16} className="text-cyan-400" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-x-3 hover:cursor-pointer text-white hover:bg-white/10 hover:text-purple-300 transition-all duration-300 rounded-lg"
                  onClick={() => {
                    setEditChat({ id: chat.id, title: chat.title });
                  }}
                >
                  <PencilIcon size={16} className="text-purple-400" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-x-3 hover:cursor-pointer text-white hover:bg-white/10 hover:text-yellow-300 transition-all duration-300 rounded-lg"
                  onClick={handleArchiveChat}
                >
                  <ArchiveIcon size={16} className="text-yellow-400" />
                  <span>Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-x-3 text-red-400 hover:cursor-pointer hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 rounded-lg"
                  onClick={() => setOpenConfirmDelete(true)}
                >
                  <Trash2Icon size={16} />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </Link>
      {openConfirmDelete && (
        <ConfirmDelete
          open={openConfirmDelete}
          onClose={() => setOpenConfirmDelete(false)}
          title="Delete Chat?"
          onDelete={handleDeleteChat}
          loading={loading}
        />
      )}

      {openShareChat && (
        <ShareChat
          id={chat.id}
          open={openShareChat}
          setOpen={setOpenShareChat}
        />
      )}
    </>
  );
};

export default ChatItem;
