import React from "react";
import { User } from "@prisma/client";

export default async function getUsers(): Promise<User[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const data = await response.json();
  return data;
}
