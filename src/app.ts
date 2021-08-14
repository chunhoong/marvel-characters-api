import express from "express";
import logger from "./core/logger";
import characterRouter from "./character/characterRouter";
import {config} from "dotenv";
import swaggerUi from "swagger-ui-express";
import path from "path";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/docs/openapi.json"
    }
}))
app.use("/characters", characterRouter);

const PORT = process.env.port ? Number(process.env.port) : 8080;

app.listen(PORT, () => logger.info(`Marvel characters API is up and running on port ${PORT}`));