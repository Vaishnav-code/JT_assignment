const express = require('express')
const dotenv = require('dotenv').config() // Take port from .env file and add to process
const port = process.env.PORT || 5000   //if process.env is undeclared, use port 5000

const app = express();
app.use(express.json()) //json body parser
app.use(express.urlencoded({ extended: false }))

app.use('/api/books', require('./routes/bookRoutes'))


app.listen(port, () => console.log(`Server started on port ${port}`))

