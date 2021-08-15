import {ResourceNotFoundError} from "./error";
import {NextFunction, Response} from "express";
import logger from "./logger";

export const errorLogger = (error: Error | unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error || error instanceof Object) {
        logger.error(error);
    } else if (typeof error === "string") {
        logger.error(error);
    } else {
        logger.error(JSON.stringify(error));
    }

    next(error);
}

export const errorResponder = (error: Error | unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ResourceNotFoundError) {
        res.status(400).send({errorMessage: error.message});
        return;
    }

    res.status(500).send({errorMessage: "Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks."});
};