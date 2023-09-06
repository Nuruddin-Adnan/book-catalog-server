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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const queryFilters_1 = __importDefault(require("../../../shared/queryFilters"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const _b = req.body, { reviews } = _b, payload = __rest(_b, ["reviews"]);
    payload.author = userId;
    const result = yield book_service_1.BookService.createBook(userId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book create successfully!',
        data: result,
    });
}));
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = req.params.id;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const review = req.body;
    review.reviewedBy = userId;
    review.reviewdate = new Date();
    const result = yield book_service_1.BookService.createReview(id, review);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book review successfully!',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, queryFilters_1.default)(req.query, req);
    const result = yield book_service_1.BookService.getAllBooks(filters.filters, filters.queries);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully!',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const { id } = req.params;
    const _e = req.body, { reviews } = _e, updatedData = __rest(_e, ["reviews"]);
    const result = yield book_service_1.BookService.updateBook(id, userId, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book update successfully !',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    const { id } = req.params;
    const result = yield book_service_1.BookService.deleteBook(id, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book delete successfully !',
        data: result,
    });
}));
exports.BookController = {
    createReview,
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
