import {ResourceNotFoundError} from "./error";
import {NextFunction, Request, Response} from "express";
import logger from "./logger";

export const errorLogger = (error: Error | unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        if (!(error instanceof ResourceNotFoundError)) {
            logger.error(error as Error);
        }
    } else if (error instanceof Object || typeof error === "string") {
        logger.error(error);
    } else {
        logger.error(JSON.stringify(error));
    }

    next(error);
}

export const errorResponder = (error: Error | unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ResourceNotFoundError) {
        res.status(400).send({
            timestamp: Date.now().toString(),
            errorMessage: error.message
        });
    } else {
        res.status(500).send({
            timestamp: Date.now().toString(),
            errorMessage: "Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks."
        });
    }
};