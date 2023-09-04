import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { GenreService } from './genre.service';
import { IGenre } from './genre.interface';

const createGenre = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const payload = req.body;
  payload.createdBy = userId;

  const result = await GenreService.createGenre(userId, payload);

  sendResponse<IGenre>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre create successfully!',
    data: result,
  });
});

const getAllGenres = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );

  const result = await GenreService.getAllGenres(
    filters.filters,
    filters.queries,
  );

  sendResponse<IGenre[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleGenre = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await GenreService.getSingleGenre(id);

  sendResponse<IGenre>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre retrieved successfully!',
    data: result,
  });
});

const updateGenre = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await GenreService.updateGenre(id, updatedData);

  sendResponse<IGenre>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre update successfully !',
    data: result,
  });
});

const deleteGenre = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GenreService.deleteGenre(id);
  sendResponse<IGenre>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre delete successfully !',
    data: result,
  });
});

export const GenreController = {
  createGenre,
  getAllGenres,
  getSingleGenre,
  updateGenre,
  deleteGenre,
};
