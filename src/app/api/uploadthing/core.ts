import { validateRequest } from "@/auth";

import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";

import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  avatar: f({
    image: { maxFileSize: "8MB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldAvatarUrl = metadata.user.avatarUrl;

      if (oldAvatarUrl) {
        const key = oldAvatarUrl.split(
          `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
        )[1];

        await new UTApi().deleteFiles(key);
      }

      let newAvatarUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      );

      // Fix the link, when change happens from prod
      if (/^https:\/\/[a-z0-9\-]+\.ufs\.sh/.test(newAvatarUrl)) {
        newAvatarUrl = newAvatarUrl.replace(
          /^https:\/\/[a-z0-9\-]+\.ufs\.sh/,
          "https://utfs.io",
        );
      }

      await Promise.all([
        prisma.user.update({
          where: { id: metadata.user.id },
          data: {
            avatarUrl: newAvatarUrl,
          },
        }),
        streamServerClient.partialUpdateUser({
          id: metadata.user.id,
          set: {
            image: newAvatarUrl,
          },
        }),
      ]);

      return { avatarUrl: newAvatarUrl };
    }),
  attachment: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 5 },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      let fixedUrl = file.url.replace(
        "/f/",
        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
      );

      // Fix the link, when change happens from prod
      if (/^https:\/\/[a-z0-9\-]+\.ufs\.sh/.test(fixedUrl)) {
        fixedUrl = fixedUrl.replace(
          /^https:\/\/[a-z0-9\-]+\.ufs\.sh/,
          "https://utfs.io",
        );
      }

      const media = await prisma.media.create({
        data: {
          url: fixedUrl,
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        },
      });

      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
