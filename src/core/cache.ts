import {createClient} from "redis";
import {REDIS_HOST, REDIS_PORT} from "../constants/config";
import logger from "./logger";

const redisClient = createClient(Number(REDIS_PORT), REDIS_HOST);

redisClient.on("ready", () => logger.info("Connection to redis is established"));
redisClient.on("error", error => logger.error(error));

export default class Cache {

    /**
     * Set a value to key, with optional TTL (time-to-live)
     * @param key
     * @param value
     * @param ttl time-to-live in seconds
     */
    static set(key: string, value: unknown, ttl?: number): Promise<void> {
        if (typeof value != "string") {
            value = JSON.stringify(value);
        }
        return new Promise((resolve, reject) => {
            const cb = (error: Error | null) => {
                if (error) {
                    reject(error)
                } else {
                    resolve();
                }
            };

            if (ttl) {
                redisClient.set(key, value as string, "EX", ttl, cb);
            } else {
                redisClient.set(key, value as string, cb);
            }
        });
    }

    /**
     * <p>Get object from cache by its key.</p>
     * <p>This method ONLY apply to non-primitive type. To get primitive value from cache, use {@link get} to read as string.</p>
     * @param key
     */
    static async getAs<T>(key: string): Promise<T | null> {
        const value = await Cache.get(key);
        return value ? JSON.parse(value) : null;
    }

    /**
     * <p>Get text value from cache by its key.</p>
     * <p>To get the value from cache as object, use {@link getAs} instead.</p>
     * @param key
     */
    static get(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply ?? null);
                }
            });
        });
    }

}