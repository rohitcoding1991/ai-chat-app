"use client";

import React from "react";
import { Trash2Icon, ArchiveRestoreIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getArchivedChats } from "@/actions/archive-chat";
import { ArchiveChat } from "@/types/chat";
import { formatDate } from "@/lib/date";
import { useChatStore } from "@/store/ChatStore";
import Spinner from "@/components/Spinner";

const ArchiveChats = () => {
  const unArchiveChat = useChatStore((state) => state.unarchiveChat);

  const [loading, setLoading] = React.useState(false);
  const [archiveChats, setArchiveChats] = React.useState<ArchiveChat[]>([]);
  const [spinnerTrue, setSpinnerTrue] = React.useState<string | null>(null);
  const deleteChat = useChatStore((state) => state.deleteChat);
  const fetchChats = useChatStore((state) => state.fetchChats);
  const [spinnerLoading, setSpinnerLoading] = React.useState<{
    [key: string]: boolean;
  }>({});

  React.useEffect(() => {
    setLoading(true);
    getArchivedChats()
      .then((data) => {
        setArchiveChats(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteSharedChat = async (id: string) => {
    try {
      setSpinnerTrue(id);
      const deletedChat = await deleteChat(id);
      if (deletedChat) {
        setArchiveChats((prev) => prev.filter((chat) => chat.id !== id));
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat");
    } finally {
      setSpinnerTrue(null);
    }
  };

  const handleRestoreChat = async (id: string) => {
    setSpinnerLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const unArchived = await unArchiveChat(id);

      if (unArchived) {
        setArchiveChats((prev) => prev.filter((chat) => chat.id !== id));
        toast.success("Chat unarchived successfully");
        fetchChats();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to unarchive chat");
    } finally {
      setSpinnerLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
        <CardContent className="p-0">
          {loading ? (
            <p className="min-h-[100px] flex items-center justify-center text-white/80 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
              Loading...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/10 hover:bg-white/5">
                  <TableHead className="hidden sm:table-cell text-white/90 font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-white/90 font-semibold">
                    Date Shared
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-white/90 font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archiveChats.length === 0 && (
                  <TableRow className="hover:bg-white/5 border-b border-white/5">
                    <TableCell colSpan={3} className="text-center py-8">
                      <span className="font-semibold text-sm text-white/60 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        No archived chats yet!
                      </span>
                    </TableCell>
                  </TableRow>
                )}
                {archiveChats.map((archiveChat) => {
                  return (
                    <TableRow
                      className="bg-white/5 hover:bg-white/10 border-b border-white/5 transition-all duration-300 group"
                      key={archiveChat.id}
                    >
                      <TableCell>
                        <div className="font-medium text-white/90 group-hover:text-cyan-300 transition-colors duration-300">
                          {archiveChat.title}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-white/70">
                        {formatDate(archiveChat.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="flex gap-x-3">
                          <span className="p-2 rounded-lg bg-white/10 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 cursor-pointer group">
                            {spinnerLoading[archiveChat.id] ? (
                              <div className="h-[16px] w-[16px]">
                                <Spinner
                                  height="15px"
                                  width="15px"
                                  borderWidth="2px"
                                  borderColor="cyan"
                                  borderBottomColor="white"
                                />
                              </div>
                            ) : (
                              <ArchiveRestoreIcon
                                onClick={() =>
                                  handleRestoreChat(archiveChat.id)
                                }
                                className="text-white/70 group-hover:text-cyan-300 transition-colors duration-300"
                                size={16}
                              />
                            )}
                          </span>
                          <span className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:scale-110 cursor-pointer group">
                            {spinnerTrue === archiveChat.id ? (
                              <div className="h-[16px] w-[16px]">
                                <Spinner
                                  width="15px"
                                  height="15px"
                                  borderWidth="2px"
                                  borderBottomColor="red"
                                  borderColor="white"
                                />
                              </div>
                            ) : (
                              <Trash2Icon
                                className="text-white/70 group-hover:text-red-400 transition-colors duration-300"
                                size={16}
                                onClick={() => deleteSharedChat(archiveChat.id)}
                              />
                            )}
                          </span>
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ArchiveChats;
