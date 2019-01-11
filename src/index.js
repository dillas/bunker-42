import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import jwt from 'jsonwebtoken'
import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import DataLoader from 'dataloader'

import schema from './schema'
import resolvers from './resolvers'
import models, { sequelize } from './models'
import loaders from './loaders'

const app = express()

app.use(cors())

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
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,

  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },

  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      }
    }

    if (req) {
      const me = await getMe(req)
      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader(keys => loaders.user.batchUsers(keys, models))
        }
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

const isTest = !!process.env.TEST_DATABASE
const isProduction = !!process.env.DATABASE_URL
const port = process.env.PORT || 8000

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest) {
    createFixtureData(new Date())
  }

  httpServer.listen({ port }, () => {
    console.log(`🚀  Server ready at http://localhost:${port}/graphql`)
  })
})

const createFixtureData = async date => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      role: 'ADMIN',
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

  await models.Post.create(
    {
      title: 'День Хиросимы',
      isActive: false,
      sortNumber: 500,
      body: 'Ведь именно в этот день ровно 70 лет назад произошла страшная катастрофа – атомная бомбардировка японского города Хиросима.',
      previewPicture: 'http://bunker42.com/upload/iblock/6a8/6a89a766fd20db124a82fbc6f62822a0.jpg',
      userId: '1'
    }
  )

  await models.Post.create(
    {
      title: 'Новая экспозиция',
      isActive: false,
      sortNumber: 500,
      body: 'Ежегодно 6 августа во всем мире проходят акции в поддержку уничтожения всех видов ядерного оружия.',
      previewPicture: 'http://bunker42.com/upload/iblock/1aa/1aa366177944eada7d88f87bde8d0623.jpg',
      userId: '1'
    }
  )
}
