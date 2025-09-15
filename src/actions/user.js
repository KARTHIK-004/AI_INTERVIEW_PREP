"use server";

import { prisma as db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export const createUser = async (user) => {
  try {
    return await db.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          firebaseUid: user.firebaseUid,
          email: user.email,
          name: user.name,
          imageUrl: user.imageUrl,
          lastLogin: new Date(),
          onboardingCompleted: false,
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: newUser.id,
          action: "USER_CREATED",
          details: `New user created with email: ${user.email}`,
        },
      });

      return newUser;
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (firebaseUid, user) => {
  try {
    return await db.$transaction(async (prisma) => {
      const updatedUser = await prisma.user.update({
        where: { firebaseUid },
        data: {
          email: user.email,
          name: user.name,
          imageUrl: user.imageUrl,
          lastLogin: new Date(),
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: updatedUser.id,
          action: "USER_UPDATED",
          details: `User profile updated.`,
        },
      });

      return updatedUser;
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserByFirebaseUid = async (firebaseUid) => {
  try {
    const user = await db.user.findUnique({
      where: { firebaseUid },
    });
    return user;
  } catch (error) {
    console.error("Error getting user by firebase uid:", error);
    throw error;
  }
};

export const updateOnboardingStatus = async (
  firebaseUid,
  onboardingCompleted
) => {
  try {
    return await db.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({ where: { firebaseUid } });
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = await prisma.user.update({
        where: { firebaseUid },
        data: {
          onboardingCompleted,
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: updatedUser.id,
          action: "ONBOARDING_STATUS_UPDATED",
          details: `Onboarding status updated to: ${onboardingCompleted}`,
        },
      });

      return updatedUser;
    });
  } catch (error) {
    console.error("Error updating onboarding status:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const { isAuthenticated, isAdmin } = await verifyAdmin();

    if (!isAuthenticated || !isAdmin) {
      throw new Error("Unauthorized: Admin access required.");
    }

    const users = await db.user.findMany();
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};
