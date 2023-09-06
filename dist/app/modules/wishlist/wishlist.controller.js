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
exports.WishlistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const queryFilters_1 = __importDefault(require("../../../shared/queryFilters"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const wishlist_service_1 = require("./wishlist.service");
const addToWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const payload = req.body; // send book id
    payload.user = userId;
    const result = yield wishlist_service_1.WishlistService.addToWishlist(userId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Add to wishlist successfully!',
        data: result,
    });
}));
const getAllWishlists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, queryFilters_1.default)(req.query, req);
    const result = yield wishlist_service_1.WishlistService.getAllWishlists(filters.filters, filters.queries);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const myWishlists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const result = yield wishlist_service_1.WishlistService.myWishlists(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist retrieved successfully!',
        data: result,
    });
}));
const removeFromWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const { id } = req.params;
    const result = yield wishlist_service_1.WishlistService.removeFromWishlist(id, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Remove from wishlist successfully!',
        data: result,
    });
}));
exports.WishlistController = {
    addToWishlist,
    getAllWishlists,
    myWishlists,
    removeFromWishlist,
};
