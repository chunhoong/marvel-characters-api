import express from "express";
import logger from "./core/logger";
import characterRouter from "./character/characterRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/characters", characterRouter);

const PORT = process.env.port ? Number(process.env.port) : 3000;

app.listen(PORT, () => logger.info(`Marvel characters API is up and running on port ${PORT}`));