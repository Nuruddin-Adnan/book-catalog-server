import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { GenreController } from './genre.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { GenreValidation } from './genre.validation';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(GenreValidation.createGenreZodSchema),
  GenreController.createGenre,
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(GenreValidation.updateGenreZodSchema),
  GenreController.updateGenre,
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), GenreController.getSingleGenre);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), GenreController.deleteGenre);
router.get('/', GenreController.getAllGenres);

export const GenreRoutes = router;
