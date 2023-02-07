export const createAuthor = `mutation createAuthor($input: AuthorInput!) {
    createAuthor(input: $input){
      first_name
    }
  }`;

export const editAuthor = `mutation EditAuthor($editAuthorId: ID!, $input: AuthorInput!) {
  editAuthor(id: $editAuthorId, input: $input) {
    _id
    first_name
    last_name
    createdAt
  }
}`;

export const deleteAuthor = `mutation DeleteAuthor($deleteAuthorId: ID!) {
  deleteAuthor(id: $deleteAuthorId)
}`;

export const authors = `query authors {
    authors {
      _id
      first_name
      last_name
      createdAt
    }
  }`;

export const author = `query Author($authorId: ID!) {
  author(id: $authorId) {
    _id
    first_name
    last_name
    createdAt
  }
}`;
