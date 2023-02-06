const typeDefs = `#graphql

type Author {
    _id: ID!
    first_name: String!
    last_name: String!
    createdAt: String!
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
    createAuthor(input: AuthorInput!): Author!
    editAuthor(id: ID!, input: AuthorInput!): Author!
    deleteAuthor(id: ID!): Boolean
    createBook(input: BookInput!): Book!
    editBook(id: ID!, input: BookInput!): Book!
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
