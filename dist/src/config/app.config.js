"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const notfound_utils_1 = require("../utils/notfound.utils");
const errorhandler_utils_1 = require("../utils/errorhandler.utils");
const profile_route_1 = __importDefault(require("../routes/profile.route"));
dotenv_1.default.config();
const createApp = () => {
    const app = (0, express_1.default)();
    app.disable('x-powered-by'); // Hide Express header for security
    app.use(express_1.default.json());
    // Use Morgan logger in development only
    if (process.env.NODE_ENV !== 'production') {
        app.use((0, morgan_1.default)('dev'));
    }
    app.use((0, cors_1.default)({ origin: "*" }));
    //Routes
    app.use("/api/profiles", profile_route_1.default);
    //Not Found Handler
    app.use(notfound_utils_1.notFoundHandler);
    //Error Handler 
    app.use(errorhandler_utils_1.errorHandler);
    return app;
};
exports.createApp = createApp;
