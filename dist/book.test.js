"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const server_1 = require("./server");
const resolvers_1 = require("./graphql/resolvers");
const dotenv_1 = __importDefault(require("dotenv"));
const bookQueries_1 = require("./graphql/bookQueries");
// import typeDefs from "./graphql/typeDefs";
dotenv_1.default.config();
server_1.Server.connectDB(process.env.mongoURI);
// Server.connectApollo(typeDefs, resolvers)
const { expect } = chai_1.default;
chai_1.default.use(chai_http_1.default);
(0, mocha_1.describe)("Testing the book store API created with Apollo Graphql", () => {
    // before(async () => {
    //   await Author.deleteMany({});
    //   await Book.deleteMany({});
    // });
    (0, mocha_1.describe)("BOOKS", () => {
        // it("Create a book", async () => {
        //   const res = await resolvers.Mutation.createBook(createBook, {
        //     input: {
        //       title: "My new book",
        //       pages: 30,
        //       author: "63e2566c25d2c8351630ea57",
        //     },
        //   });
        //   expect(res.data).to.be.an("object");
        //   expect(res.status).to.be.eql(200);
        // });
        (0, mocha_1.it)("Get all books", async () => {
            const res = await resolvers_1.resolvers.Query.books(bookQueries_1.books);
            expect(res.data).to.be.an("array");
            expect(res.status).to.be.eql(200);
        });
        // it("Get specific book", async () => {
        //   const ID = "63e27e11f53a3768a67c72f5";
        //   const res = await resolvers.Query.book(book, { id: ID });
        //   expect(res.data).to.be.an("object");
        //   expect(res.status).to.be.eq(200);
        // });
        (0, mocha_1.it)("Get specific book (With wrong ID)", async () => {
            const ID = "63e27e11f53a3768a67c72f6";
            const res = await resolvers_1.resolvers.Query.book(bookQueries_1.book, { id: ID });
            expect(res.data).to.be.eq(null);
            expect(res.status).to.be.eq(404);
        });
        (0, mocha_1.it)("Get specific book (ID does not exist)", async () => {
            const res = await resolvers_1.resolvers.Query.book(bookQueries_1.book, { id: null });
            expect(res.data).to.be.eq(null);
            expect(res.message).to.be.eq("ID is missing!");
            expect(res.status).to.be.eq(404);
        });
        (0, mocha_1.it)("Get specific book (Wrong ID count - Server error)", async () => {
            const ID = "63e27e11f53a3768a67c72f";
            const res = await resolvers_1.resolvers.Query.book(bookQueries_1.book, { id: ID });
            expect(res.data).to.be.eq(null);
            expect(res.status).to.be.eq(500);
        });
        // it("Edit Book", async () => {
        //   const ID = "63e27e11f53a3768a67c72f5";
        //   const res = await resolvers.Mutation.editBook(editBook, {
        //     id: ID,
        //     input: {
        //       title: "Beginning",
        //       pages: 5
        //     },
        //   });
        //   expect(res).to.be.an("object");
        //   expect(res.status).to.be.eql(200);
        //   expect(res.data).to.be.an("object");
        // });
        (0, mocha_1.it)("Edit book (Wrong ID count)", async () => {
            const ID = "63e27e11f53a3768a67c72f";
            const res = await resolvers_1.resolvers.Mutation.editBook(bookQueries_1.editBook, {
                id: ID,
                input: {
                    title: "Beginning",
                    pages: 5
                },
            });
            expect(res).to.be.an("object");
            expect(res.status).to.be.eql(500);
            expect(res.data).to.be.eql(null);
        });
        (0, mocha_1.it)("Edit book (No ID)", async () => {
            const ID = "";
            const res = await resolvers_1.resolvers.Mutation.editBook(bookQueries_1.editBook, {
                id: ID,
                input: {
                    title: "Beginning",
                    pages: 5
                },
            });
            expect(res).to.be.an("object");
            expect(res.status).to.be.eql(404);
            expect(res.data).to.be.eql(null);
        });
        // it("Delete book (Correct ID)", async () => {
        //   const ID = "63e27e11f53a3768a67c72f5";
        //   const res = await resolvers.Mutation.deleteBook(deleteBook, {
        //     id: ID,
        //   });
        //   expect(res).to.be.an("object");
        //   expect(res.status).to.be.eql(200);
        //   expect(res.data).to.be.eql(null);
        // });
        (0, mocha_1.it)("Delete book (Wrong ID)", async () => {
            const ID = "63e27df8ab191c645edded2";
            const res = await resolvers_1.resolvers.Mutation.deleteBook(bookQueries_1.deleteBook, {
                id: ID,
            });
            expect(res).to.be.an("object");
            expect(res.status).to.be.eql(500);
            expect(res.data).to.be.eql(null);
        });
        (0, mocha_1.it)("Delete book (No ID)", async () => {
            const ID = "";
            const res = await resolvers_1.resolvers.Mutation.deleteBook(bookQueries_1.deleteBook, {
                id: ID,
            });
            expect(res).to.be.an("object");
            expect(res.status).to.be.eql(404);
            expect(res.data).to.be.eql(null);
        });
    });
});
