import { Schema, Types, model } from 'mongoose';
import { IMyReadingList, MyReadingListModel } from './myReadingList.interface';
import { myReadingListstatus } from './myReadingList.constant';

const myReadingListSchema = new Schema<IMyReadingList, MyReadingListModel>(
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
    status: {
      type: String,
      enum: {
        values: myReadingListstatus,
        message: 'status can be `{VALUE}`',
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const MyReadingList = model<IMyReadingList, MyReadingListModel>(
  'MyReadingList',
  myReadingListSchema,
);
