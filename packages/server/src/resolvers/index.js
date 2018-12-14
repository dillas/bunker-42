import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import messageResolver from './message'
// import bookResolver from './book'

const customScalarResolver = {
    Date: GraphQLDateTime
}

export default [customScalarResolver, userResolvers, messageResolver]
