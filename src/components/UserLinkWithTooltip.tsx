"use client";

import { UserData } from "@/lib/types";

import { PropsWithChildren } from "react";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import kyInstance from "@/lib/ky";
import { HTTPError } from "ky";

import UserTooltip from "./UserTooltip";

interface UserLinkWithTooltipProps extends PropsWithChildren {
  username: string;
}

const UserLinkWithTooltip = ({
  children,
  username,
}: UserLinkWithTooltipProps) => {
  const { data } = useQuery({
    queryKey: ["user-data", username],
    queryFn: () =>
      kyInstance.get(`/api/users/username/${username}`).json<UserData>(),
    retry(failureCount, error) {
      if (error instanceof HTTPError && error.response.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: Infinity,
  });

  if (!data) {
    return (
      <Link href={`/users/${username}`} className="text-primary">
        {children}
      </Link>
    );
  }

  return (
    <UserTooltip user={data}>
      <Link href={`/users/${username}`} className="text-primary">
        {children}
      </Link>
    </UserTooltip>
  );
};

export default UserLinkWithTooltip;
