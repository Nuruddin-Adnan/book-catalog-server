import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MyReadinglistController } from './myReadingList.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { MyReadinglistValidation } from './myReadingList.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  validateRequest(MyReadinglistValidation.createMyReadinglistZodSchema),
  MyReadinglistController.createMyReadinglist,
);

router.get(
  '/my-reading-list',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  MyReadinglistController.getMyReadinglists,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  validateRequest(MyReadinglistValidation.updateMyReadinglistZodSchema),
  MyReadinglistController.updateMyReadinglist,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  MyReadinglistController.deleteMyReadinglist,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  MyReadinglistController.getAllMyReadinglists,
);

export const MyReadinglistRoutes = router;
