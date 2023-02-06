import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { resolvers } from "./graphql/resolvers.js";
import Author from "./models/Authors.js";

const { expect } = chai;
chai.use(chaiHttp);
describe("Testing the book store API created with Apollo Graphql", () => {
  describe("AUTHORS", () => {
    it("Get all authors", async () => {
      console.log("Here");
    //   console.log(Author.find());
      const res = await Author.find();
      console.log(res);
      //   expect(3).to.be.equal(4);

      //   expect(res).to.include("_id");
      //   expect(res).to.include("first_name");
      //   expect(res).to.include("last_name");
      //   expect(res).to.include("createdAt");
    });
    // it("Testing mocha", async () => {
    //   console.log("Here");
    //   await expect(3).to.be.equal(3);
    // });
  });
});
