"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_utils_1 = require("./response.utils");
const apperror_utils_1 = require("./apperror.utils");
const errorHandler = (err, req, res, next) => {
    //specifically for those API calls error
    if (err instanceof apperror_utils_1.AppError) {
        return (0, response_utils_1.sendError)(res, err.statusCode, err.message);
    }
    //other general error
    (0, response_utils_1.sendError)(res, 500, "Internal server error");
};
exports.errorHandler = errorHandler;
