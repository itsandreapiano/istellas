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
  Sparkles,
  MessageCircleHeart,
  Hash,
  UserPlus,
  Info,
  HeartHandshake,
  BookLock,
  LifeBuoy,
  Flame,
  Ban,
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
        <DropdownMenuLabel className="text-md px-12 text-center text-[14px] md:px-14">
          Activity & Settings
        </DropdownMenuLabel>
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
        <Link href="/stelliums">
          <DropdownMenuItem>
            <Sparkles className="mr-2 size-4" /> Stelliums
          </DropdownMenuItem>
        </Link>
        <Link href="/trending-topics">
          <DropdownMenuItem>
            <Hash className="mr-2 size-4" /> Trending topics
          </DropdownMenuItem>
        </Link>
        <Link href="/who-to-follow">
          <DropdownMenuItem>
            <UserPlus className="ml-[2px] mr-[7.7px] size-4" /> Who to follow
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <MessageCircleHeart className="mr-2 size-4" />
            Dating Mood
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                <Ban className="mr-2 size-4" />
                Not interested
                {/* {<Check className="ms-2 size-4" />} */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flame className="mr-2 size-4" />
                Open to it
                {<Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <SunMoon className="mr-2 size-4" />
            Display
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System
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
            <span>Languages</span>
            <span aria-hidden="true"></span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                AR - العربية <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                ZH - 中文 <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                DE - Deutsch <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                EN - English <Check className="ms-2 size-4" />
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                ES - Español <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                EO - Esperanto
                <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                EL - Ελληνικά
                <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                FR -Français
                <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                IT - Italiano
                <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                JA - 日本語 <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                LA - Latīna <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                PL - Polski <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                PT - Português
                <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                RU - Русский <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                SC - Sardu <span className="ml-1 italic"></span>
              </DropdownMenuItem>
              <DropdownMenuItem className="pointer-events-none text-gray-400">
                TR - Türkçe <span className="ml-1 italic"></span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <Link href="/about">
          <DropdownMenuItem>
            <Info className="mr-2 size-4" /> About
          </DropdownMenuItem>
        </Link>

        <Link href="/help">
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 size-4" /> Help
          </DropdownMenuItem>
        </Link>

        <Link href="/privacy">
          <DropdownMenuItem>
            <BookLock className="mr-2 size-4" /> Privacy
          </DropdownMenuItem>
        </Link>
        <Link href="/support-us">
          <DropdownMenuItem>
            <HeartHandshake className="mr-2 size-4" /> Support Us
          </DropdownMenuItem>
        </Link>

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
