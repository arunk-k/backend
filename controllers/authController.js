const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRETKEY, { expiresIn: "7d" })
}

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save()
        console.log(newUser._doc)
        console.log(newUser)
    
        const { password: _, ...userWithoutPassword } = newUser._doc
        res.status(201).json(userWithoutPassword)

    } catch (err) {
        res.status(500).json({ message: "Registration failed", error: err.message })
    }
}

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const existing = await User.findOne({ email })
        if (!existing) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const isPasswordValid = await bcrypt.compare(password, existing.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = generateToken(existing._id)
        res.status(200).json({ user: existing.name, token })

    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message })
    }
}
