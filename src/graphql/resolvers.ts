import Author from "../models/Authors";
import Book from "../models/Books";
// import { ObjectId } from "mongodb";
import { Types } from "mongoose";

interface IAuthor {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  createdAt: Date;
}

interface IBook {
  _id: Types.ObjectId;
  title: string;
  pages: number;
  author: object;
}

interface IBookResponse {
  status: number;
  message: string;
  data: IBook[] | IBook | null;
}

interface IAuthorResponse {
  status: number;
  message: string;
  data: IAuthor[] | IAuthor | null;
}

export const resolvers = {
  Query: {
    // Authors Query
    authors: async (_): Promise<IAuthorResponse> => {
      try {
        const allAuthors = await Author.find();
        return {
          status: 200,
          message: "Retrieving all authors",
          data: allAuthors,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },
    author: async (_, { id }): Promise<IAuthorResponse> => {
      try {
        if (!id) {
          return {
            status: 404,
            message: "ID is missing!",
            data: null,
          };
        }
        const author = await Author.findOne({ _id: id });

        if (!author) {
          return {
            status: 404,
            message: "Could not find author!",
            data: null,
          };
        }
        return {
          status: 200,
          message: "Retrieving a particular author",
          data: author,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },
    // Books Query
    books: async (): Promise<IBook[]> => {
      return await Book.find();
    },
    book: async (_, { id }): Promise<IBook> => {
      return await Book.findOne({ _id: id });
    },
  },

  Book: {
    author: async ({ author }): Promise<IAuthor> => {
      const author_id = author.toHexString();
      const bookAuthor = await Author.findOne({ _id: author_id });
      return bookAuthor;
    },
  },

  Mutation: {
    // Authors Mutations
    createAuthor: async (_, { input }): Promise<IAuthor> => {
      const { first_name, last_name } = input;
      const newAuthor = await Author.create({
        first_name: first_name,
        last_name: last_name,
      });
      return newAuthor;
    },

    editAuthor: async (_, { id, input }): Promise<IAuthor> => {
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
    deleteAuthor: async (_, { id }): Promise<Boolean> => {
      const isDeleted = await Author.deleteOne({ _id: id });
      if (isDeleted) {
        await Book.deleteMany({ author: id });
        return true;
      }
      return false;
    },

    // Books Mutations
    createBook: async (_, { input }): Promise<IBook> => {
      const { title, pages, author } = input;
      const newBook = await Book.create({
        title: title,
        pages: pages,
        author: author,
      });

      return newBook;
    },

    editBook: async (_, { id, input }): Promise<IBook> => {
      const { title, pages, author } = input;
      const isEdited = await Book.updateOne(
        { _id: id },
        {
          title: title,
          pages: pages,
          author: author,
        }
      );

      if (isEdited) {
        return Book.findOne({ _id: id });
      }
    },

    deleteBook: async (_: void, { id }): Promise<Boolean> => {
      const isDeleted = await Book.deleteOne({ _id: id });
      if (isDeleted) {
        return true;
      } else {
        return false;
      }
    },
  },
};
