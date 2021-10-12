import {createClient, RedisClient} from "redis";
import {REDIS_HOST, REDIS_PORT} from "../constants/config";
import logger from "./logger";

class Cache {

    private redisClient?: RedisClient;

    connect = () => {
        this.redisClient = createClient(Number(REDIS_PORT), REDIS_HOST);
        this.redisClient.on("ready", () => logger.info("Connection to redis is established"));
        this.redisClient.on("error", error => logger.error(error));
    };

    disconnect = (): Promise<void> => {
        return new Promise(resolve => {
            this.getClient().quit(() => resolve());
        });
    };

    /**
     * Set a value to key, with optional TTL (time-to-live)
     * @param key
     * @param value
     * @param ttl time-to-live in seconds
     */
    set = (key: string, value: unknown, ttl?: number): Promise<void> => {
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
                this.getClient().set(key, value as string, "EX", ttl, cb);
            } else {
                this.getClient().set(key, value as string, cb);
            }
        });
    };

    /**
     * <p>Get object from cache by its key.</p>
     * <p>This method ONLY apply to non-primitive type. To get primitive value from cache, use {@link get} to read as string.</p>
     * @param key
     */
    getAs = async <T>(key: string): Promise<T | null> => {
        const value = await this.get(key);
        return value ? JSON.parse(value) : null;
    };

    /**
     * <p>Get text value from cache by its key.</p>
     * <p>To get the value from cache as object, use {@link getAs} instead.</p>
     * @param key
     */
    get = (key: string): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            this.getClient().get(key, (error, reply) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(reply ?? null);
                }
            });
        });
    };

    getClient = (): RedisClient => {
        if (this.redisClient) {
            return this.redisClient;
        } else {
            throw new Error("Connection to Redis is not initiated")
        }
    };

}

export default new Cache();