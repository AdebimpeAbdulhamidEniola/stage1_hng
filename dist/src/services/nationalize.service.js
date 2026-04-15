"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNationData = void 0;
const axios_1 = __importDefault(require("axios"));
const apperror_utils_1 = require("../utils/apperror.utils");
const getNationData = async (name) => {
    const { data } = await axios_1.default.get(`https://api.nationalize.io?name=${name}`);
    if (!data || !data.country || data.country.length === 0) {
        throw new apperror_utils_1.AppError("Nationalize returned an invalid response", 502);
    }
    //pick the country with the highest probability
    const topCountry = data.country.reduce((prev, curr) => curr.probability > prev.probability ? curr : prev);
    return {
        country_id: topCountry.country_id,
        country_probability: topCountry.probability,
    };
};
exports.getNationData = getNationData;
