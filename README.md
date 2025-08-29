# Book Review Board - Backend

This is the **backend API** for the Book Review Board web application.  
It is built with **Node.js, Express, and MongoDB**.  
The backend provides RESTful APIs for **user authentication, book management, and reviews**.  

---

## Tech Stack
- **Node.js + Express** – Server & REST API  
- **MongoDB + Mongoose** – Database & ODM  
- **JWT (JSON Web Token)** – Authentication  
- **bcrypt.js** – Password hashing  
- **dotenv** – Environment variable management  
- **cors** – Cross-origin resource sharing  

---

## API Base URL

- **Local Development** → `http://localhost:3214/api`  
- **Production (Render)** → `https://backend-kvaf.onrender.com/api`

---

## Project folder Structure

backend/
├── connect/ DB connection
├── controllers/ # Route controllers (auth, books, reviews)
├── middleware/ # JWT authentication middleware
├── models/ # Mongoose models (User, Book, Review)
├── routes/ # Express routes (auth, books, reviews)
├── .env # environment variables config
├── index.js # Entry point
├── package.json


---

##  Setup Instructions

1. Clone the repo and move into the folder  
2. Install dependencies  
3. Setup `.env` file (see below)  
4. Start the backend server  

```cmd
git clone https://github.com/arunk-k/backend.git
cd backend
npm install
node index.js
```
## Sample .env config
```.env
PORT=3214
DBCONNECT=mongodb+srv://arun:arun@cluster0.kwmldct.mongodb.net/bookReviewBoardDb?retryWrites=true&w=majority&appName=Cluster0
SECRETKEY="SECRETKEYGEESESQUADS"
```
## API Routes

Auth

POST /auth/register → Register new user

POST /auth/login → Login & receive JWT

Books

POST /books → Add a new book (Auth required)

GET /books → Get all books (newest first)

GET /books/:id → Get a single book with reviews

Reviews

POST /books/:id/reviews → Add a review (Auth required)

Extras

JWT-based authentication middleware

Input validation for required fields

Proper error handling

## Screenshots

### Backend Running Locally
![Backend Running](./screenshots/backendRunning.png)



