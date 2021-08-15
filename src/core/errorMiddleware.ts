import {ResourceNotFoundError} from "./error";
import {NextFunction, Response} from "express";
import logger from "./logger";

export const errorLogger = (error: Error | unknown, req: Request, res: Response, next: NextFunction) => {
    /**
     * Split into multiple condition blocks due to type checking of pinoJS.
     */
    if (error instanceof Error && !(error instanceof ResourceNotFoundError)) {
        logger.error(error as Error);
    } else if (error instanceof Object) {
        logger.error(error as Object);
    } else if (typeof error === "string") {
        logger.error(error as string);
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