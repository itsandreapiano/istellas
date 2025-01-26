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
          <div className="mb-[-1px] flex-shrink-0 text-sm">
            {comment.content}
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {timeAgo}
          </span>
        </div>
        <div className="ms-auto flex justify-end pl-3">
          {(comment.user.id === user.id && (
            <CommentMoreButton
              comment={comment}
              className="transition-opacity"
            />
          )) || <span className="w-10" />}
        </div>
      </div>
    </div>
  );
};

export default Comment;
