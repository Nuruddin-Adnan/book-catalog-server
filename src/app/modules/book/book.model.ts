import { Schema, Types, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    imgURL: {
      type: String,
    },
    reviews: [
      {
        reviewedBy: {
          type: Types.ObjectId,
          ref: 'User', // Reference to the User model
        },
        message: {
          type: String,
          required: true,
        },
        ratings: {
          type: Number,
          required: true,
        },
        reviewdate: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
