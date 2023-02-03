import Author from "../models/Authors";
import Book from "../models/Books";
import { ObjectId } from "mongodb";

interface IAuthor {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  createdAt: Date;
}

interface IBook {
  _id: ObjectId;
  title: string;
  pages: number;
  author: IAuthor;
}

interface IResolvers {
  Query: object;
  Mutation: object;
  Book: object;
}

const resolvers: IResolvers = {
  Query: {
    // Authors Query
    authors: async (): Promise<IAuthor[]> => {
      return await Author.find();
    },
    author: async (_: void, { id }): Promise<IAuthor> => {
      return await Author.findOne({ _id: id });
    },
    // Books Query
    books: async (): Promise<IBook[]> => {
      return await Book.find();
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
    createAuthor: async (_: void, { input }): Promise<IAuthor> => {
      const { first_name, last_name } = input;
      const newAuthor = await Author.create({
        first_name: first_name,
        last_name: last_name,
      });
      return newAuthor;
    },

    editAuthor: async (_: void, { id, input }): Promise<IAuthor> => {
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
    deleteAuthor: async (_: void, { id }): Promise<Boolean> => {
      const isDeleted = await Author.deleteOne({ _id: id });
      if (isDeleted) {
        return true;
      }
      return false;
    },

    // Books Mutations
    createBook: async (_: void, { input }): Promise<any> => {
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
