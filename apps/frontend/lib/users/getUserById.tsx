import React from "react";

export default async function getUserById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}
