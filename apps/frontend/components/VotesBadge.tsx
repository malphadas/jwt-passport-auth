import React from "react";
import getVotesByOptionId from "@/lib/votes/getVotesByOptionId";

export default async function VotesBadge({ optionId }: { optionId: string }) {
  const voteCount = await getVotesByOptionId({ optionId });
  return (
    <div className="rounded border px-2 py-1 bg-gray-200 text-sm">
      <span>{voteCount}</span>
    </div>
  );
}
