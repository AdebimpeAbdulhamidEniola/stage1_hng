import { sendError } from "./response.utils";
import { AppError } from "./apperror.utils";
export const errorHandler = (err, req, res, next) => {
    //specifically for those API calls error
    if (err instanceof AppError) {
        return sendError(res, err.statusCode, err.message);
    }
    //other general error
    sendError(res, 500, "Internal server error");
};
