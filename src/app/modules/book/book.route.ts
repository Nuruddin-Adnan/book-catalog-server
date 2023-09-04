import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);

router.get('/:id', BookController.getSingleBook);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.GENERAL_USER),
  BookController.deleteBook,
);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
