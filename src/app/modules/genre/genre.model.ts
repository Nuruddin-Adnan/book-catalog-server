import { Schema, Types, model } from 'mongoose';
import { GenreModel, IGenre } from './genre.interface';

const GenreSchema = new Schema<IGenre, GenreModel>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

GenreSchema.index({ name: 1 }, { unique: true });

export const Genre = model<IGenre, GenreModel>('Genre', GenreSchema);
