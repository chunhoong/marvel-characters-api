import express from "express";
import logger from "./core/logger";
import characterRouter from "./character/characterRouter";
import {config} from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/characters", characterRouter);

const PORT = process.env.port ? Number(process.env.port) : 8080;

app.listen(PORT, () => logger.info(`Marvel characters API is up and running on port ${PORT}`));