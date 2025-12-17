
"use client";

import React from "react";
import { Trash2Icon, EyeIcon } from "lucide-react";
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
import { getSharedChats, deleteSharedChatById } from "@/actions/share-chat";
import { SharedChat } from "@/types/chat";
import { formatDate } from "@/lib/date";
import Spinner from "@/components/Spinner";

const SharedLinks = () => {
  const [loading, setLoading] = React.useState(false);
  const [sharedChats, setSharedChats] = React.useState<SharedChat[]>([]);
  const [spinnerLoading, setSpinnerLoading] = React.useState<{
    [key: string]: boolean;
  }>({});
  
  React.useEffect(() => {
    setLoading(true);
    getSharedChats()
      .then((data) => {
        setSharedChats(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const deleteSharedChat = async (id: string) => {
    setSpinnerLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const deletedChat = await deleteSharedChatById(id);
      if (deletedChat) {
        setSharedChats((prev) => prev.filter((chat) => chat.id !== id));
        toast.success("Chat deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat");
    } finally {
      setSpinnerLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20">
        <CardContent className="p-0">
          {loading ? (
            <div className="min-h-[100px] flex items-center justify-center bg-transparent">
              <p className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                Loading...
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/10 hover:bg-white/5">
                  <TableHead className="hidden sm:table-cell text-white/90 font-semibold">Name</TableHead>
                  <TableHead className="hidden sm:table-cell text-white/90 font-semibold">
                    Date Shared
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-white/90 font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sharedChats.length === 0 && (
                  <TableRow className="hover:bg-white/5 border-b border-white/5">
                    <TableCell colSpan={3} className="text-center py-8">
                      <span className="font-semibold text-sm text-white/60 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        No chats shared yet!
                      </span>
                    </TableCell>
                  </TableRow>
                )}
                {sharedChats.map((sharedChat) => {
                  return (
                    <TableRow 
                      className="bg-white/5 hover:bg-white/10 border-b border-white/5 transition-all duration-300 group" 
                      key={sharedChat.id}
                    >
                      <TableCell>
                        <div className="font-medium text-white/90 group-hover:text-cyan-300 transition-colors duration-300">
                          {sharedChat.chat.title}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-white/70">
                        {formatDate(sharedChat.createdAt)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="flex gap-x-3">
                          <a
                            href={`/chat/${sharedChat.chatId}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 cursor-pointer group inline-block"
                          >
                            <EyeIcon className="text-white/70 group-hover:text-blue-400 transition-colors duration-300" size={16} />
                          </a>
                          <span className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:scale-110 cursor-pointer group">
                            {spinnerLoading[sharedChat.id] ? (
                              <div className="h-[16px] w-[16px]">
                                <Spinner
                                  height="15px"
                                  width="15px"
                                  borderColor="red"
                                  borderWidth="2px"
                                  borderBottomColor="white"
                                />
                              </div>
                            ) : (
                              <Trash2Icon
                                className="text-white/70 group-hover:text-red-400 transition-colors duration-300"
                                size={16}
                                onClick={() => deleteSharedChat(sharedChat.id)}
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

export default SharedLinks;