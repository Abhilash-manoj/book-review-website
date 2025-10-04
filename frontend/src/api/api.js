import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//user APIs
export const registerUser = (userData) => API.post("/users/register", userData);

export const loginUser = (userData) => API.post("/users/login", userData);

export const getUserProfile = (token) =>
  API.get(`/users/profile`, { headers: { Authorization: `Bearer ${token}` } });

//book APIs
export const addBook = (bookData, token) =>
  API.post("/books/addbook", bookData, { headers: { Authorization: `Bearer ${token}` } });

export const editBook = (id, bookData, token) =>
  API.put(`/books/editbook/${id}`, bookData, { headers: { Authorization: `Bearer ${token}` } });

export const deleteBook = (id, token) =>
  API.delete(`/books/deletebook/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const getBooks = (page = 1) => API.get(`/books/getbook?page=${page}`);

export const getBookDetails = (id) => API.get(`/books/getbookdetails/${id}`);

export const getFeaturedBooks = () => API.get(`/books/featured`);

//review APIs
export const getReviewsForBook = (bookId) => API.get(`/reviews/${bookId}`);

export const editReview = (reviewId, reviewData, token) =>
  API.put(`/reviews/${reviewId}`, reviewData, { headers: { Authorization: `Bearer ${token}` } });

export const deleteReview = (reviewId, token) =>
  API.delete(`/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });

export const addReview = (bookId, reviewData, token) =>
  API.post(`/reviews/${bookId}`, reviewData, { headers: { Authorization: `Bearer ${token}` } });

export default API;
