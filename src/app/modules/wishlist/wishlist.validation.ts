import mongoose from 'mongoose';
import { z } from 'zod';

const addToWishlistZodSchema = z.object({
  body: z.object({
    book: z.string().refine(
      value => {
        return mongoose.Types.ObjectId.isValid(value);
      },
      {
        message: 'Invalid ObjectId',
      },
    ),
  }),
});

export const WishlistValidation = {
  addToWishlistZodSchema,
};
