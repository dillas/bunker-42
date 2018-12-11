
let books = [
  {
    id: '1',
    title: 'Bunker-42 on Taganka',
    authorId: '1'
  },
  {
    id: '2',
    title: 'Harry Potter and the Chamber of Secrets',
    authorId: '2'
  },
  {
    id: '3',
    title: 'Jurassic Park',
    authorId: '3'
  },
  {
    id: '4',
    title: 'South Park',
    authorId: '3'
  },
  {
    id: '5',
    title: 'Dillas on Taganka',
    authorId: '1'
  }
]

let users = {
  1: {
    id: '1',
    username: 'Evgenii Yakobenko',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'J.K. Rowling',
    messageIds: [2]
  },
  3: {
    id: '3',
    username: 'Michael Crichton',
    messageIds: [3, 4, 5]
  }
}

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2'
  },
  3: {
    id: '3',
    text: '3 Michael By World',
    userId: '3'
  },
  4: {
    id: '4',
    text: '4 Michael By World',
    userId: '3'
  },
  5: {
    id: '5',
    text: '5 Michael By World',
    userId: '3'
  }
}

export default {
  books,
  users,
  messages
}
