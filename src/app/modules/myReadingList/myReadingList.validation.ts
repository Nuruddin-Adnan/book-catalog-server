import mongoose from 'mongoose';
import { z } from 'zod';
import { myReadingListstatus } from './myReadingList.constant';

const createMyReadinglistZodSchema = z.object({
  body: z.object({
    book: z.string().refine(
      value => {
        return mongoose.Types.ObjectId.isValid(value);
      },
      {
        message: 'Invalid ObjectId',
      },
    ),
    status: z.enum([...myReadingListstatus] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

const updateMyReadinglistZodSchema = z.object({
  body: z.object({
    book: z
      .string()
      .refine(
        value => {
          return mongoose.Types.ObjectId.isValid(value);
        },
        {
          message: 'Invalid ObjectId',
        },
      )
      .optional(),
    status: z
      .enum([...myReadingListstatus] as [string, ...string[]])
      .optional(),
  }),
});

export const MyReadinglistValidation = {
  createMyReadinglistZodSchema,
  updateMyReadinglistZodSchema,
};
