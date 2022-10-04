const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, 'title is required']
    },
    publish_date : {
        type : Date,
        require :[true, 'publish date is required']
    },
    author : {
        type : String,
        require : [true, 'author name is required']
    },
    publisher : {
        type : String, 
        require : [true, 'publisher is required']
    },
    description : String,
    quantity : {
        type : Number, 
        default : 1
    }
})

const Book = mongoose.model('book', bookSchema)

module.exports = Book;