import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Book title is required',
    }),
    description: z.string({
      required_error: 'Book description is required',
    }),
    genre: z.string({
      required_error: 'Book genre is required',
    }),
    imgURL: z.string().optional(),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    genre: z.string().optional(),
    imgURL: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
