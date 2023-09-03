import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

export type IGenre = {
  _id: Types.ObjectId;
  name: string;
  createdBy: Types.ObjectId | IAdmin;
};

export type GenreModel = Model<IGenre, Record<string, unknown>>;
