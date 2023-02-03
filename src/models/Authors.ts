import { Schema, model } from "mongoose";
import Book from "./Books";

interface IAuthor {
  first_name: string;
  last_name: string;
  createdAt: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Author = model<IAuthor>("Author", AuthorSchema);

export default Author;
