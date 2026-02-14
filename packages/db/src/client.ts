import { MongoClient } from "mongodb";
import Papr from "papr";

import { env } from "@zougui/firestone.env/server";

export const papr = new Papr();
export const client = new MongoClient(env.DATABASE_URL);
