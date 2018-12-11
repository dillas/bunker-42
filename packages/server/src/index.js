import 'dotenv/config'
import { ApolloServer } from 'apollo-server'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,

  formatError: error => {
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },

  context: async () => ({
    models,
    me: await models.User.findByLogin('rwieruch'),
    secret: process.env.SECRET
  })
})

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages()
  }

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
})

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React'
        }
      ]
    },
    {
      include: [models.Message]
    }
  )

  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...'
        },
        {
          text: 'Published a complete ...'
        }
      ]
    },
    {
      include: [models.Message]
    }
  )
}
