import {Response} from "express";

export const mockResponse: Response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis()
} as unknown as Response;