import Link from "next/link";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/auth";

import { Button } from "@/components/ui/button";
import NotificationsButton from "./NotificationsButton";
import AvatarButton from "./AvatarButton";

import { Home, DraftingCompass } from "lucide-react";
import MessagesButton from "./MessagesButton";
import streamServerClient from "@/lib/stream";

interface MenuBarProps {
  className?: string;
}

const MenuBar = async ({ className }: MenuBarProps) => {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home className="size-[25px]" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Astro Charts"
        asChild
      >
        <Link href="/astro-charts">
          <DraftingCompass className="size-[25px]" />
          <span className="hidden lg:inline">Astro Charts</span>
        </Link>
      </Button>
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationsCount }}
      />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Profile"
        asChild
      >
        <Link href={`/users/${user.username}`}>
          <AvatarButton />
        </Link>
      </Button>
    </div>
  );
};

export default MenuBar;
