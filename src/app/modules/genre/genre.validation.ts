import { z } from 'zod';

const createGenreZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Genre name is required',
    }),
  }),
});

const updateGenreZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const UserValidation = {
  createGenreZodSchema,
  updateGenreZodSchema,
};
