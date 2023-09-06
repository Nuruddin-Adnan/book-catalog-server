"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyReadinglistValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const myReadingList_constant_1 = require("./myReadingList.constant");
const createMyReadinglistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string().refine(value => {
            return mongoose_1.default.Types.ObjectId.isValid(value);
        }, {
            message: 'Invalid ObjectId',
        }),
        status: zod_1.z.enum([...myReadingList_constant_1.myReadingListstatus], {
            required_error: 'Status is required',
        }),
    }),
});
const updateMyReadinglistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z
            .string()
            .refine(value => {
            return mongoose_1.default.Types.ObjectId.isValid(value);
        }, {
            message: 'Invalid ObjectId',
        })
            .optional(),
        status: zod_1.z
            .enum([...myReadingList_constant_1.myReadingListstatus])
            .optional(),
    }),
});
exports.MyReadinglistValidation = {
    createMyReadinglistZodSchema,
    updateMyReadinglistZodSchema,
};
