import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const addToWishlist = async (
  userId: string,
  payload: IWishlist,
): Promise<IWishlist> => {
  if (!userId || !payload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid User or Data');
  }

  const findWishlist = await Wishlist.findOne({
    user: userId,
    book: payload.book,
  });

  if (findWishlist) {
    throw new ApiError(httpStatus.IM_USED, 'Already added to wishlist');
  }
  const result = await Wishlist.create(payload);
  return result;
};

const getAllWishlists = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IWishlist[]>> => {
  const conditions = searcher(filters, []);
  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Wishlist.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Wishlist.countDocuments(conditions),
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

const myWishlists = async (id: string): Promise<IWishlist[] | null> => {
  const result = await Wishlist.find({ user: id }).populate('book');
  return result;
};

const removeFromWishlist = async (
  id: string,
  userId: string,
): Promise<IWishlist | null> => {
  const findWishlist = await Wishlist.findById(id);

  if (findWishlist && findWishlist?.user.toString() !== userId) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not authorized to delete the wishlist',
    );
  }

  const result = await Wishlist.findOneAndDelete({ _id: id });
  return result;
};

export const WishlistService = {
  addToWishlist,
  getAllWishlists,
  myWishlists,
  removeFromWishlist,
};
