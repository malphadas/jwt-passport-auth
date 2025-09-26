import React from "react";
import { User, Poll } from "@prisma/client";
import getPollByAuthorId from "@/lib/getPollByAuthorId";
import PollCard from "./PollCard";

export default async function UserCard({ user }: { user: User }) {
  const userId = user.id;
  const pollsData: Promise<Poll[] | null> = getPollByAuthorId(userId);

  const userPolls = await pollsData;

  return (
    <div className="border p-4 mb-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>ID:{user.id}</p>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Role: {user.role}</p>
        <p>Polls: {userPolls ? userPolls.length : 0}</p>
      </div>

      <div className="border rounded grid grid-cols-3">
        <ul>
          {userPolls && userPolls.length > 0 ? (
            userPolls.map((poll) => (
              <li key={poll.id}>
                <PollCard poll={poll} user={user} />
              </li>
            ))
          ) : (
            <li>No polls found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
