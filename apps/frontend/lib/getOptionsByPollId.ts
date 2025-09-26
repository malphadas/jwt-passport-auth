import { Option } from "@prisma/client";

export default async function getOptionsByPollId(
  pollId: string
): Promise<Option[] | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/polls/${pollId}/options`
  );
  const data = await response.json();
  return data;
}
