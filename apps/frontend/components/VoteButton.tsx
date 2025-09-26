"use client";
import handleVoteByOptionId from "@/lib/votes/handleVoteByOptionId";

export function VoteButton({
  optionId,
  voterId,
}: {
  optionId: string;
  voterId: string;
}) {
  const onClick = async () => {
    try {
      await handleVoteByOptionId(optionId, voterId);
      // optionally refresh UI, toast, etc.
    } catch (e) {
      console.error(e);
      alert(String(e));
    }
  };
  return <button onClick={onClick}>Vote</button>;
}
