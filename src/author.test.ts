import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { Server } from "./server";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import Author from "./models/Authors";
import Book from "./models/Books";
import { authors, createAuthor, author } from "./graphql/authorQueries";
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
  describe("AUTHORS", () => {
    // it("Creates an Author", async () => {
    //   const res = await resolvers.Mutation.createAuthor(createAuthor, {
    //     input: {
    //       first_name: "Jason",
    //       last_name: "Appiatu",
    //     },
    //   });
    //   expect(res).to.be.an("array");
    //   expect(res.first_name).to.equal("Jason");
    //   expect(res.last_name).to.equal("Appiatu");
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

    it("Get one author (Server error)", async () => {
      const ID = "63e2566c25d2c8351630ea5";
      const res = await resolvers.Query.author(author, {
        id: ID,
      });
      expect(res.data).to.be.eql(null);
      expect(res.status).to.be.eql(500);
    });
  });
});
