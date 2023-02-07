export const createAuthor = `mutation createAuthor($input: AuthorInput!) {
    createAuthor(input: $input){
      first_name
    }
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
