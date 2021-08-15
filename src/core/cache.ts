import {createClient} from "redis";
import {REDIS_HOST, REDIS_PORT} from "../constants/config";
import logger from "./logger";

const redisClient = createClient(Number(REDIS_PORT), REDIS_HOST);

redisClient.on("ready", () => logger.info("Connection to redis is established"));
redisClient.on("error", error => logger.error(error))

export default class Cache {

    static set(key: string, value: unknown): Promise<void> {
        if (typeof value != "string") {
            value = JSON.stringify(value);
        }
        return new Promise((resolve, reject) => {
            redisClient.set(key, value as string, (error) => {
                if (error) {
                    reject(error)
                }
                resolve();
            });
        });
    }

    static async getAs<T>(key: string): Promise<T | null> {
        const value = await Cache.get(key);
        return value ? JSON.parse(value) : null;
    }

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