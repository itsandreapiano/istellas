"use client";

import { PostsPage } from "@/lib/types";

import kyInstance from "@/lib/ky";

import { useInfiniteQuery } from "@tanstack/react-query";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";

import { Loader2 } from "lucide-react";

interface UserPostsProps {
  userId: string;
  currentUser: string;
  name: string;
}

const UserPosts = ({ userId, currentUser, name }: UserPostsProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "user-posts", userId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/users/${userId}/posts`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    const message =
      currentUser === userId ? (
        <>
          So far, you haven&apos;t posted anything. <br />
          Share a thought <b>now.</b>
        </>
      ) : (
        <>
          So far, <b>{name}</b> hasn&apos;t posted anything.
        </>
      );

    return <p className="text-center text-muted-foreground">{message}</p>;
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default UserPosts;
