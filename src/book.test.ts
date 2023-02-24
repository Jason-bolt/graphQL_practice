import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { Server } from "./server";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import Author from "./models/Authors";
import Book from "./models/Books";
import { book, books, createBook } from "./graphql/bookQueries";
// import typeDefs from "./graphql/typeDefs";
dotenv.config();

Server.connectDB(process.env.mongoURI);
// Server.connectApollo(typeDefs, resolvers)

const { expect } = chai;
chai.use(chaiHttp);

describe("Testing the book store API created with Apollo Graphql", () => {
  // before(async () => {
  //   await Author.deleteMany({});
  //   await Book.deleteMany({});
  // });

  describe("BOOKS", () => {
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

    it("Get all books", async () => {
      const res = await resolvers.Query.books(books);
      expect(res.data).to.be.an("array");
      expect(res.status).to.be.eql(200);
    });

    it("Get specific book", async () => {
      const ID = "63e27e11f53a3768a67c72f5";
      const res = await resolvers.Query.book(book, { id: ID });
      expect(res.data).to.be.an("object");
      expect(res.status).to.be.eq(200);
    });
  });
});
