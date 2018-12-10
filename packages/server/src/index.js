const { ApolloServer, gql } = require("apollo-server");
const uuidv4 = require("uuid/v4");


let books = [
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

let users = {
  1: {
    id: "1",
    username: "Evgenii Yakobenko",
    messageIds: [1]
  },
  2: {
    id: "2",
    username: "J.K. Rowling",
    messageIds: [2]
  },
  3: {
    id: "3",
    username: "Michael Crichton",
    messageIds: [3,4,5]
  }
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2'
  },
  3: {
    id: '3',
    text: '3 Michael By World',
    userId: '3'
  },
  4: {
    id: '4',
    text: '4 Michael By World',
    userId: '3'
  },
  5: {
    id: '5',
    text: '5 Michael By World',
    userId: '3'
  },
};

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: User!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type Query {
    book(id: ID!): Book!
    books: [Book]

    me: User
    user(id: ID!): User!
    users: [User!]

    message(id: ID!): Message!
    messages: [Message!]!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    book: (parent, { id }) => {
      book = books.filter(book => book.id == id);
      book = book[0];
      return book;
    },
    books: () => books,

    me: (parent, args, { me }) => me,
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },

    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    }
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id }) => {
      const { [id]: message, ...otherMessages } = messages;

      if (!message) {
        return false;
      }

      messages = otherMessages;

      return true;
    },
  },

  User: {
    messages: user => {
      return Object.values(messages).filter(
        message => message.userId === user.id,
      );
    },
  },

  Book: {
    author: parent => {
      return users[parent.authorId];
    },
  },

  Message: {
    user: message => {
      return users[message.userId];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, context: { me: users[1]} });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
