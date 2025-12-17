
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/auth";
import { ROOT } from "@/routes";
import { getInitials } from "@/utils/strings";
import SettingsMenuItem from "@/containers/Settings/SettingsMenuItem";
import ShareBtn from "../UserNavShareBtn";

export async function UserNav() {
  const session = await auth();

  return (
    <div className="flex gap-3 items-center">
      <ShareBtn />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-12 w-12 rounded-full p-0 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            <Avatar className="h-10 w-10 ring-2 ring-white/20 hover:ring-cyan-400/50 transition-all duration-300">
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user.name ?? "Profile"}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold text-sm">
                {getInitials(session?.user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-64 bg-slate-800/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 rounded-2xl p-2" 
          align="end" 
          forceMount
        >
          {/* User Info Section */}
          <DropdownMenuLabel className="font-normal p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl mb-2 border border-white/10">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-cyan-400/30">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user.name ?? "Profile"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold">
                  {getInitials(session?.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {session?.user.name}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {session?.user.email}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Online</span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>

          {/* Separator with gradient */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-2"></div>
          
          <DropdownMenuGroup>
            <div className="p-1">
              <SettingsMenuItem />
            </div>
          </DropdownMenuGroup>

          {/* Another gradient separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"></div>
          
          {/* Logout Section */}
          <DropdownMenuItem className="flex-1 p-1 focus:bg-transparent">
            <form
              className="flex-1 cursor-pointer"
              action={async (event) => {
                "use server";
                await signOut({
                  redirectTo: ROOT,
                  redirect: true,
                });
              }}
            >
              <button 
                type="submit" 
                className="flex w-full items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 border border-red-500/20 hover:border-red-400/40 text-red-300 hover:text-red-200 transition-all duration-300 hover:scale-[1.02] group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Log out</span>
                <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}