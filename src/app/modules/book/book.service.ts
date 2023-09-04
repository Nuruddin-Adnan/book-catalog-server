import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IBook } from './book.interface';
import { Book } from './book.model';
import { bookSearchableFields } from './book.constant';

const createBook = async (id: string, payload: IBook): Promise<IBook> => {
  if (!id || !payload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid User or Data');
  }
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IBook[]>> => {
  const conditions = searcher(filters, bookSearchableFields);
  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Book.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

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
  const result = await Book.findById(id).populate('author');
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
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
