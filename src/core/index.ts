import logger from "./logger";
import {app} from "./server";

const applicationName = process.env.APPLICATION_NAME ?? "Application";
const port = Number(process.env.PORT ?? 8080);

app.listen(port, () => logger.info(`${applicationName} is up and running on port ${port}`));