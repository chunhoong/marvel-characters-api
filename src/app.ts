import express from "express";
import characterRouter from "./character/characterRouter";

const app = express();

app.use("/characters", characterRouter);

export default app;