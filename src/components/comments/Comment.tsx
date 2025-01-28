import { CommentData } from "@/lib/types";

import Link from "next/link";

import { formatRelativeDate } from "@/lib/utils";

import calculateTimeAgo from "@/services/timeAgo";

import { useSession } from "@/app/(main)/SessionProvider";

import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import CommentMoreButton from "./CommentMoreButton";

interface CommentProps {
  comment: CommentData;
}

// Link (or other super long text cases) protection when shared in a comment
const LONG_WORD_THRESHOLD = 30;

const formatContent = (content: string) => {
  return content.split(" ").map((word, index) =>
    word.length > LONG_WORD_THRESHOLD ? (
      <span key={index} className="break-all">
        {word}
      </span>
    ) : (
      word + " "
    ),
  );
};

const Comment = ({ comment }: CommentProps) => {
  const { user } = useSession();

  const timeAgo = calculateTimeAgo(comment.createdAt, formatRelativeDate, {
    includeSeconds: true,
  });

  return (
    <div className="group/comment flex gap-2.5 py-3">
      <span className="size-8 flex-shrink-0">
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>

      <div className="flex w-full">
        <div className="flex-grow overflow-hidden">
          <div className="flex flex-col justify-start text-sm">
            <UserTooltip user={comment.user}>
              <Link
                href={`/users/${comment.user.username}`}
                className="text-sm font-medium"
              >
                {comment.user.displayName}
              </Link>
            </UserTooltip>
          </div>
          <div className="mb-[-1px] flex-shrink-0 whitespace-pre-line break-words text-sm">
            {formatContent(comment.content)}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {timeAgo}
          </span>
        </div>
        <div className="ms-auto flex justify-end pl-1 mobile:pl-2">
          {(comment.user.id === user.id && (
            <CommentMoreButton
              comment={comment}
              className="transition-opacity"
            />
          )) || <span className="w-9" />}
        </div>
      </div>
    </div>
  );
};

export default Comment;
