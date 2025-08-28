const express = require('express')
const router = express.Router()

const jwtMiddleware = require('../middlewares/jwtMiddleware')
const bookController = require('../controllers/bookController')
const reviewRoutes = require('./reviewRoutes')

router.post('/', jwtMiddleware, bookController.addBook)      // Add book
router.get('/', bookController.getBooks)                     // Get all books
router.get('/:id', bookController.getBookById)               // Get single book + reviews

router.use('/:id/reviews', reviewRoutes)

module.exports = router
