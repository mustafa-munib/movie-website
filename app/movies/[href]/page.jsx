// app/movie/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: searchTerm,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center h-96 bg-gradient-to-r from-blue-800 to-blue-500">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Movie Explorer</h1>
          <p className="text-xl mb-8">Discover millions of movies and TV shows</p>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-l-md bg-white text-black focus:outline-none w-80"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="w-full h-64 bg-gray-700 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-md shadow-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
