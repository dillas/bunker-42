import { gql } from 'apollo-server'

export default gql`
    extend type Query {
        post(id: ID!): Post!
        posts(cursor: String, limit: Int): PostConnection!
        
        postsByCategory(cursor: String, limit: Int): PostsByCategoryConnection!
    }

    extend type Mutation {
        createPost(title: String!, category: String, isActive: Boolean!, sortNumber: Int!, body: String!, previewPicture: String! ): Post!
        deletePost(id: ID!): Boolean!
    }

    type PostsByCategoryConnection {
        edges: [Post!]!
        pageInfo: PostsByCategoryPageInfo!
    }

    type PostConnection {
        edges: [Post!]!
        pageInfo: PostPageInfo!
    }

    type PostPageInfo {
        hasNextPage: Boolean!
        endCursor: String!
    }

    type PostsByCategoryPageInfo {
        hasNextPage: Boolean!
        endCursor: String!
    }
    
    type Post {
        id: ID!
        category: SiteCategory!
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
