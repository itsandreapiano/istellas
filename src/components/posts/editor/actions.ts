"use server";

import { getPostDataInclude } from "@/lib/types";

import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validation";

import { validateRequest } from "@/auth";

const submitPost = async (input: { content: string; mediaIds: string[] }) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(user.id),
  });

  return newPost;
};

export default submitPost;
