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
exports.MyReadinglistController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const queryFilters_1 = __importDefault(require("../../../shared/queryFilters"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const myReadingList_service_1 = require("./myReadingList.service");
const createMyReadinglist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const payload = req.body; // send book id and status
    payload.user = userId;
    const result = yield myReadingList_service_1.MyReadinglistService.createMyReadinglist(userId, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My reading list create successfully!',
        data: result,
    });
}));
const getAllMyReadinglists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, queryFilters_1.default)(req.query, req);
    const result = yield myReadingList_service_1.MyReadinglistService.getAllMyReadinglists(filters.filters, filters.queries);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Reading lists retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getMyReadinglists = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    const result = yield myReadingList_service_1.MyReadinglistService.getMyReadinglists(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My reading list retrieved successfully!',
        data: result,
    });
}));
const updateMyReadinglist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { id } = req.params;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const updatedData = req.body;
    const result = yield myReadingList_service_1.MyReadinglistService.updateMyReadinglist(id, userId, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My reading list update successfully !',
        data: result,
    });
}));
const deleteMyReadinglist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
    const { id } = req.params;
    const result = yield myReadingList_service_1.MyReadinglistService.deleteMyReadinglist(id, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Delete my reading list successfully!',
        data: result,
    });
}));
exports.MyReadinglistController = {
    createMyReadinglist,
    getAllMyReadinglists,
    getMyReadinglists,
    updateMyReadinglist,
    deleteMyReadinglist,
};
