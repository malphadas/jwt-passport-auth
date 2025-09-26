import { User } from "@prisma/client";
import getUsers from "@/lib/users/getUsers";
import Link from "next/link";

export default async function Home() {
  const usersData: Promise<User[]> = getUsers();

  const users = await usersData;

  return (
    <>
      <h1 className="text-xl font-bold">Users</h1>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="mb-4">
          {users.map((user) => (
            <div key={user.id} className="mb-2">
              <Link href={`/users/${user.id}`}>
                {user.firstName} {user.lastName} (ID: {user.id})
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
