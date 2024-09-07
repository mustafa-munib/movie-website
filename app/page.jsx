// app/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link"; // Import Link component for navigation
import LatestTrailers from "@/components/latestTrailor";


const Home = () => {
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
      <nav className='flex items-center justify-between p-4'>
        <h1 className='text-lg md:text-5xl font-bold'>Movie Website</h1>
        <h2 className='text-sm md:text-lg font-semibold'>Latest & Popular Movies</h2>
      </nav>
      {/* Hero Section */}
      <div className="relative flex items-center justify-center h-64 md:h-96 bg-gradient-to-r from-blue-800 to-blue-500">
        <div className="text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Welcome to Movie Explorer</h1>
          <p className="text-lg md:text-xl mb-4 md:mb-8">Discover millions of movies and TV shows</p>
          <p className = 'mb-4'>Created by <span className= 'text-xl font-bold'>Mustafa</span> <span className='text-xl font-bold bg-white text-blue-400 p-2 rounded-md'>Hussaini</span></p>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-2 md:px-4 md:py-2 rounded-l-md bg-white text-black focus:outline-none w-full max-w-xs md:max-w-md"
            />
            <button
              type="submit"
              className="px-2 py-2 md:px-4 md:py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Trailor */}

<LatestTrailers />

{/* Trailor End */}
      {/* Movies Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="w-full h-40 p-4  md:h-64 bg-gray-700 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-md shadow-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="object-cover"
                />
                <div className="p-2 md:p-4">
                  <h3 className="text-sm md:text-lg font-bold">{movie.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400">{movie.release_date}</p>
                  {/* View Details Button */}
                  <Link href={`/${movie.id}`}>
                    <button className="mt-2 block px-4 py-2 bg-teal-500 text-white rounded-md text-center text-sm md:text-base hover:bg-teal-600">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
