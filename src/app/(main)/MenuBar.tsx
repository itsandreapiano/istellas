import Link from "next/link";

import prisma from "@/lib/prisma";

import { validateRequest } from "@/auth";

import { Button } from "@/components/ui/button";
import NotificationsButton from "./NotificationsButton";
import AvatarButton from "./AvatarButton";

import { Home, DraftingCompass, Send } from "lucide-react";

interface MenuBarProps {
  className?: string;
}

const MenuBar = async ({ className }: MenuBarProps) => {
  const { user } = await validateRequest();

  if (!user) return null;

  const unreadNotificationCount = await prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

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
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        <Link href="/messages">
          <Send className="size-[25px]" />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </Button>
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
        initialState={{ unreadCount: unreadNotificationCount }}
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
