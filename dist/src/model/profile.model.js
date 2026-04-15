"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileById = exports.findAllProfiles = exports.createProfile = exports.findProfileById = exports.findProfileByName = void 0;
// src/model/profile.model.ts
const prisma_1 = require("../lib/prisma");
// find profile by name — used for idempotency check
const findProfileByName = async (name) => {
    return await prisma_1.prisma.profile.findUnique({
        where: { name },
    });
};
exports.findProfileByName = findProfileByName;
// find profile by id — used for GET /api/profiles/:id
const findProfileById = async (id) => {
    return await prisma_1.prisma.profile.findUnique({
        where: { id },
    });
};
exports.findProfileById = findProfileById;
// create a new profile — used for POST /api/profiles
const createProfile = async (data) => {
    return await prisma_1.prisma.profile.create({ data });
};
exports.createProfile = createProfile;
// find all profiles with optional filters — used for GET /api/profiles
const findAllProfiles = async (filters) => {
    return await prisma_1.prisma.profile.findMany({
        where: {
            ...(filters.gender && {
                gender: { equals: filters.gender, mode: "insensitive" },
            }),
            ...(filters.country_id && {
                country_id: { equals: filters.country_id, mode: "insensitive" },
            }),
            ...(filters.age_group && {
                age_group: { equals: filters.age_group, mode: "insensitive" },
            }),
        },
        select: {
            id: true,
            name: true,
            gender: true,
            age: true,
            age_group: true,
            country_id: true
        }
    });
};
exports.findAllProfiles = findAllProfiles;
// delete profile by id — used for DELETE /api/profiles/:id
const deleteProfileById = async (id) => {
    return await prisma_1.prisma.profile.delete({
        where: { id },
    });
};
exports.deleteProfileById = deleteProfileById;
