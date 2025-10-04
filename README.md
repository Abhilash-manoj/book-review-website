# MERN Fullstack Book Review Platform

This is a comprehensive Book Review Platform built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to sign up, log in, browse a collection of books, add new books, and share their own reviews and ratings. This project demonstrates a full-stack application with secure user authentication, complete CRUD operations, and a dynamic, responsive frontend.

---

## Features

* **User Authentication**: Secure user registration and login system using **JWT** (JSON Web Tokens) for authentication and **bcrypt** for password hashing.
* **Protected Routes**: Backend API routes are protected using middleware to ensure only authenticated users can perform sensitive actions.
* **Book Management**: Full **CRUD** (Create, Read, Update, Delete) functionality for books. Users can add books, and only the creator of a book can edit or delete it.
* **Pagination**: The main book list is paginated to efficiently display 5 books per page.
* **Review System**: Authenticated users can add, edit, and delete their own reviews for any book, complete with a 1-5 star rating.
* **Dynamic Ratings**: The platform automatically calculates and displays the average rating for each book on its details page.

---

## Tech Stack

### Backend
* **Node.js & Express**: For the server-side application and RESTful API.
* **MongoDB Atlas**: Cloud-hosted NoSQL database for data storage.
* **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
* **JSON Web Token (JWT)**: For generating and verifying user authentication tokens.
* **bcrypt**: For hashing and securing user passwords.

### Frontend
* **React**: For building the user interface and managing component state.
* **React Router**: For client-side routing and navigation between pages.
* **Axios/Fetch**: For making asynchronous HTTP requests to the backend API.
* **Tailwind CSS/Bootstrap**: For modern, responsive styling.
* **Context API**: For global state management (e.g., user authentication status).

---

## Database Schema Design

The application uses three main Mongoose schemas: `User`, `Book`, and `Review`.

### User Schema
* `name`: { String, required }
* `email`: { String, required, unique }
* `password`: { String, required }

### Book Schema
* `title`: { String, required }
* `author`: { String, required }
* `description`: { String, required }
* `genre`: { String, required }
* `year`: { Number, required }
* `addedBy`: { ObjectId, ref: 'User' }

### Review Schema
* `bookId`: { ObjectId, ref: 'Book' }
* `userId`: { ObjectId, ref: 'User' }
* `rating`: { Number, required, min: 1, max: 5 }
* `reviewText`: { String, required }

---

## Frontend Pages

* **Signup Page**: A form for new users to register.
* **Login Page**: A form for existing users to log in and receive a JWT.
* **Book List Page (Home)**: Displays all books with pagination.
* **Book Details Page**: Shows detailed information for a single book, including all its reviews and the average rating.
* **Add/Edit Book Page**: A protected form for logged-in users to add or edit their books.
* **Profile Page (Bonus)**: Displays the books and reviews created by the logged-in user.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn
* Git
* A free MongoDB Atlas account

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/Abhilash-manoj/book-review-website.git
    ```

2.  **Setup the Backend**
    * Navigate to the `/backend` directory.
    * Install dependencies: `npm install`
    * Create a `.env` file and add the following variables:
        ```env
        PORT=5000
        MONGO_URI=mongodb+srv://mongodbuser:password15@cluster0.49dkat6.mongodb.net/bookreviewDB
        JWT_SECRET=jwt_secret_pass


        ```
    * Start the server: `npm run dev`

3.  **Setup the Frontend**
    * Navigate to the `/frontend` directory.
    * Install dependencies: `npm install`
    * Start the React app: `npm start`

The application should now be running with the frontend on `http://localhost:5173` and the backend on `http://localhost:5000`.