import { Schema, Types, model } from 'mongoose';
import { IWishlist, WishlistModel } from './wishlist.interface';

const WishlistSchema = new Schema<IWishlist, WishlistModel>(
  {
    book: {
      type: Types.ObjectId,
      required: true,
      ref: 'Book', // Reference to the Book model
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Wishlist = model<IWishlist, WishlistModel>(
  'Wishlist',
  WishlistSchema,
);
