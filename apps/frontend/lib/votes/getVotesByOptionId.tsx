import React from "react";

export default async function getVotesByOptionId({
  optionId,
}: {
  optionId: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/votes/option/${optionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GET /votes/option/${optionId} failed: ${res.status} ${text}`
    );
  }
  return res.json();
}
