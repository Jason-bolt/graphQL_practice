import Author from "../models/Authors.js";
import Book from "../models/Books.js";
const resolvers = {
  Query: {
    // Authors Query
    authors: async () => {
      return await Author.find();
    },
    author: async (_, { id }) => {
      return await Author.findOne({ _id: id });
    },
    // Books Query
    books: async () => {
      return await Book.find();
    },
    book: async (_, { id }) => {
      return await Book.findOne({ _id: id });
    },
  },
  Book: {
    author: async ({ author }) => {
      const author_id = author.toHexString();
      const bookAuthor = await Author.findOne({ _id: author_id });
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
      if (isEdited.acknowledged) {
        return await Author.findOne({ _id: id });
      }
    },
    deleteAuthor: async (_, { id }) => {
      const isDeleted = await Author.deleteOne({ _id: id });
      if (isDeleted.acknowledged) {
        await Book.deleteMany({ author: id });
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
    editBook: async (_, { id, input }) => {
      const { title, pages, author } = input;
      const isEdited = await Book.updateOne(
        { _id: id },
        {
          title: title,
          pages: pages,
          author: author,
        }
      );
      if (isEdited.acknowledged) {
        return Book.findOne({ _id: id });
      }
    },
    deleteBook: async (_, { id }) => {
      const isDeleted = await Book.deleteOne({ _id: id });
      if (isDeleted.acknowledged) {
        return true;
      } else {
        return false;
      }
    },
  },
};
export default resolvers;
