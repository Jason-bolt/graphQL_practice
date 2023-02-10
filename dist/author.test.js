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
        //   expect(res).to.be.an("object");
        //   expect(res.status).to.be.eql(201);
        //   expect(res.data).to.be.an("object");
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
            const res = await resolvers_1.resolvers.Query.author(authorQueries_1.author, {
                id: ID,
            });
            expect(res.data).to.be.eql(null);
            expect(res.status).to.be.eql(404);
        });
        (0, mocha_1.it)("Get one author (ID does not exist)", async () => {
            const res = await resolvers_1.resolvers.Query.author(authorQueries_1.author, {
                id: null,
            });
            expect(res.data).to.be.eql(null);
            expect(res.message).to.be.eql("ID is missing!");
            expect(res.status).to.be.eql(404);
        });
        (0, mocha_1.it)("Get one author (Wrong ID count - Server error)", async () => {
            const ID = "63e2566c25d2c8351630ea5";
            const res = await resolvers_1.resolvers.Query.author(authorQueries_1.author, {
                id: ID,
            });
            expect(res.data).to.be.eql(null);
            expect(res.status).to.be.eql(500);
        });
        (0, mocha_1.it)("Edit author", async () => {
            const ID = "63e2566c25d2c8351630ea57";
            const res = await resolvers_1.resolvers.Mutation.editAuthor(authorQueries_1.editAuthor, {
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
        (0, mocha_1.it)("Edit author (Wrong ID count)", async () => {
            const ID = "63e2566c25d2c8351630ea5";
            const res = await resolvers_1.resolvers.Mutation.editAuthor(authorQueries_1.editAuthor, {
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
        (0, mocha_1.it)("Edit author (No ID)", async () => {
            const ID = "";
            const res = await resolvers_1.resolvers.Mutation.editAuthor(authorQueries_1.editAuthor, {
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
        (0, mocha_1.it)("Delete author (Wrong ID)", async () => {
            const ID = "63e656e9231f37ca3807bd7g";
            const res = await resolvers_1.resolvers.Mutation.deleteAuthor(authorQueries_1.deleteAuthor, {
                id: ID,
            });
            expect(res).to.be.an("object");
            expect(res.status).to.be.eql(500);
            expect(res.data).to.be.eql(null);
        });
        (0, mocha_1.it)("Delete author (No ID)", async () => {
            const ID = "";
            const res = await resolvers_1.resolvers.Mutation.deleteAuthor(authorQueries_1.deleteAuthor, {
                id: ID,
            });
            expect(res).to.be.an("object");
            expect(res.status).to.be.eql(404);
            expect(res.data).to.be.eql(null);
        });
    });
});
