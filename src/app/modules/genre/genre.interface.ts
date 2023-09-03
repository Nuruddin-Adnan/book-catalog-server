import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IGenre = {
  _id: Types.ObjectId;
  name: string;
  createdBy: Types.ObjectId | IUser;
};

export type GenreModel = Model<IGenre, Record<string, unknown>>;
