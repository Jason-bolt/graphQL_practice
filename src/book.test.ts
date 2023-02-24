import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { Server } from "./server";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import Author from "./models/Authors";
import Book from "./models/Books";
import { book, books, createBook, editBook } from "./graphql/bookQueries";
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

    it("Get specific book (With wrong ID)", async () => {
      const ID = "63e27e11f53a3768a67c72f6";
      const res = await resolvers.Query.book(book, { id: ID });
      expect(res.data).to.be.eq(null);
      expect(res.status).to.be.eq(404);
    });

    it("Get specific book (ID does not exist)", async () => {
      const res = await resolvers.Query.book(book, { id: null });
      expect(res.data).to.be.eq(null);
      expect(res.message).to.be.eq("ID is missing!");
      expect(res.status).to.be.eq(404);
    });
    
    it("Get specific book (Wrong ID count - Server error)", async () => {
      const ID = "63e27e11f53a3768a67c72f";
      const res = await resolvers.Query.book(book, { id: ID });
      expect(res.data).to.be.eq(null);
      expect(res.status).to.be.eq(500);
    });

    it("Edit Book", async () => {
      const ID = "63e27e11f53a3768a67c72f5";
      const res = await resolvers.Mutation.editBook(editBook, {
        id: ID,
        input: {
          title: "Beginning",
          pages: 5
        },
      });
      expect(res).to.be.an("object");
      expect(res.status).to.be.eql(200);
      expect(res.data).to.be.an("object");
    });

    // it("Edit author (Wrong ID count)", async () => {
    //   const ID = "63e2566c25d2c8351630ea5";
    //   const res = await resolvers.Mutation.editAuthor(editAuthor, {
    //     id: ID,
    //     input: {
    //       first_name: "Jason",
    //       last_name: "Appiatu",
    //     },
    //   });
    //   expect(res).to.be.an("object");
    //   expect(res.status).to.be.eql(500);
    //   expect(res.data).to.be.eql(null);
    // });

    // it("Edit author (No ID)", async () => {
    //   const ID = "";
    //   const res = await resolvers.Mutation.editAuthor(editAuthor, {
    //     id: ID,
    //     input: {
    //       first_name: "Jason",
    //       last_name: "Appiatu",
    //     },
    //   });
    //   expect(res).to.be.an("object");
    //   expect(res.status).to.be.eql(404);
    //   expect(res.data).to.be.eql(null);
    // });

    // // it("Delete author (Correct ID)", async () => {
    // //   const ID = "63e6571e27c7290fd13be034";
    // //   const res = await resolvers.Mutation.deleteAuthor(deleteAuthor, {
    // //     id: ID,
    // //   });
    // //   expect(res).to.be.an("object");
    // //   expect(res.status).to.be.eql(200);
    // //   expect(res.data).to.be.eql(null);
    // // });

    // it("Delete author (Wrong ID)", async () => {
    //   const ID = "63e656e9231f37ca3807bd7g";
    //   const res = await resolvers.Mutation.deleteAuthor(deleteAuthor, {
    //     id: ID,
    //   });
    //   expect(res).to.be.an("object");
    //   expect(res.status).to.be.eql(500);
    //   expect(res.data).to.be.eql(null);
    // });

    // it("Delete author (No ID)", async () => {
    //   const ID = "";
    //   const res = await resolvers.Mutation.deleteAuthor(deleteAuthor, {
    //     id: ID,
    //   });
    //   expect(res).to.be.an("object");
    //   expect(res.status).to.be.eql(404);
    //   expect(res.data).to.be.eql(null);
    // });
  });
});
