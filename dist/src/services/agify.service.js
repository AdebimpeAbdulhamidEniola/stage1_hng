"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgeData = void 0;
const axios_1 = __importDefault(require("axios"));
const apperror_utils_1 = require("../utils/apperror.utils");
const getAgeData = async (name) => {
    const { data } = await axios_1.default.get(`https://api.agify.io?name=${name}`);
    //age group based classification
    if (!data.age) {
        throw new apperror_utils_1.AppError("Agify returned an invalid response", 502);
    }
    const classifyAgeGroup = (age) => {
        if (age <= 12)
            return "child";
        if (age <= 19)
            return "teenager";
        if (age <= 59)
            return "adult";
        return "senior";
    };
    return {
        age: data.age,
        age_group: classifyAgeGroup(data.age),
    };
};
exports.getAgeData = getAgeData;
