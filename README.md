# INTRO TO GRAPHQL - BOOK REGISTRY

I recently learned the power of GraphQL and I find it very interesting. I just completed the ApolloGraphQL course on the subject and decided to build a mini project with MongoDB to practiced what I just learned.

<br />

## Tech Stack

- NodeJS
- TypeScript
- GraphQL
- MongoDB
- Apollo-server

<br />

## A little about GraphQL

"GraphQL is a query language for APIs, and a runtime for executing those queries against your data. It was developed and open-sourced by Facebook in 2015 and is now maintained by the GraphQL Foundation. GraphQL provides a more efficient, powerful and flexible alternative to traditional REST API. It allows clients to request only the data they need, and nothing more, reducing over-fetching or under-fetching of data." ~ <em>ChatGPT-3</em> 😃

<br />

### Project brief

The project simulates a simple book registry where books data comprising of `title`, `page count` and `author` are stored with their corresonding authors' data: `first_name` and `last_name`.

The functionalities of the API include:

- Fetching all books with author information
- Fetching all authors
- Fetching a particular book
- Fetching a particular author
- Updating author information
- Updating book information
- Deleting author information and in turn deleting all related books
- Deleting a particular book
- And many more to come as inspired 😅

The power of GraphQL allows the querying of specific data from either a database or an existing API. So if there was a front end section to this API, it would have the power to hand pick the data needed for a particular view. Amazing right!

<br />

## How to run

To run the project, you first need to clone the repository then run the commands below.

```
- npm install
- npm run dev
```

<br />

The project is still being done so not all functionalities work at the moment. Do hit me up if you have suggestions on how I could improve my code quailty or want to talk about development in general 😉.
