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
exports.GenreService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const searcher_1 = __importDefault(require("../../../shared/searcher"));
const genre_model_1 = require("./genre.model");
const genre_constant_1 = require("./genre.constant");
const createGenre = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id || !payload) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid User or Data');
    }
    const result = yield genre_model_1.Genre.create(payload);
    return result;
});
const getAllGenres = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const conditions = (0, searcher_1.default)(filters, genre_constant_1.genreSearchableFields);
    const { limit = 0, skip, fields, sort } = queries;
    const resultQuery = genre_model_1.Genre.find(conditions)
        .skip(skip)
        .select(fields)
        .sort(sort)
        .limit(limit);
    const [result, total] = yield Promise.all([
        resultQuery.exec(),
        genre_model_1.Genre.countDocuments(conditions),
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
const getSingleGenre = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield genre_model_1.Genre.findById(id).populate('createdBy');
    return result;
});
const updateGenre = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield genre_model_1.Genre.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Genre not found');
    }
    return result;
});
const deleteGenre = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield genre_model_1.Genre.findOneAndDelete({ _id: id });
    return result;
});
exports.GenreService = {
    createGenre,
    getAllGenres,
    getSingleGenre,
    updateGenre,
    deleteGenre,
};
