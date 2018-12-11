import uuidv4 from 'uuid/v4'

export default {
  Query: {
    book: (parent, { id }, { models }) => {
      let book = models.books.filter(item => item.id === id)
      book = book[0]
      return book
    },
    books: (parent, args, { models }) => models.books,

    me: (parent, args, { me }) => me,
    user: (parent, { id }, { models }) => {
      return models.users[id]
    },
    users: (parent, args, { models }) => {
      return Object.values(models.users)
    },

    messages: (parent, args, { models }) => {
      return Object.values(models.messages)
    },
    message: (parent, { id }, { models }) => {
      return models.messages[id]
    }
  },

  Mutation: {
    createMessage: (parent, { text }, { me, models }) => {
      const id = uuidv4()
      const message = {
        id,
        text,
        userId: me.id
      }

      models.messages[id] = message
      models.users[me.id].messageIds.push(id)

      return message
    },
    deleteMessage: (parent, { id }, { models }) => {
      const { [id]: message, ...otherMessages } = models.messages

      if (!message) {
        return false
      }

      models.messages = otherMessages

      return true
    }
  },

  User: {
    messages: (user, args, { models }) => {
      return Object.values(models.messages).filter(
        message => message.userId === user.id
      )
    }
  },

  Book: {
    author: (author, args, { models }) => {
      return models.users[author.authorId]
    }
  },

  Message: {
    user: (user, args, { models }) => {
      return models.users[user.userId]
    }
  }
}
