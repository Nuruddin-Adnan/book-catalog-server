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
exports.MyReadinglistService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const searcher_1 = __importDefault(require("../../../shared/searcher"));
const myReadingList_model_1 = require("./myReadingList.model");
const myReadingList_constant_1 = require("./myReadingList.constant");
const createMyReadinglist = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId || !payload) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invalid User or Data');
    }
    const findMyReadingList = yield myReadingList_model_1.MyReadingList.findOne({
        user: userId,
        book: payload.book,
    });
    if (findMyReadingList) {
        throw new ApiError_1.default(http_status_1.default.IM_USED, 'Already added to my reading list');
    }
    const result = yield myReadingList_model_1.MyReadingList.create(payload);
    return result;
});
const getAllMyReadinglists = (filters, queries) => __awaiter(void 0, void 0, void 0, function* () {
    const conditions = (0, searcher_1.default)(filters, myReadingList_constant_1.myReadingListSearchableFields);
    const { limit = 0, skip, fields, sort } = queries;
    const resultQuery = myReadingList_model_1.MyReadingList.find(conditions)
        .skip(skip)
        .select(fields)
        .sort(sort)
        .limit(limit);
    const [result, total] = yield Promise.all([
        resultQuery.exec(),
        myReadingList_model_1.MyReadingList.countDocuments(conditions),
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
const getMyReadinglists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield myReadingList_model_1.MyReadingList.find({ user: userId }).populate('book');
    return result;
});
const updateMyReadinglist = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findMyReadingList = yield myReadingList_model_1.MyReadingList.findById(id);
    if (findMyReadingList && (findMyReadingList === null || findMyReadingList === void 0 ? void 0 : findMyReadingList.user.toString()) !== userId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You are not authorized to update this reading list');
    }
    const result = yield myReadingList_model_1.MyReadingList.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Reading list not found');
    }
    return result;
});
const deleteMyReadinglist = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const findMyReadingList = yield myReadingList_model_1.MyReadingList.findById(id);
    if (findMyReadingList && (findMyReadingList === null || findMyReadingList === void 0 ? void 0 : findMyReadingList.user.toString()) !== userId) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You are not authorized to delete this reading list');
    }
    const result = yield myReadingList_model_1.MyReadingList.findOneAndDelete({ _id: id });
    return result;
});
exports.MyReadinglistService = {
    createMyReadinglist,
    getAllMyReadinglists,
    getMyReadinglists,
    updateMyReadinglist,
    deleteMyReadinglist,
};
