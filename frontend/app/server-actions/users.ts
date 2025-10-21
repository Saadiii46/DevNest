"use server";

import {
  createAccount,
  signInUser,
  verifySecret,
} from "@/lib/actions/user.action";

// Creating user account

interface CreateUserAccountProps {
  fullName: string;
  email: string;
}

export const createUserAccount = async ({
  fullName,
  email,
}: CreateUserAccountProps) => {
  return await createAccount({ fullName, email });
};

// Signing up the user

export const signInUsers = async ({ email }: { email: string }) => {
  return await signInUser({ email });
};

// Verify Secret

export const verifyUserSecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  return await verifySecret({ accountId, password });
};
