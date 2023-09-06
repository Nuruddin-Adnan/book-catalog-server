"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    genre: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    imgURL: {
        type: String,
    },
    reviews: [
        {
            reviewedBy: {
                type: mongoose_1.Types.ObjectId,
                ref: 'User', // Reference to the User model
            },
            message: {
                type: String,
                required: true,
            },
            ratings: {
                type: Number,
                required: true,
            },
            reviewdate: {
                type: Date,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Book = (0, mongoose_1.model)('Book', BookSchema);
