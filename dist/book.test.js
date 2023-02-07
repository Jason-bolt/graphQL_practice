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
    });
});
