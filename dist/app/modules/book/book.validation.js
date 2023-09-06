"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Book title is required',
        }),
        description: zod_1.z.string({
            required_error: 'Book description is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Book genre is required',
        }),
        imgURL: zod_1.z.string().optional(),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        imgURL: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
