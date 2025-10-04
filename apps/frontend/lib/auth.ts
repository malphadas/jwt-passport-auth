"use server";

import { redirect } from "next/navigation";
import { FormState, LoginFormSchema, SignupFormSchema } from "./type";
import { createSession, } from "./session";
import { z } from "zod";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validationFields.data),
    }
  );
  if (response.ok) {
    redirect("/auth/signin");
  } else
    return {
      message:
        response.status === 409
          ? "The user already exists!"
          : response.statusText,
    };
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const tree = z.treeifyError(validatedFields.error);
    // mirror your old `fieldErrors` object
    const fieldErrors = {
      email: tree.properties?.email?.errors ?? [],
      password: tree.properties?.password?.errors ?? [],
    } as { email?: string[]; password?: string[] };

    return { error: fieldErrors };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    }
  );

  if (response.ok) {
    const result = await response.json();
    // TODO: Create The Session For Authenticated User.

    await createSession({
      user: {
        id: result.id,
        name: result.name,
        //role: result.role,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    console.log({ result });

    redirect("/");
  } else {
    console.log("RESPONSE NOT OK");
    return {
      message:
        response.status === 401 ? "Invalid Credentials!" : response.statusText,
    };
  }
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: oldRefreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token" + response.statusText);
    }

    const { accessToken, refreshToken } = await response.json();
    // update session with new tokens
    const updateRes = await fetch("http://localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
    });
    if (!updateRes.ok) {
      throw new Error("Failed to update tokens in session");
    }
    return accessToken;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};
