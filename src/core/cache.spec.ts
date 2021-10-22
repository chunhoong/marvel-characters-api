import redis from "redis";
import {mocked} from "ts-jest/utils";
import cache from "./cache";

jest.mock("redis", () => ({
    RedisClient: {prototype: {}},
    createClient: jest.fn().mockReturnValue({
        on: jest.fn(),
        quit: jest.fn()
    })
}));

describe("cache", () => {

    const mockedRedis = mocked(redis, true);

    it("should initiate connection to redis server", () => {
        cache.connect();
        expect(mockedRedis.createClient).toBeCalledWith(Number(process.env.REDIS_PORT), process.env.REDIS_HOST);
    });

    it("should disconnect connection to redis server", () => {
        cache.connect();
        cache.disconnect();
        expect(cache.getClient().quit).toBeCalled();
    });

});