import { gql } from 'apollo-server'

export default gql`
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
`
