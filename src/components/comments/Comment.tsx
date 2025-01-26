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

const Comment = ({ comment }: CommentProps) => {
  const { user } = useSession();

  const timeAgo = calculateTimeAgo(comment.createdAt, formatRelativeDate, {
    includeSeconds: true,
  });

  return (
    <div className="group/comment flex gap-3 py-3">
      <span className="size-8 flex-shrink-0 mobile:size-auto">
        <UserTooltip user={comment.user}>
          <Link href={`/users/${comment.user.username}`}>
            <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
          </Link>
        </UserTooltip>
      </span>

      <div className="overflow-hidden">
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className="font-medium"
            >
              {comment.user.displayName}
            </Link>
          </UserTooltip>
          <span className="text-muted-foreground">{timeAgo}</span>
        </div>
        <div className="w-96 flex-shrink-0">{comment.content}</div>
      </div>
      {(comment.user.id === user.id && (
        <CommentMoreButton
          comment={comment}
          className="ms-auto transition-opacity"
        />
      )) || <span className="w-10" />}
    </div>
  );
};

export default Comment;
