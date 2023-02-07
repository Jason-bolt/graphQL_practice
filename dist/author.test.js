import chai from "chai";
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { resolvers } from "./graphql";
import dotenv from "dotenv";
import Author from "./models/Authors";
import Book from "./models/Books";
import { authors, createAuthor } from "./graphql/authorQueries";
dotenv.config();
const { expect } = chai;
chai.use(chaiHttp);
describe("Testing the book store API created with Apollo Graphql", () => {
    before(async () => {
        await Author.deleteMany({});
        await Book.deleteMany({});
    });
    describe("AUTHORS", () => {
        it("Creates an Author", async () => {
            const res = await resolvers.Mutation.createAuthor(createAuthor, {
                input: {
                    first_name: "Jason",
                    last_name: "Appiatu",
                },
            });
            expect(res).to.be.an("array");
            expect(res.first_name).to.equal("Jason");
            expect(res.last_name).to.equal("Appiatu");
        });
        it("Can't create an Author (missing first_name)", async () => {
            const res = await resolvers.Mutation.createAuthor(createAuthor, {
                input: {
                    last_name: "Appiatu",
                },
            });
            expect(res).to.be.an("array");
            expect(res.first_name).to.equal("Jason");
            expect(res.last_name).to.equal("Appiatu");
        });
        it("Get all authors", async () => {
            const res = await resolvers.Query.authors(authors);
            expect(res).to.be.an("array");
        });
    });
});
