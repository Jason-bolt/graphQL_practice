"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.author = exports.authors = exports.deleteAuthor = exports.editAuthor = exports.createAuthor = void 0;
exports.createAuthor = `mutation createAuthor($input: AuthorInput!) {
    createAuthor(input: $input){
      first_name
    }
  }`;
exports.editAuthor = `mutation EditAuthor($editAuthorId: ID!, $input: AuthorInput!) {
  editAuthor(id: $editAuthorId, input: $input) {
    _id
    first_name
    last_name
    createdAt
  }
}`;
exports.deleteAuthor = `mutation DeleteAuthor($deleteAuthorId: ID!) {
  deleteAuthor(id: $deleteAuthorId)
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
