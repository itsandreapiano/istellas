import Image from "next/image";

import { cn } from "@/lib/utils";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
  // Increased quality for Google link
  const getHighQualityAvatar = (url: string | null | undefined) => {
    if (!url) return avatarPlaceholder;

    if (url.includes("lh3.googleusercontent.com")) {
      return url.replace(/=s\d+-c$/, "=s1200-c");
    }

    return url;
  };

  return (
    <Image
      src={getHighQualityAvatar(avatarUrl)}
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
