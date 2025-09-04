// src/App.jsx
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "98d760c4"; // ✅ Your OMDb API key

  // 🔍 Search Movies
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      setMovies(res.data.Search || []);
    } catch (err) {
      console.error("❌ Error fetching movies:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 text-gray-900 flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 tracking-wide w-full">
        🎥 <span className="text-blue-600">Movie</span>{" "}
        <span className="text-pink-500">Finder</span>
      </h1>

      {/* Search Form */}
      <form
        onSubmit={searchMovies}
        className="flex w-full max-w-3xl mb-10 shadow-md"
      >
        <input
          type="text"
          placeholder="Search your favorite movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 rounded-l-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base sm:text-lg"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-4 sm:px-6 py-3 rounded-r-xl font-semibold transition-all duration-300 text-sm sm:text-base"
        >
          🔍 Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-center text-lg font-medium animate-pulse w-full">
          🍿 Searching for movies...
        </p>
      )}

      {/* Movies Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <a
            key={movie.imdbID}
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 block"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x400?text=No+Image"
              }
              alt={movie.Title}
              className="w-full h-60 sm:h-72 md:h-80 object-cover"
            />
            <div className="p-3 sm:p-4">
              <h2 className="font-bold text-sm sm:text-base md:text-lg mb-1 text-gray-800 line-clamp-1">
                {movie.Title}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">📅 {movie.Year}</p>
              <span className="inline-block mt-2 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-pink-100 text-gray-700 rounded-full">
                {movie.Type.toUpperCase()}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* No Results */}
      {!loading && movies.length === 0 && query && (
        <p className="text-center mt-10 text-gray-500 text-base sm:text-lg w-full">
          No movies found for "<span className="text-blue-500">{query}</span>"
        </p>
      )}

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-500 text-xs sm:text-sm w-full">
        Made with ❤️ by{" "}
        <span className="text-blue-500 font-semibold">Umer Awan</span> using{" "}
        <span className="text-yellow-500 font-semibold">React</span> &{" "}
        <span className="text-pink-500 font-semibold">OMDb API</span>
      </footer>
    </div>
  );
}
