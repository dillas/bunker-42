export default {
  Query: {
    book: (parent, { id }, { models }) => {
      let book = models.books.filter(item => item.id === id)
      book = book[0]
      return book
    },
    books: (parent, args, { models }) => models.books
  },

  Book: {
    author: (author, args, { models }) => {
      return models.users[author.authorId]
    }
  }
}
