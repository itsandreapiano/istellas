"use client";

import { NotificationCountInfo } from "@/lib/types";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import kyInstance from "@/lib/ky";

import { Button } from "@/components/ui/button";

import { Bell } from "lucide-react";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
}

const NotificationsButton = ({ initialState }: NotificationsButtonProps) => {
  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      kyInstance
        .get("/api/notifications/unread-count")
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  //   Testing counter
  // data.unreadCount = 5;

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Notifications"
      asChild
    >
      <Link href="/notifications">
        <div className="relative">
          <Bell />
          <span
            className={`bg-astro-red absolute -right-1 -top-1 rounded-full ${
              data.unreadCount < 10 ? "px-[4.6px]" : "-right-2.5 px-[4.5px]"
            } text-[8.5px] text-xs font-medium tabular-nums text-white`}
          >
            {data.unreadCount > 9
              ? "9+"
              : data.unreadCount > 0
                ? data.unreadCount
                : null}
          </span>
        </div>
        <span className="hidden lg:inline">Notifications</span>
      </Link>
    </Button>
  );
};

export default NotificationsButton;
