const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
const Book = require('./models/book.model');
const app = express();
const env = process.env

const PORT = env.PORT || 3000;
const dbURI = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.42sn3qr.mongodb.net/?retryWrites=true&w=majority`

//connect to database
mongoose.connect(dbURI).then(() =>{
    console.log('connected to database')
}).catch((err) => {
    console.log(`error while connecting to database ${err}`)
})

// mongoose.set("useFindAndModify", false);

// Register view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // To enable DELETE AND PUT methods though the method is written as POST

//GET methods: Show main page
app.get("/", (req, res) => {
  res.redirect("/home");
});

//route to home
app.get("/home", async (req, res) => {
    try {
      const books = await Book.find({});
      res.render("home", { books });
    } catch (err) {
      console.log("Failed in finding the list of books!", err);
    }
  });

//
app.post("/book", async (req, res) => {
    const book = new Book(req.body);
    try {
      const newBook = await book.save();
      res.redirect("home");
    } catch (err) {
      console.log("Error occurred while adding book!", err);
    }
  });

// PUT method: update a specific employee
app.put("/book/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updateBook = await Book.findByIdAndUpdate(id, { ...req.body }); 
      // Note: use findAndModify() to remove the deprecation warning or do this mongoose.set('useFindAndModify', false);
      // Refer to line: 30 (After mongoose.connect)
      res.redirect("/home");
    } catch (err) {
      console.log("Error occurred while updating book record!", err);
    }
  });
  
  // DELETE method: delete a specific employee
  app.delete("/book/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await Book.findByIdAndDelete(id);
      res.redirect("/home");
    } catch (err) {
      console.log("Error occurred while deleting book!", err);
    }
  });

  // 404 page not found (if book requests for incorrect or unknown route)
app.use((req, res) => {
    res.status(404).render("404");
  });

app.listen(PORT, (err) =>{
    if(err) throw err;
    console.log(`listen on port http://localhost:${PORT}`);
})