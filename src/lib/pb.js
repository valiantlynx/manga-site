import PocketBase from "pocketbase";

export const url = process.env.databaseDomain || "http://localhost:3000";

export const pb = new PocketBase(url);
