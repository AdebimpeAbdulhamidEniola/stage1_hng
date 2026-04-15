"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenderData = void 0;
const axios_1 = __importDefault(require("axios"));
const apperror_utils_1 = require("../utils/apperror.utils");
const getGenderData = async (name) => {
    const { data } = await axios_1.default.get(`https://api.genderize.io?name=${name}`);
    // edge case check
    if (!data.gender || data.count === 0) {
        throw new apperror_utils_1.AppError("Genderize returned an invalid response", 502);
    }
    return {
        gender: data.gender,
        gender_probability: data.probability,
        sample_size: data.count,
    };
};
exports.getGenderData = getGenderData;
