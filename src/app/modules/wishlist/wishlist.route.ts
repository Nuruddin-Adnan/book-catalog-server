import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { WishlistController } from './wishlist.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { WishlistValidation } from './wishlist.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  validateRequest(WishlistValidation.addToWishlistZodSchema),
  WishlistController.addToWishlist,
);

router.get(
  '/my-wishlists',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  WishlistController.myWishlists,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  WishlistController.removeFromWishlist,
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), WishlistController.getAllWishlists);

export const WishlistRoutes = router;
