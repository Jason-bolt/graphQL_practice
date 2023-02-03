import { ObjectId } from "mongodb";
import Author from "../models/Authors.js";
import Book from "../models/Books.js";
const resolvers = {
  Query: {
    // Authors Query
    authors: async () => {
      return await Author.find();
    },
    author: async (_, { id }) => {
      console.log(id);
      return await Author.findOne({ _id: id });
    },
    // Books Query
    books: async () => {
      return await Book.find();
    },
  },
  Book: {
    author: async ({ author }) => {
      const author_id = author.toHexString();
      const bookAuthor = await Author.findOne({ _id: author_id });
      console.log(author_id);
      return bookAuthor;
    },
  },
  Mutation: {
    // Authors Mutations
    createAuthor: async (_, { input }) => {
      const { first_name, last_name } = input;
      const newAuthor = await Author.create({
        first_name: first_name,
        last_name: last_name,
      });
      return newAuthor;
    },
    editAuthor: async (_, { id, input }) => {
      const { first_name, last_name } = input;
      const isEdited = await Author.updateOne(
        { _id: id },
        {
          first_name: first_name,
          last_name: last_name,
        }
      );
      if (isEdited) {
        return await Author.findOne({ _id: id });
      }
    },
    deleteAuthor: async (_, { id }) => {
      const isDeleted = await Author.deleteOne({ _id: id });
      if (isDeleted) {
        return true;
      }
      return false;
    },
    // Books Mutations
    createBook: async (_, { input }) => {
      const { title, pages, author } = input;
      const newBook = await Book.create({
        title: title,
        pages: pages,
        author: author,
      });
      return newBook;
    },
  },
};
export default resolvers;
