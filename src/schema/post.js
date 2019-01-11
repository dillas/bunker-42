import { gql } from 'apollo-server'

export default gql`
    extend type Query {
        post(id: ID!): Post!
        posts(cursor: String, limit: Int): PostConnection!
        postsByCategory(cursor: String, limit: Int): PostConnection!
    }

    extend type Mutation {
        createPost(title: String!, category: String, isActive: Boolean!, sortNumber: Int!, body: String!, previewPicture: String! ): Post!
        deletePost(id: ID!): Boolean!
    }

    type PostConnection {
        edges: [Post!]!
        postPageInfo: PostPageInfo!
    }

    type PostPageInfo {
        hasNextPage: Boolean!
        endCursor: String!
    }
    
    type Post {
        id: ID!
        category: String
        title: String!
        isActive: Boolean!
        createdAt: Date!
        updatedAt: Date!
        sortNumber: Int
        body: String
        previewPicture: String!
        user: User!
    }
`
