import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { resolvers } from "./graphql/resolvers.js";
import { Server } from "./server.js";
import dotenv from "dotenv";
import Author from "./models/Authors.js";
import Book from "./models/Books.js";
import { authors, createAuthor } from "./graphql/authorQueries.js";
dotenv.config();

// Ensuring the database is connected
await Server.connectDB(process.env.mongoURI);

// await mongoose.connect(process.env.mongoURI);

const { expect } = chai;
chai.use(chaiHttp);
describe("Testing the book store API created with Apollo Graphql", () => {
  before(async () => {
    await Author.deleteMany({});
    await Book.deleteMany({});
  });
  describe("AUTHORS", () => {
    it("Creates an Author", async () => {
      const res = await resolvers.Mutation.createAuthor(
        createAuthor,
        {
          input: {
            first_name: "Jason",
            last_name: "Appiatu",
          },
        },
        null
      );
      expect(res).to.be.an("array");
      expect(res.first_name).to.equal("Jason");
      expect(res.last_name).to.equal("Appiatu");
    });
    
    it("Can't create an Author (missing first_name)", async () => {
      const res = await resolvers.Mutation.createAuthor(
        createAuthor,
        {
          input: {
            last_name: "Appiatu",
          },
        },
        null
      );
      expect(res).to.be.an("array");
      expect(res.first_name).to.equal("Jason");
      expect(res.last_name).to.equal("Appiatu");
    });

    it("Get all authors", async () => {
      const res = await resolvers.Query.authors(authors, null, null);
      expect(res).to.be.an("array");
    });
  });
});
