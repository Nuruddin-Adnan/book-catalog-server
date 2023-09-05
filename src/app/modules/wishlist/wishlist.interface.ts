import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export type IWishlist = {
  _id: Types.ObjectId;
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
};

export type WishlistModel = Model<IWishlist, Record<string, unknown>>;
