import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Send } from "lucide-react";
import {
  Channel,
  ChannelHeader,
  ChannelHeaderProps,
  MessageInput,
  MessageList,
  useChatContext,
  Window,
} from "stream-chat-react";

interface ChatChannelProps {
  open: boolean;
  openSidebar: () => void;
}

const ChatChannel = ({ open, openSidebar }: ChatChannelProps) => {
  const { channel } = useChatContext();

  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      {!channel && (
        <div className="flex h-screen items-center justify-center p-4 text-center text-sm text-gray-500">
          <h2 className="mb-20 self-center">
            Select a chat to start messaging
          </h2>
        </div>
      )}
      <Channel>
        <Window>
          <CustomChannelHeader openSidebar={openSidebar} />
          <MessageList hideDeletedMessages />
          <div className="pb-1.5">
            <MessageInput grow audioRecordingEnabled />
            <div className="pt-5 text-center mobile:hidden">
              <hr className="text-muted-foreground" />
              <h2 className="flex items-center justify-center p-6 text-sm text-astro-silver">
                iStellas <Send size={19} className="mb-[3px] ml-[5px] pt-1" />
              </h2>
            </div>
          </div>
        </Window>
      </Channel>
    </div>
  );
};

interface CustomChannelHeaderProps extends ChannelHeaderProps {
  openSidebar: () => void;
}

function CustomChannelHeader({
  openSidebar,
  ...props
}: CustomChannelHeaderProps) {
  return (
    <div className="flex items-center">
      <div className="h-full pl-2 pt-2 md:hidden">
        <Button size="icon" variant="ghost" onClick={openSidebar}>
          <ChevronLeft className="size-8" />
        </Button>
      </div>
      <ChannelHeader {...props} />
    </div>
  );
}

export default ChatChannel;
