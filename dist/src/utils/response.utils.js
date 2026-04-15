"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
exports.sendError = sendError;
