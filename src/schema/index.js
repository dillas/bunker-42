import { gql } from 'apollo-server'

import userSchema from './user'
import messageSchema from './message'
import postSchema from './post'
import siteCategorySchema from './siteCategory'
// import bookSchema from './book'

const linkSchema = gql`
    scalar Date

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`

export default [linkSchema, userSchema, messageSchema, postSchema, siteCategorySchema]
