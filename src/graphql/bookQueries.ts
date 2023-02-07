// Mutations
export const createBook = `mutation CreateBook($input: BookInput!) {
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

export const editBook = `mutation EditBook($editBookId: ID!, $input: BookInput!) {
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

export const deleteBook = `mutation DeleteBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId)
}`;

// Queries
export const books = `query books {
    books {
      _id
      title
    }
  }`;

export const book = `query Book($bookId: ID!) {
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
