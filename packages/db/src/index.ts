import { env } from "@zougui/firestone.env/server";

import { client, papr } from "./client";

(async () => {
  await client.connect();
  papr.initialize(client.db(env.DATABASE_NAME));
  await papr.updateSchemas();
})().catch((error) => {
  console.error("DATABASE CONNECTION ERROR:", error);
});

export * as db from "./exports";
