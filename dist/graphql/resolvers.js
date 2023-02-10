"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Authors_1 = __importDefault(require("../models/Authors"));
const Books_1 = __importDefault(require("../models/Books"));
exports.resolvers = {
    Query: {
        // Authors Query
        authors: async (_) => {
            try {
                const allAuthors = await Authors_1.default.find();
                return {
                    status: 200,
                    message: "Retrieving all authors",
                    data: allAuthors,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        author: async (_, { id }) => {
            try {
                if (!id) {
                    return {
                        status: 404,
                        message: "ID is missing!",
                        data: null,
                    };
                }
                const author = await Authors_1.default.findOne({ _id: id });
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
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        // Books Query
        books: async (_) => {
            try {
                const allBooks = await Books_1.default.find();
                return {
                    status: 200,
                    message: "Retrieving all books",
                    data: allBooks,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        book: async (_, { id }) => {
            try {
                if (!id) {
                    return {
                        status: 404,
                        message: "ID is missing!",
                        data: null,
                    };
                }
                const book = await Books_1.default.findOne({ _id: id });
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
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
    },
    Book: {
        author: async ({ author }) => {
            const author_id = author.toHexString();
            const bookAuthor = await Authors_1.default.findOne({ _id: author_id });
            return bookAuthor;
        },
    },
    Mutation: {
        // Authors Mutations
        createAuthor: async (_, { input }) => {
            try {
                if (!input.first_name || !input.last_name) {
                    return {
                        status: 404,
                        message: "First name and last name are required!",
                        data: null,
                    };
                }
                const { first_name, last_name } = input;
                const newAuthor = await Authors_1.default.create({
                    first_name: first_name,
                    last_name: last_name,
                });
                return {
                    status: 201,
                    message: "Created a new author!",
                    data: newAuthor,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        editAuthor: async (_, { id, input }) => {
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
                await Authors_1.default.updateOne({ _id: id }, {
                    first_name: first_name,
                    last_name: last_name,
                });
                const author = await Authors_1.default.findOne({ _id: id });
                return {
                    status: 200,
                    message: "Author edited!",
                    data: author,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        deleteAuthor: async (_, { id }) => {
            try {
                if (!id) {
                    return {
                        status: 404,
                        message: "ID is required!",
                        data: null,
                    };
                }
                // Deleting the author
                const isDeleted = await Authors_1.default.deleteOne({ _id: id });
                if (isDeleted) {
                    // Deleting all books of that author
                    await Books_1.default.deleteMany({ author: id });
                    return {
                        status: 200,
                        message: "Author deleted!",
                        data: null,
                    };
                }
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        // Books Mutations
        createBook: async (_, { input }) => {
            const { title, pages, author } = input;
            if (!title || !pages || !author) {
                return {
                    status: 404,
                    message: "All fields are required!",
                    data: null,
                };
            }
            try {
                const newBook = await Books_1.default.create({
                    title: title,
                    pages: pages,
                    author: author,
                });
                return {
                    status: 200,
                    message: "Successfully created a new book!",
                    data: newBook,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        editBook: async (_, { id, input }) => {
            try {
                if (!input.title || !input.pages || !input.author) {
                    return {
                        status: 404,
                        message: "All fields are required!",
                        data: null,
                    };
                }
                const { title, pages, author } = input;
                await Books_1.default.updateOne({ _id: id }, {
                    title: title,
                    pages: pages,
                    author: author,
                });
                const book = await Books_1.default.findOne({ _id: id });
                return {
                    status: 200,
                    message: "Book edited successfully!",
                    data: book,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
        deleteBook: async (_, { id }) => {
            try {
                if (!id) {
                    return {
                        status: 404,
                        message: "ID is required!",
                        data: null,
                    };
                }
                await Books_1.default.deleteOne({ _id: id });
                return {
                    status: 200,
                    message: "Book deleted!",
                    data: null,
                };
            }
            catch (err) {
                return {
                    status: 500,
                    message: "Encountered an error!",
                    data: null,
                };
            }
        },
    },
};
