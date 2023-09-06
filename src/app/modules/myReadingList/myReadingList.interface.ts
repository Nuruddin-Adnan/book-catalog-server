import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export type IMyReadingList = {
  _id: Types.ObjectId;
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
  status: 'reading' | 'plan to read' | 'finished reading';
};

export type MyReadingListModel = Model<IMyReadingList, Record<string, unknown>>;
