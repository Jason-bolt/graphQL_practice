"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = exports.books = exports.deleteBook = exports.editBook = exports.createBook = void 0;
// Mutations
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
exports.editBook = `mutation EditBook($editBookId: ID!, $input: BookInput!) {
  editBook(id: $editBookId, input: $input) {
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
exports.deleteBook = `mutation DeleteBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId)
}`;
// Queries
exports.books = `query books {
    books {
      _id
      title
    }
  }`;
exports.book = `query Book($bookId: ID!) {
  book(id: $bookId) {
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
