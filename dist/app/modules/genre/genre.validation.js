"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreValidation = void 0;
const zod_1 = require("zod");
const createGenreZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Genre name is required',
        }),
    }),
});
const updateGenreZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
    }),
});
exports.GenreValidation = {
    createGenreZodSchema,
    updateGenreZodSchema,
};
