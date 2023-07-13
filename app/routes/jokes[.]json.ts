import type { LoaderArgs } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderArgs) => {
  const jokes = await db.joke.findMany({
    include: { jokester: { select: { username: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }

  return json(jokes, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/json",
    },
  });
};
