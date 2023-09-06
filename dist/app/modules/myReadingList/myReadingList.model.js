"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyReadingList = void 0;
const mongoose_1 = require("mongoose");
const myReadingList_constant_1 = require("./myReadingList.constant");
const myReadingListSchema = new mongoose_1.Schema({
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
    status: {
        type: String,
        enum: {
            values: myReadingList_constant_1.myReadingListstatus,
            message: 'status can be `{VALUE}`',
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.MyReadingList = (0, mongoose_1.model)('MyReadingList', myReadingListSchema);
