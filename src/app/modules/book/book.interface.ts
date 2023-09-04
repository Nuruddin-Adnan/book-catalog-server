import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  author: Types.ObjectId | IUser;
  genre: string;
  publicationDate: Date;
  imgURL?: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
