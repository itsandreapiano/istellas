"use client";

import { usePathname } from "next/navigation";

import { useSession } from "./SessionProvider";

import UserAvatar from "@/components/UserAvatar";

const AvatarButton = () => {
  const { user } = useSession();

  const pathname = usePathname();

  const isCurrentUserRoute = pathname === `/users/${user.username}`;

  return (
    <>
      <div className="relative">
        <UserAvatar avatarUrl={user.avatarUrl} size={27} />
        {isCurrentUserRoute && (
          <div className="absolute inset-0 rounded-full border-[1.9px] border-foreground" />
        )}
      </div>
      <span className="ml-[-0.2px] hidden lg:inline">Profile</span>
    </>
  );
};

export default AvatarButton;
