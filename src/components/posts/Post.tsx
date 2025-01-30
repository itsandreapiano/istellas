"use client";

import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import { PostData } from "@/lib/types";
import { formatRelativeDate, cn } from "@/lib/utils";

import { Media } from "@prisma/client";

import calculateTimeAgo from "@/services/timeAgo";

import { useSession } from "@/app/(main)/SessionProvider";

import Linkify from "../Linkify";

import UserAvatar from "../UserAvatar";
import PostMoreButton from "./PostMoreButton";
import UserTooltip from "../UserTooltip";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import Comments from "../comments/Comments";

import { MessageCircle } from "lucide-react";
interface PostProps {
  post: PostData;
}
const Post = ({ post }: PostProps) => {
  const { user } = useSession();

  const [showComments, setShowComments] = React.useState(false);

  const timeAgo = calculateTimeAgo(post.createdAt, formatRelativeDate, {
    includeSeconds: false,
  });

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium"
              >
                {post.user.displayName}{" "}
                {post.user.username === "andreapiano" && "♔"}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && <PostMoreButton post={post} />}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.id),
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
            showComments={showComments}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user.id,
            ),
          }}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  );
};

export default Post;

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    // Rewrite correct URL for production, as uploadthing generates a different root link when we upload from production.
    // const rewriteUploadthingURL = (url: string) => {
    //   if (url && /^https:\/\/[a-z0-9\-]+\.ufs\.sh/.test(url)) {
    //     return url.replace(
    //       /^https:\/\/[a-z0-9\-]+\.ufs\.sh/,
    //       "https://utfs.io",
    //     );
    //   }
    //   return url;
    // };

    // const imageUrl = rewriteUploadthingURL(media.url);

    return (
      <div className="mx-auto mt-2">
        <Image
          src={media.url}
          alt="Attachment"
          width={500}
          height={500}
          priority
          className="mx-auto h-auto max-h-screen w-auto rounded-2xl mobile:max-h-[30rem] mobile:w-full mobile:object-contain"
        />
      </div>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
  showComments: boolean;
}

const CommentButton = ({ post, onClick, showComments }: CommentButtonProps) => {
  return (
    <button
      onClick={onClick}
      title={`${(!showComments && "View") || "Hide"} comments`}
      className="flex items-center gap-1.5"
    >
      <MessageCircle className="size-5" />
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
      </span>
    </button>
  );
};
