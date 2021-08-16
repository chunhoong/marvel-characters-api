import logger from "./logger";
import app from "../app";

const port = Number(process.env.PORT ?? 8080);

app.listen(port, () => logger.info(`Marvel Character API is up and running on port ${port}`));