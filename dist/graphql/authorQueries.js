"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.author = exports.authors = exports.createAuthor = void 0;
exports.createAuthor = `mutation createAuthor($input: AuthorInput!) {
    createAuthor(input: $input){
      first_name
    }
  }`;
exports.authors = `query authors {
    authors {
      _id
      first_name
      last_name
      createdAt
    }
  }`;
exports.author = `query Author($authorId: ID!) {
  author(id: $authorId) {
    _id
    first_name
    last_name
    createdAt
  }
}`;
