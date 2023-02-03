import { Schema, model } from "mongoose";

interface IBook {
  title: string;
  pages: number;
  author: object;
  createdAt: Date;
}

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Book = model<IBook>("Book", BookSchema);

export default Book;
