const fs = require('fs')
const data = require('../testData.json') //Not using fs to read data as all the canges made after server starts are written via data 

// @desc   Get Books 
// @route  GET /api/Books
// @access public
const getBooks = (req, res) => {
    res.status(200).json(data)
}
// @desc   Get Books by id
// @route  GET /api/Books/:id
// @access public
const getBooksById = (req, res) => {
    // let obj = data.filter(o => o.id == req.params.id)    // Bad way to do this
    let obj = data.find(o => o.id === parseInt(req.params.id))
    if (!obj) res.status(404).json({ message: "No book found for this ID" })
    else res.status(200).json(obj)
}

// @desc   Add Books 
// @route  POST /api/Books
// @access private
const setBooks = (req, res) => {
    if (!req.body.name || !req.body.author || !req.body.year) {
        res.status(400).json({ message: `Please fill in the request correctly` })
    }
    else {
        data.push({
            "id": data.slice(-1)[ 0 ].id + 1, //increasing id by 1
            "name": req.body.name,
            "author": req.body.author,
            "year": req.body.year
        })
        //fs write
        fs.writeFile("./backend/testData.json", JSON.stringify(data), (err) => {
            if (err) {
                throw err
            }
            res.status(200).json(data)
        })
    }
    //status ok
}

// @desc   Update Books
// @route  PUT /api/Books/:id/
// @access private
const updateBooks = (req, res) => {
    //find the book
    let obj = data.find(o => o.id === parseInt(req.params.id))
    if (obj === -1) res.status(404).json({ message: "No book found for this ID" })

    // validate data
    else if (!req.body.name || !req.body.author || !req.body.year) {
        res.status(400).json({ message: `Please fill in the request correctly` })
    }

    //update the book data
    else {
        let objInd = data.findIndex(o => o.id === parseInt(req.params.id))
        data[ objInd ] = {
            "id": req.params.id,
            "name": req.body.name,
            "author": req.body.author,
            "year": req.body.year
        }
        // fs write
        fs.writeFile("./backend/testData.json", JSON.stringify(data), (err) => {
            if (err) {
                throw err
            }
            res.status(200).json(data[ objInd ])
        })
    }

}

// @desc   Delete Books 
// @route  DELETE /api/Books/:id
// @access private
const deleteBooks = (req, res) => {
    let obj = data.find(o => o.id === parseInt(req.params.id))
    if (obj === -1) res.status(404).json({ message: "No book found for this ID" })
    else {
        let objInd = data.findIndex(o => o.id === parseInt(req.params.id))               //find param index in json

        data.splice(objInd, 1)            //removing 1 element at index ObjInd
        //fs write
        fs.writeFile("./backend/testData.json", JSON.stringify(data), (err) => {
            if (err) {
                throw err
            }
            res.status(200).json({ message: `Deleted book no ${req.params.id}` }) //
        })
    }

}

module.exports = {
    getBooks,
    getBooksById,
    setBooks,
    updateBooks,
    deleteBooks
}