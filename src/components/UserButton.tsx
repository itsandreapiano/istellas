"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

import { useQueryClient } from "@tanstack/react-query";

import {
  Check,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  UserIcon,
  Settings as SettingsIcon,
  SunMoon,
  Database,
  Globe,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { logout } from "@/app/(auth)/actions";
import { useSession } from "@/app/(main)/SessionProvider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

import UserAvatar from "./UserAvatar";

interface UserButtonProps {
  className?: string;
}

const UserButton = ({ className }: UserButtonProps) => {
  const { user } = useSession();

  const { theme, setTheme } = useTheme();

  const queryClient = useQueryClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-[0_2px_11px_rgba(0,0,0,0.25)]">
        <DropdownMenuLabel>Hey, @{user.username}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/astro-db">
          <DropdownMenuItem>
            <Database className="mr-2 size-4" />
            My Astro DB
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SettingsIcon className="mr-2 size-4" />
            Settings
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="mr-2 size-4" />
                  Display
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Monitor className="mr-2 size-4" />
                      System default
                      {theme === "system" && <Check className="ms-2 size-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 size-4" />
                      Light mode
                      {theme === "light" && <Check className="ms-2 size-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 size-4" />
                      Dark mode
                      {theme === "dark" && <Check className="ms-2 size-4" />}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Globe className="mr-2 size-4" />
                  <span>Language</span>
                  <span className="ml-2" aria-hidden="true"></span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      العربية <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      中文 <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Deutsch <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      English <Check className="ms-2 size-4" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Español <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Esperanto
                      <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Ελληνικά
                      <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Français
                      <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Italiano
                      <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      日本語 <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Latīna <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Polski <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Português
                      <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Русский <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Sardu <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="pointer-events-none text-gray-400">
                      Türkçe <span className="ml-1 italic">(coming soon)</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
