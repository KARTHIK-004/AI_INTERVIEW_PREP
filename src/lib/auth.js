import { cookies } from "next/headers";
import { auth } from "@/firebase/admin";
import { prisma as db } from "@/lib/db";

export async function verifyAdmin() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    return { isAuthenticated: false, isAdmin: false, user: null };
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const firebaseUid = decodedClaims.uid;

    const user = await db.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      return { isAuthenticated: false, isAdmin: false, user: null };
    }

    const isAdmin = user.role === "ADMIN";

    return { isAuthenticated: true, isAdmin, user };
  } catch (error) {
    console.error("Error verifying admin session:", error);
    return { isAuthenticated: false, isAdmin: false, user: null };
  }
}
