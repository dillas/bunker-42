import { gql } from 'apollo-server'

export default gql`
    extend type Query {
        message(id: ID!): Message!
        messages(cursor: String, limit: Int): MessageConnection!
    }

    extend type Mutation {
        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Boolean!
    }

    type MessageConnection {
        edges: [Message!]!
        pageInfo: PageInfo!
    }

    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String!
    }
    
    type Message {
        id: ID!
        text: String!
        createdAt: Date!
        user: User!
    }
`
