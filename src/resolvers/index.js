import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './user'
import messageResolver from './message'
import postResolver from './post'
import siteCategoryResolver from './siteCategory'
// import bookResolver from './book'

const customScalarResolver = {
  Date: GraphQLDateTime
}

export default [customScalarResolver, userResolvers, messageResolver, postResolver, siteCategoryResolver]
