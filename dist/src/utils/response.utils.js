export const sendSuccess = (res, statusCode, data) => {
    res.status(statusCode).json({
        status: 'success',
        data,
    });
};
export const sendError = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
