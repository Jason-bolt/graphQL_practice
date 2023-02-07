const typeDefs = `#graphql

type Author {
    _id: ID!
    first_name: String!
    last_name: String!
    createdAt: String!
}

type AuthorResponse {
    status: String!,
    message: String!,
    data: Author
}

type BookResponse {
    status: Int!,
    message: String!,
    data: Book
}

input AuthorInput {
    first_name: String!
    last_name: String!
}

type Book {
    _id: ID!
    title: String!
    pages: Int!
    author: Author!
}

input BookInput {
    title: String!
    pages: Int!
    author: ID!
}

type Mutation {
    createAuthor(input: AuthorInput!): AuthorResponse!
    editAuthor(id: ID!, input: AuthorInput!): AuthorResponse!
    deleteAuthor(id: ID!): Boolean
    createBook(input: BookInput!): BookResponse!
    editBook(id: ID!, input: BookInput!): BookResponse!
    deleteBook(id: ID!): Boolean
} 

type Query {
    authors: [Author!]!
    author(id: ID!): Author!
    books: [Book!]!
    book(id: ID!): Book!
}

`;

export default typeDefs;
