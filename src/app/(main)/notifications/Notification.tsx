import { NotificationData } from "@/lib/types";

import Link from "next/link";

import { NotificationType } from "@prisma/client";
import { cn, formatRelativeDate } from "@/lib/utils";

import UserAvatar from "@/components/UserAvatar";

import { Heart, MessageCircle, UsersRound } from "lucide-react";

interface NotificationProps {
  notification: NotificationData;
}

const Notification = ({ notification }: NotificationProps) => {
  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string }
  > = {
    FOLLOW: {
      message: "started following you.",
      icon: <UsersRound className="size-6 text-astro-gold" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: "commented on your post.",
      icon: (
        <MessageCircle className="size-6 fill-astro-green text-astro-green" />
      ),
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: "liked your post.",
      icon: <Heart className="size-6 fill-astro-red text-astro-red" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-yellow-600/15",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="space-y-3">
          <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
          <div>
            <span className="font-bold">{notification.issuer.displayName}</span>{" "}
            <span>{message}</span>
          </div>
          {notification.post && notification.type === "LIKE" && (
            <div className="line-clamp-1 whitespace-pre-line text-sm text-muted-foreground">
              {notification.post.content}
            </div>
          )}
          {notification.createdAt && (
            <span className="block text-xs !font-medium text-muted-foreground">
              {formatRelativeDate(notification.createdAt)}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Notification;
