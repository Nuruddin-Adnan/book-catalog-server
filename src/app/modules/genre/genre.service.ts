import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IFilters, IQueries } from '../../../interfaces/queryFilters';
import searcher from '../../../shared/searcher';
import { IGenre } from './genre.interface';
import { Genre } from './genre.model';
import { genreSearchableFields } from './genre.constant';

const createGenre = async (id: string, payload: IGenre): Promise<IGenre> => {
  if (!id || !payload) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid User or Data');
  }
  const result = await Genre.create(payload);
  return result;
};

const getAllGenres = async (
  filters: IFilters,
  queries: IQueries,
): Promise<IGenericResponse<IGenre[]>> => {
  const conditions = searcher(filters, genreSearchableFields);
  const { limit = 0, skip, fields, sort } = queries;

  const resultQuery = Genre.find(conditions)
    .skip(skip as number)
    .select(fields as string)
    .sort(sort)
    .limit(limit as number);

  const [result, total] = await Promise.all([
    resultQuery.exec(),
    Genre.countDocuments(conditions),
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

const getSingleGenre = async (id: string): Promise<IGenre | null> => {
  const result = await Genre.findById(id).populate('createdBy');
  return result;
};

const updateGenre = async (
  id: string,
  payload: Partial<IGenre>,
): Promise<IGenre | null> => {
  const result = await Genre.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Genre not found');
  }

  return result;
};

const deleteGenre = async (id: string): Promise<IGenre | null> => {
  const result = await Genre.findOneAndDelete({ _id: id });
  return result;
};

export const GenreService = {
  createGenre,
  getAllGenres,
  getSingleGenre,
  updateGenre,
  deleteGenre,
};
