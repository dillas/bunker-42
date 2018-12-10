const { ApolloServer, gql } = require("apollo-server");

const books = [
  {

    id: "1",
    title: "Bunker-42 on Taganka",
    authorId: "1"
  },
  {
    id: "2",
    title: "Harry Potter and the Chamber of Secrets",
    authorId: "2"
  },
  {
    id: "3",
    title: "Jurassic Park",
    authorId: "3"
  },
  {
    id: "4",
    title: "South Park",
    authorId: "3"
  },
  {
    id: "5",
    title: "Dillas on Taganka",
    authorId: "1"
  }
];

const users = {
  1: {
    id: "1",
    username: "Evgenii Yakobenko"
  },
  2: {
    id: "2",
    username: "J.K. Rowling"
  },
  3: {
    id: "3",
    username: "Michael Crichton"
  }
};

const user = users[1];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: User!
  }

  type User {
    id: ID!
    username: String!
  }

  type Query {
    books: [Book]
    me: User
    user(id: ID!): User
    users: [User!]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    me: () => me,
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    }
  },

  User: {
    username: parent => {
      return parent.username;
    },
  },

  Book: {
    author: parent => {
      return users[parent.authorId];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
