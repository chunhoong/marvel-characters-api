import logger from "./logger";
import app from "../app";
import cache from "./cache";

const port = Number(process.env.PORT ?? 8080);

cache.connect();

const server = app.listen(port, () => logger.info(`Marvel Character API is up and running on port ${port}`));

process.on("SIGTERM", () => {
    logger.info("Shutting down Marvel Character API");
    server.close(async () => {
        logger.info("Marvel Character API is closed");
        await cache.disconnect();
    });
});