import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IBook, IReviewData } from './book.interface';
import { Book } from './book.model';
import { bookSearchableFields } from './book.constant';
import { Wishlist } from '../wishlist/wishlist.model';
import { MyReadingList } from '../myReadingList/myReadingList.model';

const createBook = async (id: string, payload: IBook): Promise<IBook> => {
  if (!id || !payload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid User or Data');
  }
  const result = await Book.create(payload);
  return result;
};

const createReview = async (
  id: string,
  reviews: IReviewData,
): Promise<IBook> => {
  if (!id || !reviews) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid User or Data');
  }
  const book = await Book.findById(id);

  if (!book) {
    throw new Error('Book not found');
  }

  // Create a new review object and push it into the "reviews" array
  book.reviews!.push(reviews);

  // Save the updated book document
  await book.save();

  return book;
};

const getAllBooks = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IBook[]>> => {
  const { limit = 0, skip, fields, sort, searchFields } = queries;

  // searchable field set
  let searchFieldsArray;

  if (searchFields) {
    searchFieldsArray = searchFields?.split(' ');
  } else {
    searchFieldsArray = bookSearchableFields;
  }

  const conditions = searcher(filters, searchFieldsArray!);

  const resultQuery = Book.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number)
    .populate('author');

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Book.countDocuments(conditions),
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

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('author').populate({
    path: 'reviews.reviewedBy',
    model: 'User',
    select: 'name imgURL',
  });
  return result;
};

const updateBook = async (
  id: string,
  userId: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const findBook = await Book.findById(id);

  if (findBook && findBook?.author.toString() !== userId) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not authorized to update the book',
    );
  }

  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  return result;
};

const deleteBook = async (
  id: string,
  userId: string,
): Promise<IBook | null> => {
  const findBook = await Book.findById(id);

  if (findBook && findBook?.author.toString() !== userId) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You are not authorized to delete the book',
    );
  }

  const result = await Book.findOneAndDelete({ _id: id });
  await Wishlist.deleteMany({ book: id });
  await MyReadingList.deleteMany({ book: id });
  return result;
};

export const BookService = {
  createBook,
  createReview,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
