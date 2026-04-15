// src/utils/response.utils.ts
import { Response } from 'express';

export const sendSuccess = (res: Response, data: object): void => {
  res.status(200).json({
    status: 'success',
    data,
  });
};

export const sendError = (res: Response, statusCode: number, message: string): void => {
  res.status(statusCode).json({
    status: 'error',
    message,
  });
};