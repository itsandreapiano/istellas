import { Suspense } from "react";

import { Loader2 } from "lucide-react";

import { unstable_cache } from "next/cache";
import Link from "next/link";

import { validateRequest } from "@/auth";

import { getUserDataSelect } from "@/lib/types";

import { formatNumber } from "@/lib/utils";
import prisma from "@/lib/prisma";

import UserAvatar from "./UserAvatar";

import FollowButton from "./FollowButton";
import UserTooltip from "./UserTooltip";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

// Suggestion of new users to be followed
async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 3,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Suggestions</div>

      {usersToFollow.map((user) => (
        <UserTooltip user={user} key={user.id}>
          <div
            key={user.id}
            className="flex items-center justify-between gap-3"
          >
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
              <div>
                <p className="line-clamp-1 break-all font-semibold">
                  {user.displayName}
                  {user.username === "andreapiano" && " ♔"}
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </Link>
            <FollowButton
              userId={user.id}
              initialState={{
                followers: user._count.followers,
                isFollowedByUser: user.followers.some(
                  ({ followerId }) => followerId === user.id,
                ),
              }}
            />
          </div>
        </UserTooltip>
      ))}
    </div>
  );
}

// Reccomended trendy hashtags for the past 3hrs
const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 3
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <div className="block" key={title}>
            <Link href={`/hashtag/${title}`}>
              <p
                className="line-clamp-1 break-all font-semibold text-foreground"
                title={hashtag}
              >
                {hashtag}
              </p>
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TrendsSidebar;
