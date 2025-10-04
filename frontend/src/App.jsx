import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/editbook/:id" element={<EditBook />} />
        <Route path="/bookdetails/:id" element={<BookDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
