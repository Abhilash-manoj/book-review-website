import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [genre, setGenre] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ search: searchText, genre });
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="px-4 py-2 rounded-md border"
      />
      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="px-4 py-2 rounded-md border bg-[#131022]"
      >
        <option value="">All Genres</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Romance">Romance</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Search
      </button>
    </form>
  );
}
