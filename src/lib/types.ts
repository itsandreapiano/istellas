import { Prisma } from "@prisma/client";

export const postDataInclude = {
  user: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
      // Future reminder:
      // I could include the DOB here, to have the zodiac sign symbol next to the username in the posts.
    },
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
