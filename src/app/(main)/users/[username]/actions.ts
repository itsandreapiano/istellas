"use server";

import { getUserDataSelect } from "@/lib/types";

import prisma from "@/lib/prisma";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validation";

import { validateRequest } from "@/auth";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: validatedValues,
    select: getUserDataSelect(user.id),
  });

  return updatedUser;
}
