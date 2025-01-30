import * as React from "react";

import { useQueryClient } from "@tanstack/react-query";
import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";

import { cn } from "@/lib/utils";

import { useSession } from "../SessionProvider";

import NewChatDialog from "./NewChatDialog";
import { Button } from "@/components/ui/button";

import { MailPlus } from "lucide-react";

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

const ChatSidebar = ({ open, onClose }: ChatSidebarProps) => {
  const { user } = useSession();

  const queryClient = useQueryClient();

  const { channel } = useChatContext();

  React.useEffect(() => {
    if (channel?.id) {
      queryClient.invalidateQueries({ queryKey: ["unread-messages-count"] });
    }
  }, [channel?.id, queryClient]);

  const ChannelPreviewCustom = React.useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose],
  );

  return (
    <div
      className={cn(
        "size-full flex-col border-e md:flex md:w-72",
        open ? "flex" : "hidden",
      )}
    >
      <MenuHeader onClose={onClose} />
      <ChannelList
        setActiveChannelOnMount={false}
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
};

export default ChatSidebar;

interface MenuHeaderProps {
  onClose: () => void;
}

function MenuHeader({ onClose }: MenuHeaderProps) {
  const [showNewChatDialog, setShowNewChatDialog] = React.useState(false);

  return (
    <>
      <div className="flex items-center gap-3 p-2">
        <div className="h-full md:hidden"></div>
        <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>
        <Button
          size="icon"
          variant="ghost"
          title="Start a new chat"
          onClick={() => setShowNewChatDialog(true)}
        >
          <MailPlus className="size-5" />
        </Button>
      </div>
      {showNewChatDialog && (
        <NewChatDialog
          onOpenChange={setShowNewChatDialog}
          onChatCreated={() => {
            setShowNewChatDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
