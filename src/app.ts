import express, {ErrorRequestHandler} from "express";
import characterRouter from "./character/characterRouter";
import path from "path";
import swaggerUi from "swagger-ui-express";
import {errorLogger, errorResponder} from "./core/errorMiddleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/docs/openapi.json"
    }
}));

app.use("/characters", characterRouter);

app.use(errorLogger as ErrorRequestHandler);
app.use(errorResponder as ErrorRequestHandler);


export default app;