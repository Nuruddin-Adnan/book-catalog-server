"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const mongoose_1 = require("mongoose");
const WishlistSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'Book', // Reference to the Book model
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Wishlist = (0, mongoose_1.model)('Wishlist', WishlistSchema);
