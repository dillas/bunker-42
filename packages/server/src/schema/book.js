import { gql } from 'apollo-server'

export default gql`
    extend type Query {
        book(id: ID!): Book!
        books: [Book]
    }

    type Book {
        id: ID!
        title: String!
        author: User!
    }
`
