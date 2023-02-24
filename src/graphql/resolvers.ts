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
    books: async (_): Promise<IBookResponse> => {
      try {
        const allBooks = await Book.find();
        return {
          status: 200,
          message: "Retrieving all books",
          data: allBooks,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },
    book: async (_, { id }): Promise<IBookResponse> => {
      try {
        if (!id) {
          return {
            status: 404,
            message: "ID is missing!",
            data: null,
          };
        }
        const book = await Book.findOne({ _id: id });

        if (!book) {
          return {
            status: 404,
            message: "Book could not be found!",
            data: null,
          };
        }

        return {
          status: 200,
          message: "Successfully retrieved a book!",
          data: book,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
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
    createAuthor: async (_, { input }): Promise<IAuthorResponse> => {
      try {
        if (!input.first_name || !input.last_name) {
          return {
            status: 404,
            message: "First name and last name are required!",
            data: null,
          };
        }
        const { first_name, last_name } = input;
        const newAuthor = await Author.create({
          first_name: first_name,
          last_name: last_name,
        });

        return {
          status: 201,
          message: "Created a new author!",
          data: newAuthor,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },

    editAuthor: async (_, { id, input }): Promise<IAuthorResponse> => {
      try {
        if (!id || !input.first_name || !input.last_name) {
          return {
            status: 404,
            message: "All fields are required!",
            data: null,
          };
        }
        const { first_name, last_name } = input;
        // Updating author
        await Author.updateOne(
          { _id: id },
          {
            first_name: first_name,
            last_name: last_name,
          }
        );

        const author = await Author.findOne({ _id: id });
        return {
          status: 200,
          message: "Author edited!",
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
    deleteAuthor: async (_, { id }): Promise<IAuthorResponse> => {
      try {
        if (!id) {
          return {
            status: 404,
            message: "ID is required!",
            data: null,
          };
        }
        // Deleting the author
        const isDeleted = await Author.deleteOne({ _id: id });
        if (isDeleted) {
          // Deleting all books of that author
          await Book.deleteMany({ author: id });
          return {
            status: 200,
            message: "Author deleted!",
            data: null,
          };
        }
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },

    // Books Mutations
    createBook: async (_, { input }): Promise<IBookResponse> => {
      const { title, pages, author } = input;

      if (!title || !pages || !author) {
        return {
          status: 404,
          message: "All fields are required!",
          data: null,
        };
      }

      try {
        const newBook = await Book.create({
          title: title,
          pages: pages,
          author: author,
        });

        return {
          status: 200,
          message: "Successfully created a new book!",
          data: newBook,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },

    editBook: async (_, { id, input }): Promise<IBookResponse> => {
      try {
        if (!id || !input.title || !input.pages ) {
          return {
            status: 404,
            message: "All fields are required!",
            data: null,
          };
        }
        const { title, pages } = input;
        await Book.updateOne(
          { _id: id },
          {
            title: title,
            pages: pages,
          }
        );

        const book = await Book.findOne({ _id: id });

        return {
          status: 200,
          message: "Book edited successfully!",
          data: book,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },

    deleteBook: async (_, { id }): Promise<IBookResponse> => {
      try {
        if (!id) {
          return {
            status: 404,
            message: "ID is required!",
            data: null,
          };
        }
        await Book.deleteOne({ _id: id });

        return {
          status: 200,
          message: "Book deleted!",
          data: null,
        };
      } catch (err) {
        return {
          status: 500,
          message: "Encountered an error!",
          data: null,
        };
      }
    },
  },
};
