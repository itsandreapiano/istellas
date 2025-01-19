"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { useQueryClient } from "@tanstack/react-query";

import {
  Check,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  SunMoon,
  Globe,
  Bookmark,
  UserCog,
  Key,
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

interface MenuButtonProps {
  className?: string;
}

const MenuButton = ({ className }: MenuButtonProps) => {
  const { user } = useSession();

  const { theme, setTheme } = useTheme();

  const queryClient = useQueryClient();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className={cn("flex-none rounded-full", className)}>
          <UserCog size={28} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-1 py-1 shadow-[0_1px_10px_rgba(0,0,0,0.25)]">
        <DropdownMenuLabel>Activity & Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link> */}
        <Link href="/bookmarks">
          <DropdownMenuItem>
            <Bookmark className="mr-2 size-4" />
            Bookmarks
          </DropdownMenuItem>
        </Link>
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
            <span className="mr-4">Languages</span>
            <span aria-hidden="true"></span>
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
        <DropdownMenuSeparator />

        <DropdownMenuItem className="astro-silver pointer-events-none mt-2 pr-2 text-xs font-bold">
          <Key className="mr-2 size-4 text-foreground" />@{user.username}
        </DropdownMenuItem>
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

export default MenuButton;
