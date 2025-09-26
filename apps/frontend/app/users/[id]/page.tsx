import UserCard from "@/components/UserCard";
import getUserById from "@/lib/users/getUserById";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id); // fetch /api/users/:id
  if (!user) return <div>User not found</div>;
  return <UserCard user={user} />;
}
