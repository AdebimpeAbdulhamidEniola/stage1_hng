// src/utils/errorhandler.utils.ts
import { Request, Response, NextFunction } from "express";
import { sendError } from "./response.utils";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  sendError(res, 500, "Internal server error");
};