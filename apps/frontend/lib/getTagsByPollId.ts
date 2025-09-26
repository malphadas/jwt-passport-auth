import React from "react";
import { Tag } from "@prisma/client";

export default async function getTagsByPollId(pollId: string): Promise<Tag[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/tags`
  );
  const data = await response.json();
  return data;
}
