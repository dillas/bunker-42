import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { ApolloServer, AuthenticationError } from 'apollo-server'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'

const getMe = async req => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }

}

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

  context: async ({ req }) => {
    const me = await getMe(req)
    return {
      models,
      me,
      secret: process.env.SECRET
    }
  }
})

const eraseDatabaseOnSync = true

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages(new Date())
  }

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
})

const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
          createdAt: date.setSeconds(date.getSeconds() + 1)
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
          text: 'Happy to release ...',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: 'Published a complete ...',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  )

  await models.User.create(
    {
      username: 'dillas',
      email: 'dillas90@gmail.com',
      role: 'ADMIN',
      password: 'huikt0uznaet',
      messages: [
        {
          text: 'Since you already have seed data in your src/index.js file for two users, you can give one of them a role.',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        },
        {
          text: 'The admin role used in this case will be checked if the user attempts a delete operation:',
          createdAt: date.setSeconds(date.getSeconds() + 1)
        }
      ]
    },
    {
      include: [models.Message]
    }
  )
}
