"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.books = exports.createBook = void 0;
exports.createBook = `mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      _id
      title
      pages
      author {
        _id
        first_name
        last_name
        createdAt
      }
    }
  }`;
exports.books = `query books {
    books {
      _id
      title
    }
  }`;
