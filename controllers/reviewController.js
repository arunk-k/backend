const Review = require('../models/reviewModel')
const Book = require('../models/bookModel')

exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body
        const bookId = req.params.id

        if (!rating || !comment) {
            return res.status(400).json({ message: "Rating and comment are required" })
        }

        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }

        const existingReview = await Review.findOne({ book: bookId, user: req.user.userId })
        if (existingReview) {
            existingReview.rating = rating
            existingReview.comment = comment
            await existingReview.save()
            return res.status(200).json(existingReview)
        }


        const review = new Review({
            rating,
            comment,
            book: bookId,
            user: req.user.userId, 
        })

        await review.save()
        const populatedReview = await review.populate("user", "name email") 
        res.status(201).json(populatedReview)

    } catch (err) {
        res.status(500).json({ message: "Failed to add review", error: err.message })
    }
}
