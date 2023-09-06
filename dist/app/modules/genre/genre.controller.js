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
exports.GenreController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const queryFilters_1 = __importDefault(require("../../../shared/queryFilters"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const genre_service_1 = require("./genre.service");
const createGenre = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const payload = req.body;
    payload.createdBy = userId;
    const result = yield genre_service_1.GenreService.createGenre(userId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Genre create successfully!',
        data: result,
    });
}));
const getAllGenres = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, queryFilters_1.default)(req.query, req);
    const result = yield genre_service_1.GenreService.getAllGenres(filters.filters, filters.queries);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Genre retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleGenre = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield genre_service_1.GenreService.getSingleGenre(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Genre retrieved successfully!',
        data: result,
    });
}));
const updateGenre = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield genre_service_1.GenreService.updateGenre(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Genre update successfully !',
        data: result,
    });
}));
const deleteGenre = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield genre_service_1.GenreService.deleteGenre(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Genre delete successfully !',
        data: result,
    });
}));
exports.GenreController = {
    createGenre,
    getAllGenres,
    getSingleGenre,
    updateGenre,
    deleteGenre,
};
