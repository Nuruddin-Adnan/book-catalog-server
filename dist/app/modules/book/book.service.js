"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const searcher_1 = __importDefault(require("../../../shared/searcher"));
const book_model_1 = require("./book.model");
const book_constant_1 = require("./book.constant");
const createBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || !payload) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid User or Data');
    }
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const createReview = (id, reviews) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || !reviews) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid User or Data');
    }
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
        throw new Error('Book not found');
    }
    // Create a new review object and push it into the "reviews" array
    book.reviews.push(reviews);
    // Save the updated book document
    yield book.save();
    return book;
});
const getAllBooks = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const conditions = (0, searcher_1.default)(filters, book_constant_1.bookSearchableFields);
    const { limit = 0, skip, fields, sort } = queries;
    const resultQuery = book_model_1.Book.find(conditions)
        .skip(skip)
        .select(fields)
        .sort(sort)
        .limit(limit);
    const [result, total] = yield Promise.all([
        resultQuery.exec(),
        book_model_1.Book.countDocuments(conditions),
    ]);
    const page = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id).populate('author').populate({
        path: 'reviews.reviewedBy',
        model: 'User',
        select: 'name imgURL',
    });
    return result;
});
const updateBook = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findBook = yield book_model_1.Book.findById(id);
    if (findBook && (findBook === null || findBook === void 0 ? void 0 : findBook.author.toString()) !== userId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You are not authorized to update the book');
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
    }
    return result;
});
const deleteBook = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findBook = yield book_model_1.Book.findById(id);
    if (findBook && (findBook === null || findBook === void 0 ? void 0 : findBook.author.toString()) !== userId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You are not authorized to delete the book');
    }
    const result = yield book_model_1.Book.findOneAndDelete({ _id: id });
    return result;
});
exports.BookService = {
    createBook,
    createReview,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
