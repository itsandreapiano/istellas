import { CommentsPage, PostData } from "@/lib/types";

import kyInstance from "@/lib/ky";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Button } from "../ui/button";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

import { Loader2 } from "lucide-react";

interface CommentsProps {
  post: PostData;
}

const Comments = ({ post }: CommentsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div>
      <div className="pb-4 pt-1">
        <CommentInput post={post} />
      </div>
      <hr className="text-muted-foreground" />

      {hasNextPage && (
        <Button
          variant="link"
          className="!p-0 text-muted-foreground hover:no-underline"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          View more comments
        </Button>
      )}
      {status === "pending" && (
        <Loader2 className="mx-auto mt-2 animate-spin" />
      )}
      {status === "success" && !comments.length && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          No comments yet.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}
      <div className="divide-y">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
