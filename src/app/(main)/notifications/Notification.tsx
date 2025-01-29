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
      icon: <UsersRound className="text-astro-gold size-6" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: "commented on your post.",
      icon: (
        <MessageCircle className="text-astro-green fill-astro-green size-6" />
      ),
      href: `/posts/${notification.postId}`,
    },
    LIKE: {
      message: "liked your post.",
      icon: <Heart className="text-astro-red fill-astro-red size-6" />,
      href: `/posts/${notification.postId}`,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  return (
    <Link href={href} className="block">
      <article
        className={cn(
          "flex gap-3 rounded-2xl bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/20",
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
