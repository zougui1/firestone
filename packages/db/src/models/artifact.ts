import { schema, types } from "papr";

import { artifactTypeBaseData } from "@zougui/firestone.war-machines";

import { papr } from "../client";

export const artifact = papr.model(
  "artifacts",
  schema({
    attribute: types.enum(["damage", "health", "armor"] as const, {
      required: true,
    }),
    items: types.objectGeneric(
      types.number({ minimum: 0, required: true }),
      `^${artifactTypeBaseData.list.join("|")}$`,
      { required: true },
    ),
  }),
);

export type Artifact = (typeof artifact)["schema"];
