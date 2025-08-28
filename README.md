# Book Review Board - Backend

Backend API for the Book Review Board app built with **Node.js, Express, and MongoDB**.

API Routes

Auth

POST /api/auth/register → Register user

POST /api/auth/login → Login & get JWT

Books

POST /api/books (auth) → Add book

GET /api/books → List books

GET /api/books/:id → Get book + reviews

Reviews

POST /api/books/:id/reviews (auth) → Add review