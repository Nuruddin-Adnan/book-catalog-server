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
exports.WishlistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const searcher_1 = __importDefault(require("../../../shared/searcher"));
const wishlist_model_1 = require("./wishlist.model");
const addToWishlist = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || !payload) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid User or Data');
    }
    const findWishlist = yield wishlist_model_1.Wishlist.findOne({
        user: userId,
        book: payload.book,
    });
    if (findWishlist) {
        throw new ApiError_1.default(http_status_1.default.IM_USED, 'Already added to wishlist');
    }
    const result = yield wishlist_model_1.Wishlist.create(payload);
    return result;
});
const getAllWishlists = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const conditions = (0, searcher_1.default)(filters, []);
    const { limit = 0, skip, fields, sort } = queries;
    const resultQuery = wishlist_model_1.Wishlist.find(conditions)
        .skip(skip)
        .select(fields)
        .sort(sort)
        .limit(limit);
    const [result, total] = yield Promise.all([
        resultQuery.exec(),
        wishlist_model_1.Wishlist.countDocuments(conditions),
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
const myWishlists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.find({ user: id }).populate('book');
    return result;
});
const removeFromWishlist = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findWishlist = yield wishlist_model_1.Wishlist.findById(id);
    if (findWishlist && (findWishlist === null || findWishlist === void 0 ? void 0 : findWishlist.user.toString()) !== userId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You are not authorized to delete the wishlist');
    }
    const result = yield wishlist_model_1.Wishlist.findOneAndDelete({ _id: id });
    return result;
});
exports.WishlistService = {
    addToWishlist,
    getAllWishlists,
    myWishlists,
    removeFromWishlist,
};
