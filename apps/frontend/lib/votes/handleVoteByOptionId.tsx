import React from "react";

export default async function handleVoteByOptionId(
  optionId: string,
  voterId: string
) {
  const body = {
    voterId: voterId,
    optionId: optionId,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    // your schema has @@unique([voterId, optionId, pollId])
    throw new Error("You already voted on this option for this poll.");
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST /votes failed: ${res.status} ${text}`);
  }
  return res.json();
}
