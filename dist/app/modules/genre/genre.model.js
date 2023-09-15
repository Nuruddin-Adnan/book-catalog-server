"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const mongoose_1 = require("mongoose");
const GenreSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Admin',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
GenreSchema.index({ name: 1 }, { unique: true });
exports.Genre = (0, mongoose_1.model)('Genre', GenreSchema);
