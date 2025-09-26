import React from "react";
import { Poll, User } from "@prisma/client";
import getOptionsByPollId from "@/lib/getOptionsByPollId";
import getTagsByPollId from "@/lib/getTagsByPollId";
import { VoteButton } from "./VoteButton";
import VotesBadge from "./VotesBadge";

export default async function PollCard({
  poll,
  user,
}: {
  poll: Poll;
  user: User;
}) {
  const OptionsData = getOptionsByPollId(poll.id);
  const TagsData = getTagsByPollId(poll.id);

  const [options, tags] = await Promise.all([OptionsData, TagsData]);

  return (
    <div className="border p-4 mb-4">
      <h2>{poll.title}</h2>
      <p>
        Created by: {user.firstName} {user.lastName}
      </p>
      <p>Options:</p>
      <ul className="flex flex-row gap-2">
        {(options ?? []).map((option) => (
          <div key={option.id} className="border p-2 flex flex-col">
            <li>{option.text},</li>
            <VoteButton optionId={option.id} voterId={user.id} />
            <VotesBadge optionId={option.id} />
          </div>
        ))}
      </ul>
      <p>{(tags ?? []).map((tag) => tag.name).join(", ")}</p>
    </div>
  );
}
