import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { Server } from "./server";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import Author from "./models/Authors";
import Book from "./models/Books";
import {
  authors,
  createAuthor,
  author,
  editAuthor,
  deleteAuthor,
} from "./graphql/authorQueries";
dotenv.config();

Server.connectDB(process.env.mongoURI);

const { expect } = chai;
chai.use(chaiHttp);

describe("Testing the book store API created with Apollo Graphql", () => {
  // before(async () => {
  //   await Author.deleteMany({});
  //   await Book.deleteMany({});
  // });
  describe("AUTHORS", () => {
    // it("Creates an Author", async () => {
    //   const res = await resolvers.Mutation.createAuthor(createAuthor, {
    //     input: {
    //       first_name: "Jason",
    //       last_name: "Appiatu",
    //     },
    //   });
    //   expect(res).to.be.an("object");
    //   expect(res.status).to.be.eql(201);
    //   expect(res.data).to.be.an("object");
    // });

    it("Get all authors", async () => {
      const res = await resolvers.Query.authors(authors);
      expect(res.data).to.be.an("array");
      expect(res.status).to.be.eq(200);
    });

    it("Get one author (With correct ID)", async () => {
      const ID = "63e2566c25d2c8351630ea57";
      console.log(typeof ID);
      const res = await resolvers.Query.author(author, {
        id: ID,
      });
      expect(res.data).to.be.an("object");
      expect(res.status).to.be.eql(200);
    });

    it("Get one author (With wrong ID)", async () => {
      const ID = "63e2566c25d2c8351630ea56";
      const res = await resolvers.Query.author(author, {
        id: ID,
      });
      expect(res.data).to.be.eql(null);
      expect(res.status).to.be.eql(404);
    });

    it("Get one author (ID does not exist)", async () => {
      const res = await resolvers.Query.author(author, {
        id: null,
      });
      expect(res.data).to.be.eql(null);
      expect(res.message).to.be.eql("ID is missing!");
      expect(res.status).to.be.eql(404);
    });

    it("Get one author (Wrong ID count - Server error)", async () => {
      const ID = "63e2566c25d2c8351630ea5";
      const res = await resolvers.Query.author(author, {
        id: ID,
      });
      expect(res.data).to.be.eql(null);
      expect(res.status).to.be.eql(500);
    });

    it("Edit author", async () => {
      const ID = "63e2566c25d2c8351630ea57";
      const res = await resolvers.Mutation.editAuthor(editAuthor, {
        id: ID,
        input: {
          first_name: "Jason",
          last_name: "Appiatu",
        },
      });
      expect(res).to.be.an("object");
      expect(res.status).to.be.eql(200);
      expect(res.data).to.be.an("object");
    });

    it("Edit author (Wrong ID count)", async () => {
      const ID = "63e2566c25d2c8351630ea5";
      const res = await resolvers.Mutation.editAuthor(editAuthor, {
        id: ID,
        input: {
          first_name: "Jason",
          last_name: "Appiatu",
        },
      });
      expect(res).to.be.an("object");
      expect(res.status).to.be.eql(500);
      expect(res.data).to.be.eql(null);
    });

    it("Edit author (No ID)", async () => {
      const ID = "";
      const res = await resolvers.Mutation.editAuthor(editAuthor, {
        id: ID,
        input: {
          first_name: "Jason",
          last_name: "Appiatu",
        },
      });
      expect(res).to.be.an("object");
      expect(res.status).to.be.eql(404);
      expect(res.data).to.be.eql(null);
    });

    // it("Delete author (Correct ID)", async () => {
    //   const ID = "63e6571e27c7290fd13be034";
    //   const res = await resolvers.Mutation.deleteAuthor(deleteAuthor, {
    //     id: ID,
    //   });
    //   expect(res).to.be.an("object");
    //   expect(res.status).to.be.eql(200);
    //   expect(res.data).to.be.eql(null);
    // });

    it("Delete author (Wrong ID)", async () => {
      const ID = "63e656e9231f37ca3807bd7g";
      const res = await resolvers.Mutation.deleteAuthor(deleteAuthor, {
        id: ID,
      });
      expect(res).to.be.an("object");
      expect(res.status).to.be.eql(500);
      expect(res.data).to.be.eql(null);
    });

    it("Delete author (No ID)", async () => {
      const ID = "";
      const res = await resolvers.Mutation.deleteAuthor(deleteAuthor, {
        id: ID,
      });
      expect(res).to.be.an("object");
      expect(res.status).to.be.eql(404);
      expect(res.data).to.be.eql(null);
    });
  });
});
