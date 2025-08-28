require('dotenv').config()

const PORT = process.env.PORT || 3000

const authRoutes = require('./routes/authRoutes')

const connectDb = require('./connect/dbConnect')

const cors = require('cors')

const express = require('express')

const server = express()

server.use(cors())

server.use(express.json())

server.use("/api/auth", authRoutes)

const startServer = async () => {
    await connectDb()
    server.listen(PORT, () => console.log("BookRb Server Running at http://localhost:" + PORT))
}

startServer()

