import { env } from "process";

export const REDIS_HOST = env["redis.host"];
export const REDIS_PORT = env["redis.port"];

export const MARVEL_API_PRIVATE_KEY = env["marvel.api.privateKey"];
export const MARVEL_API_PUBLIC_KEY = env["marvel.api.publicKey"];
export const MARVEL_API_URL = env["marvel.api.url"];