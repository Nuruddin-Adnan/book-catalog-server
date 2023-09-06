"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const genre_controller_1 = require("./genre.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const genre_validation_1 = require("./genre.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(genre_validation_1.GenreValidation.createGenreZodSchema), genre_controller_1.GenreController.createGenre);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(genre_validation_1.GenreValidation.updateGenreZodSchema), genre_controller_1.GenreController.updateGenre);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), genre_controller_1.GenreController.getSingleGenre);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), genre_controller_1.GenreController.deleteGenre);
router.get('/', genre_controller_1.GenreController.getAllGenres);
exports.GenreRoutes = router;
