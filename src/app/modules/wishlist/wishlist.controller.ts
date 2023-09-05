/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IWishlist } from './wishlist.interface';
import { WishlistService } from './wishlist.service';

const addToWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const payload = req.body; // send book id
  payload.user = userId;

  const result = await WishlistService.addToWishlist(userId, payload);

  sendResponse<IWishlist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Add to wishlist successfully!',
    data: result,
  });
});

const getAllWishlists = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );

  const result = await WishlistService.getAllWishlists(
    filters.filters,
    filters.queries,
  );

  sendResponse<IWishlist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const myWishlists = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const result = await WishlistService.myWishlists(userId);

  sendResponse<IWishlist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrieved successfully!',
    data: result,
  });
});

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  const result = await WishlistService.removeFromWishlist(id, userId);
  sendResponse<IWishlist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove from wishlist successfully!',
    data: result,
  });
});

export const WishlistController = {
  addToWishlist,
  getAllWishlists,
  myWishlists,
  removeFromWishlist,
};
