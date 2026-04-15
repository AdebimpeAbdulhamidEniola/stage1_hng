"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.getAllProfiles = exports.getProfileById = exports.createUserProfile = void 0;
const response_utils_1 = require("../utils/response.utils");
const genderize_service_1 = require("../services/genderize.service");
const agify_service_1 = require("../services/agify.service");
const nationalize_service_1 = require("../services/nationalize.service");
const uuidv7_1 = require("uuidv7");
const profile_model_1 = require("../model/profile.model");
const createUserProfile = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (name === undefined) {
            return (0, response_utils_1.sendError)(res, 400, "Missing name");
        }
        if (Array.isArray(name) || typeof name !== "string") {
            return (0, response_utils_1.sendError)(res, 422, "Invalid type");
        }
        if (name.trim() === "") {
            return (0, response_utils_1.sendError)(res, 400, "Empty name");
        }
        if (/^\d+$/.test(name.trim())) {
            return (0, response_utils_1.sendError)(res, 422, "Invalid type");
        }
        //idempotency rule
        const existingProfile = await (0, profile_model_1.findProfileByName)(name);
        if (existingProfile) {
            return res.status(200).json({
                "status": "success",
                "message": "Profile already exists",
                "data": existingProfile
            });
        }
        //Call the 3 API service at once to reduce response time
        const [genderData, ageData, nationData] = await Promise.all([
            (0, genderize_service_1.getGenderData)(name),
            (0, agify_service_1.getAgeData)(name),
            (0, nationalize_service_1.getNationData)(name),
        ]);
        const newProfile = await (0, profile_model_1.createProfile)({
            id: (0, uuidv7_1.uuidv7)(),
            name,
            gender: genderData.gender,
            gender_probability: genderData.gender_probability,
            sample_size: genderData.sample_size,
            age: ageData.age,
            age_group: ageData.age_group,
            country_id: nationData.country_id,
            country_probability: nationData.country_probability,
        });
        (0, response_utils_1.sendSuccess)(res, 201, newProfile);
    }
    catch (error) {
        next(error);
    }
};
exports.createUserProfile = createUserProfile;
const getProfileById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const userProfile = await (0, profile_model_1.findProfileById)(id);
        if (!userProfile) {
            return (0, response_utils_1.sendError)(res, 404, "Profile not found");
        }
        return (0, response_utils_1.sendSuccess)(res, 200, userProfile);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfileById = getProfileById;
const getAllProfiles = async (req, res, next) => {
    const { gender, country_id, age_group } = req.query;
    try {
        const profiles = await (0, profile_model_1.findAllProfiles)({
            gender: typeof gender === "string" ? gender : undefined,
            country_id: typeof country_id === "string" ? country_id : undefined,
            age_group: typeof age_group === "string" ? age_group : undefined,
        });
        return res.status(200).json({
            status: "success",
            count: profiles.length,
            data: profiles,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProfiles = getAllProfiles;
const deleteProfile = async (req, res, next) => {
    const { id } = req.params;
    try {
        const userProfile = await (0, profile_model_1.findProfileById)(id);
        if (!userProfile) {
            return (0, response_utils_1.sendError)(res, 404, "Profile not found");
        }
        await (0, profile_model_1.deleteProfileById)(id);
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProfile = deleteProfile;
