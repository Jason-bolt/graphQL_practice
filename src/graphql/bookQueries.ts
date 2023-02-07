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

export const books = `query books {
    books {
      _id
      title
    }
  }`;
