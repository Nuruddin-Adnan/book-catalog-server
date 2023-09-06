"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const addToWishlistZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string().refine(value => {
            return mongoose_1.default.Types.ObjectId.isValid(value);
        }, {
            message: 'Invalid ObjectId',
        }),
    }),
});
exports.WishlistValidation = {
    addToWishlistZodSchema,
};
