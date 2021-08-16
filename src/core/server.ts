import app from "../app";
import express, {ErrorRequestHandler} from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import {errorLogger, errorResponder} from "./errorMiddleware";

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/docs/openapi.json"
    }
}));

app.use(errorLogger as ErrorRequestHandler);
app.use(errorResponder as ErrorRequestHandler);

export {app};