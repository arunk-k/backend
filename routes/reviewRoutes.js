const express = require('express')
const router = express.Router({ mergeParams: true }) 

const jwtMiddleware = require('../middlewares/jwtMiddleware')
const reviewController = require('../controllers/reviewController')

router.post('/', jwtMiddleware, reviewController.addReview) 

module.exports = router
