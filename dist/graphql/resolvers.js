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
            return await Books_1.default.findOne({ _id: id });
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
            const { first_name, last_name } = input;
            const newAuthor = await Authors_1.default.create({
                first_name: first_name,
                last_name: last_name,
            });
            return newAuthor;
        },
        editAuthor: async (_, { id, input }) => {
            const { first_name, last_name } = input;
            const isEdited = await Authors_1.default.updateOne({ _id: id }, {
                first_name: first_name,
                last_name: last_name,
            });
            if (isEdited) {
                return await Authors_1.default.findOne({ _id: id });
            }
        },
        deleteAuthor: async (_, { id }) => {
            const isDeleted = await Authors_1.default.deleteOne({ _id: id });
            if (isDeleted) {
                await Books_1.default.deleteMany({ author: id });
                return true;
            }
            return false;
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
            const { title, pages, author } = input;
            const isEdited = await Books_1.default.updateOne({ _id: id }, {
                title: title,
                pages: pages,
                author: author,
            });
            if (isEdited) {
                return Books_1.default.findOne({ _id: id });
            }
        },
        deleteBook: async (_, { id }) => {
            const isDeleted = await Books_1.default.deleteOne({ _id: id });
            if (isDeleted) {
                return true;
            }
            else {
                return false;
            }
        },
    },
};
