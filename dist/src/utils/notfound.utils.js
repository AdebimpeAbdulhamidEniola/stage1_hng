"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const response_utils_1 = require("./response.utils");
const notFoundHandler = (req, res) => {
    (0, response_utils_1.sendError)(res, 404, `Route ${req.originalUrl} not found`);
};
exports.notFoundHandler = notFoundHandler;
