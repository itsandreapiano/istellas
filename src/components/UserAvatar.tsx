import Image from "next/image";

import { cn } from "@/lib/utils";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
  // Rewrite correct URL for production, as uploadthing generates a different root link when we upload from production.
  const rewriteUploadthingURL = (url: string | null | undefined) => {
    if (url && /^https:\/\/[a-z0-9\-]+\.ufs\.sh/.test(url)) {
      return url.replace(/^https:\/\/[a-z0-9\-]+\.ufs\.sh/, "https://utfs.io");
    }
    return url;
  };

  const imageUrl = rewriteUploadthingURL(avatarUrl);

  return (
    <Image
      src={imageUrl || avatarPlaceholder}
      alt="User avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
};

export default UserAvatar;
