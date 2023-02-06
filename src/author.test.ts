import chai from "chai";
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { resolvers } from "./graphql";


const { expect } = chai;
chai.use(chaiHttp);

describe("Testing the book store API created with Apollo Graphql", () => {
  describe("AUTHORS", () => {
    it("Get all authors", async () => {
      const res = await resolvers.Query.authors();

      expect(res).to.include("_id");
      expect(res).to.include("first_name");
      expect(res).to.include("last_name");
      expect(res).to.include("createdAt");
    });
  });
});
