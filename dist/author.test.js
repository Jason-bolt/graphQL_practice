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
const authorQueries_1 = require("./graphql/authorQueries");
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
    (0, mocha_1.describe)("AUTHORS", () => {
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
        (0, mocha_1.it)("Get all authors", async () => {
            const res = await resolvers_1.resolvers.Query.authors(authorQueries_1.authors);
            expect(res.data).to.be.an("array");
            expect(res.status).to.be.eq(200);
        });
        (0, mocha_1.it)("Get one author (With correct ID)", async () => {
            const ID = "63e2566c25d2c8351630ea57";
            console.log(typeof ID);
            const res = await resolvers_1.resolvers.Query.author(authorQueries_1.author, {
                id: ID,
            });
            expect(res.data).to.be.an("object");
            expect(res.status).to.be.eql(200);
        });
        (0, mocha_1.it)("Get one author (With wrong ID)", async () => {
            const ID = "63e2566c25d2c8351630ea56";
            console.log(typeof ID);
            const res = await resolvers_1.resolvers.Query.author(authorQueries_1.author, {
                id: ID,
            });
            expect(res.data).to.be.eql(null);
            expect(res.status).to.be.eql(404);
        });
        (0, mocha_1.it)("Get one author (Server error)", async () => {
            const ID = "63e2566c25d2c8351630ea5";
            console.log(typeof ID);
            const res = await resolvers_1.resolvers.Query.author(authorQueries_1.author, {
                id: ID,
            });
            expect(res.data).to.be.eql(null);
            expect(res.status).to.be.eql(500);
        });
    });
});
