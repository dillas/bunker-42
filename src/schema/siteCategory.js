import { gql } from 'apollo-server'

export default gql`
  extend type Query{
    siteCategorys: [SiteCategory!]
    siteCategory(id: ID!): SiteCategory!
  }

  type SiteCategory {
    id: ID!
    title: String!
    phone: String!
  }
`
