const Book = require('../models/bookModel')
const Review = require('../models/reviewModel')

// Add a new book (auth required)
exports.addBook = async (req, res) => {
    try {
        const { title, author, description, coverImage } = req.body

        if (!title || !author || !description || !coverImage) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingBook = await Book.findOne({ title, author })
        if (existingBook) {
            return res.status(400).json({ message: "Book already exists" })
        }

        const book = new Book({
            title, author, description, coverImage, createdBy: req.user.userId,
        })

        await book.save()
        res.status(201).json(book)
    } catch (err) {
        res.status(500).json({ message: "Failed to add book", error: err.message })
    }
}

// Get all books (newest first)
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("createdBy", "name email").sort({ createdAt: -1 })
        res.json(books)
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch books", error: err.message })
    }
}

// Get a single book with its reviews
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("createdBy", "name email")

        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }

        const reviews = await Review.find({ book: req.params.id })
            .populate("user", "name email")

        res.json({ book, reviews })
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch book", error: err.message })
    }
}
