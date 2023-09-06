import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IMyReadingList } from './myReadingList.interface';
import { MyReadingList } from './myReadingList.model';
import { myReadingListSearchableFields } from './myReadingList.constant';

const createMyReadinglist = async (
  userId: string,
  payload: IMyReadingList,
): Promise<IMyReadingList> => {
  if (!userId || !payload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid User or Data');
  }

  const findMyReadingList = await MyReadingList.findOne({
    user: userId,
    book: payload.book,
  });

  if (findMyReadingList) {
    throw new ApiError(httpStatus.IM_USED, 'Already added to my reading list');
  }
  const result = await MyReadingList.create(payload);
  return result;
};

const getAllMyReadinglists = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IMyReadingList[]>> => {
  const conditions = searcher(filters, myReadingListSearchableFields);
  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = MyReadingList.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    MyReadingList.countDocuments(conditions),
  ]);

  const page = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyReadinglists = async (
  id: string,
): Promise<IMyReadingList[] | null> => {
  const result = await MyReadingList.find({ user: id }).populate('book');
  return result;
};

const deleteMyReadinglist = async (
  id: string,
  userId: string,
): Promise<IMyReadingList | null> => {
  const findMyReadingList = await MyReadingList.findById(id);

  if (findMyReadingList && findMyReadingList?.user.toString() !== userId) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not authorized to delete this my reading list',
    );
  }

  const result = await MyReadingList.findOneAndDelete({ _id: id });
  return result;
};

export const MyReadinglistService = {
  createMyReadinglist,
  getAllMyReadinglists,
  getMyReadinglists,
  deleteMyReadinglist,
};
