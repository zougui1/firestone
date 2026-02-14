import type { db } from "@zougui/firestone.db";

export type Config = Omit<typeof db.config.schema, "_id"> & { _id: string };
