import {errorLogger, errorResponder} from "./errorMiddleware";
import {ResourceNotFoundError} from "./error";
import logger from "./logger";
import {Request, Response} from "express";
import {mockResponse} from "../__tests__/utilities/handlerUtil";

jest.mock("./logger");

describe("errorMiddleware", () => {

    const next = jest.fn();

    beforeEach(() => {
        (logger.error as jest.Mock).mockReset();
        next.mockReset();
    })

    describe("errorLogger", () => {

        it("should not log when receive ResourceNotFoundError", () => {
            errorLogger(new ResourceNotFoundError(), {} as Request, {} as Response, next);
            expect(logger.error).not.toBeCalled();
            expect(next).toBeCalled();
        });

        it("should log when receive Error", () => {
            const error = new Error();
            errorLogger(error, {} as Request, {} as Response, next);
            expect(logger.error).toBeCalled();
            expect(next).toBeCalled();
        });

        it("should log when receive string value error", () => {
            const errorText = "Random error";
            errorLogger(errorText, {} as Request, {} as Response, next);
            expect(logger.error).toBeCalledWith(errorText);
            expect(next).toBeCalled();
        });

        it("should log when receive other primitive value error", () => {
            const errorFlag = true;
            errorLogger(errorFlag, {} as Request, {} as Response, next);
            expect(logger.error).toBeCalledWith(JSON.stringify(errorFlag));
            expect(next).toBeCalled();
        });

    });

    describe("errorResponder", () => {

        it("should respond status 400 when receive ResourceNotFoundError", () => {
            const errorMessage = "Error message";
            errorResponder(new ResourceNotFoundError(errorMessage), {} as Request, mockResponse, next);
            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledWith(expect.objectContaining({errorMessage}));
            expect(next).not.toBeCalled();
        });

        it("should respond status 500 when receive anonymous value", () => {
            errorResponder(new Error(), {} as Request, mockResponse, next);
            expect(mockResponse.status).toBeCalledWith(400);
            expect(mockResponse.send).toBeCalledWith(expect.objectContaining({
                errorMessage: "Oh no! Something bad happened. Please come back later when we fixed that problem. Thanks."
            }));
            expect(next).not.toBeCalled();
        });

    });

})