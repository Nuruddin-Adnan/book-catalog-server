/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';
import { IBook } from './book.interface';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { reviews, ...payload } = req.body;
  payload.author = userId;

  const result = await BookService.createBook(userId, payload);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book create successfully!',
    data: result,
  });
});

const createReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user?._id;
  const review = req.body;
  review.reviewedBy = userId;
  review.reviewdate = new Date();

  const result = await BookService.createReview(id, review);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book review successfully!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );
  const result = await BookService.getAllBooks(
    filters.filters,
    filters.queries,
  );
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'books retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully!',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;

  const { reviews, ...updatedData } = req.body;
  const result = await BookService.updateBook(id, userId, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book update successfully !',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  const result = await BookService.deleteBook(id, userId);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book delete successfully !',
    data: result,
  });
});

export const BookController = {
  createReview,
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
