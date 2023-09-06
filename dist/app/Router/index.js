"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const genre_route_1 = require("../modules/genre/genre.route");
const book_route_1 = require("../modules/book/book.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const myReadingList_route_1 = require("../modules/myReadingList/myReadingList.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/genres',
        route: genre_route_1.GenreRoutes,
    },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/wishlists',
        route: wishlist_route_1.WishlistRoutes,
    },
    {
        path: '/my-reading-lists',
        route: myReadingList_route_1.MyReadinglistRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
