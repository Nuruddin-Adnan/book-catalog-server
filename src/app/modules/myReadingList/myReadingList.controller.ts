/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import queryFilters from '../../../shared/queryFilters';
import sendResponse from '../../../shared/sendResponse';
import { IMyReadingList } from './myReadingList.interface';
import { MyReadinglistService } from './myReadingList.service';
import { log } from 'winston';

const createMyReadinglist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const payload = req.body; // send book id and status
  payload.user = userId;

  const result = await MyReadinglistService.createMyReadinglist(
    userId,
    payload,
  );

  sendResponse<IMyReadingList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My reading list create successfully!',
    data: result,
  });
});

const getAllMyReadinglists = catchAsync(async (req: Request, res: Response) => {
  const filters = queryFilters(
    req.query as Record<string, string | undefined>,
    req,
  );

  const result = await MyReadinglistService.getAllMyReadinglists(
    filters.filters,
    filters.queries,
  );

  sendResponse<IMyReadingList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reading lists retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getMyReadinglists = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const result = await MyReadinglistService.getMyReadinglists(userId);

  sendResponse<IMyReadingList[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My reading list retrieved successfully!',
    data: result,
  });
});

const updateMyReadinglist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const updatedData = req.body;

  const result = await MyReadinglistService.updateMyReadinglist(
    id,
    userId,
    updatedData,
  );

  sendResponse<IMyReadingList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My reading list update successfully !',
    data: result,
  });
});

const deleteMyReadinglist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const { id } = req.params;
  const result = await MyReadinglistService.deleteMyReadinglist(id, userId);
  sendResponse<IMyReadingList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete my reading list successfully!',
    data: result,
  });
});

export const MyReadinglistController = {
  createMyReadinglist,
  getAllMyReadinglists,
  getMyReadinglists,
  updateMyReadinglist,
  deleteMyReadinglist,
};
