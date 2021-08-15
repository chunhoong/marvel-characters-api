import app from "../app";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import logger from "./logger";

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/docs/openapi.json"
    }
}));

const applicationName = process.env["application.name"] ?? "Application";
const port = Number(process.env["application.server.port"] ?? 8080);

app.listen(port, () => logger.info(`${applicationName} is up and running on port ${port}`));