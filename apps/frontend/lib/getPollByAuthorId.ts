import { Poll } from "@prisma/client";

export default async function getPollByAuthorId(
  authorId: string
): Promise<Poll[] | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/polls/author/${authorId}`
  );
  const data = await response.json();
  return data;
}
