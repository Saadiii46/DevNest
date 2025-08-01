"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { avatarPlaceHolder } from "@/constants";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handleError } from "../handleError";

export const getUserByEmail = async (email: string) => {
  try {
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", [email])]
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    handleError(error, "Failed to fetch user email");
  }
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  try {
    const exisitingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email });

    if (!accountId) throw new Error("Failed to send email OTP");

    if (!exisitingUser) {
      const { databases } = await createAdminClient();

      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          avatar: avatarPlaceHolder,
          accountId,
        }
      );
    }

    return parseStringify({ accountId });
  } catch (error) {
    handleError(error, "Failed to create account");
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();

    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", [result.$id])]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    if (error instanceof Error && error.message === "Session not found") {
      return null;
    }
  }
};

export const signOutUser = async () => {
  try {
    const { account } = await createSessionClient();

    if (!account) {
      console.error("Account not found");
      redirect("/sign-in");
    }
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const exisitingUser = await getUserByEmail(email);

    if (!exisitingUser) throw new Error("User not found please sign up");

    await sendEmailOTP({ email });
    return parseStringify({ accountId: exisitingUser.accountId });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
