import schema from './schema'
import resolvers from './resolvers'
import models from './models'
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
