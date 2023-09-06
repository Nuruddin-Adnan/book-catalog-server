"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyReadinglistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const myReadingList_controller_1 = require("./myReadingList.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const myReadingList_validation_1 = require("./myReadingList.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequest_1.default)(myReadingList_validation_1.MyReadinglistValidation.createMyReadinglistZodSchema), myReadingList_controller_1.MyReadinglistController.createMyReadinglist);
router.get('/my-reading-lists', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), myReadingList_controller_1.MyReadinglistController.getMyReadinglists);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequest_1.default)(myReadingList_validation_1.MyReadinglistValidation.updateMyReadinglistZodSchema), myReadingList_controller_1.MyReadinglistController.updateMyReadinglist);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), myReadingList_controller_1.MyReadinglistController.deleteMyReadinglist);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), myReadingList_controller_1.MyReadinglistController.getAllMyReadinglists);
exports.MyReadinglistRoutes = router;
