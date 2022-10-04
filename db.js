const mongoose = require('mongoose');
const bookSchema = require('./models/book.model');
const book = mongoose.Model('book', bookSchema, 'book');

//get all books


//search books

//add books

//update books availability

//remove book

(async () => {
    const connector = mongoose.connect(connectionString)
    const username = process.argv[2].split('=')[1]
  
    let user = await connector.then(async () => {
      return findUser(username)
    })
  
    if (!user) {
      user = await createUser(username)
    }
  
    console.log(user)
    process.exit(0)
  })()