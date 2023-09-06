"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const wishlist_controller_1 = require("./wishlist.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const wishlist_validation_1 = require("./wishlist.validation");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), (0, validateRequest_1.default)(wishlist_validation_1.WishlistValidation.addToWishlistZodSchema), wishlist_controller_1.WishlistController.addToWishlist);
router.get('/my-wishlists', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), wishlist_controller_1.WishlistController.myWishlists);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.GENERAL_USER), wishlist_controller_1.WishlistController.removeFromWishlist);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), wishlist_controller_1.WishlistController.getAllWishlists);
exports.WishlistRoutes = router;
