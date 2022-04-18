const express = require('express')
const router = express.Router()
const { getBooks, getBooksById, setBooks, updateBooks, deleteBooks } = require('../controllers/bookController')

router.get('/', getBooks)
router.get('/:id', getBooksById)
router.post('/', setBooks)
router.put('/:id', updateBooks)
router.delete('/:id', deleteBooks)


module.exports = router