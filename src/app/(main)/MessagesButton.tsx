"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import { MessageCountInfo } from "@/lib/types";

import kyInstance from "@/lib/ky";

import { Button } from "@/components/ui/button";

import { Mail } from "lucide-react";

interface MessagesButtonProps {
  initialState: MessageCountInfo;
}

const MessagesButton = ({ initialState }: MessagesButtonProps) => {
  const { data } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: () =>
      kyInstance.get("/api/messages/unread-count").json<MessageCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Messages"
      asChild
    >
      <Link href="/messages">
        <div className="relative">
          <Mail />
          {!!data.unreadCount && (
            <span
              className={`absolute -right-1 -top-1 rounded-full bg-astro-red ${
                data.unreadCount < 10 ? "px-[4.6px]" : "-right-2.5 px-[4.5px]"
              } text-[8.5px] text-xs font-medium tabular-nums text-white`}
            >
              {data.unreadCount > 9
                ? "9+"
                : data.unreadCount > 0
                  ? data.unreadCount
                  : null}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">Messages</span>
      </Link>
    </Button>
  );
};

export default MessagesButton;
