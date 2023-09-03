import { Schema, Types, model } from 'mongoose';
import { GenreModel, IGenre } from './genre.interface';

const GenreSchema = new Schema<IGenre, GenreModel>(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Genre = model<IGenre, GenreModel>('Genre', GenreSchema);
