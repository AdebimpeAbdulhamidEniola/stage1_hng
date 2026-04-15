import { sendError } from "./response.utils";
export const notFoundHandler = (req, res) => {
    sendError(res, 404, `Route ${req.originalUrl} not found`);
};
