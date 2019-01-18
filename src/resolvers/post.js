/* eslint-disable no-return-await */
import Sequelize from 'sequelize'

import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated, isPostOwner } from './authorization'

const toCursorHash = string => Buffer.from(string).toString('base64')
const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

export default {
  Query: {
    posts: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor)
            }
          }
        }
        : {}

      const posts = await models.Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions
      })

      const hasNextPage = posts.length > limit
      const edges = hasNextPage ? posts.slice(0, -1) : posts
      console.log(` ===== edges =====${edges}`)
      
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      }
    },

    postsByCategory: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor)
            }
          }
        }
        : {}

      const posts = await models.Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions
      })

      const hasNextPage = posts.length > limit
      const edges = hasNextPage ? posts.slice(0, -1) : posts

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
        }
      }
    },

    post: async (parent, { id }, { models }) => {
      return await models.Post.findById(id)
    }
  },

  Mutation: {
    createPost: combineResolvers(
      isAuthenticated,
      async (parent, { title, category, isActive, sortNumber, body, previewPicture }, { me, models }) => {
        return await models.Post.create({
          title,
          category,
          isActive,
          sortNumber,
          body,
          previewPicture,
          userId: me.id
        })
      }
    ),

    deletePost: combineResolvers(
      isAuthenticated,
      isPostOwner,
      async (parent, { id }, { models }) => {
        return await models.Post.destroy({ where: { id } })
      }
    )
  },

  Post: {
    user: async (post, args, { loaders }) => {
      return await loaders.user.load(post.userId)
    },
    category: async (post, args, { models }) => {
      return await models.SiteCategory.find(item => item.id === post.category)
    }
  }
}
