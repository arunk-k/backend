const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(401).json({ message: "No token provided" })

        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid or expired token" })
            req.user = decoded
            next()
        })
    } catch (err) {
        res.status(500).json({ message: "Auth error", error: err.message })
    }
}

module.exports = jwtMiddleware
