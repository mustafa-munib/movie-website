"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
      fetchMovieCredits(); // Fetch cast information
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
        }
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
        }
      );
      setCast(response.data.cast.slice(0, 10)); // Get the top 10 cast members
    } catch (error) {
      console.error("Error fetching movie credits:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (!movie) return null;

  return (
      <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
           <Link href={`/`}>
                    <button className="mt-2 block px-4 py-2 bg-teal-500 text-white rounded-md text-center text-sm md:text-base hover:bg-teal-600">
                      Go Back
                    </button>
                  </Link>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Movie Poster */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg shadow-lg"
        />

        {/* Movie Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-400 text-sm md:text-base mb-2">
            Release Date: {movie.release_date}
          </p>
          <p className="text-gray-400 text-sm md:text-base mb-2">
            Runtime: {movie.runtime} minutes
          </p>
          <p className="text-gray-400 text-sm md:text-base mb-2">
            Rating: {movie.vote_average} / 10 ({movie.vote_count} votes)
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-teal-600 text-white rounded-md text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300 mb-6">{movie.overview}</p>

          {/* Production Companies */}
          {movie.production_companies.length > 0 && (
            <>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Production Companies
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {movie.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {cast.map((member) => (
            <div key={member.id} className="text-center">
              {member.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  width={150}
                  height={225}
                  className="rounded-md shadow-md mx-auto mb-2"
                />
              ) : (
                <div className="w-[150px] h-[225px] bg-gray-700 rounded-md mx-auto mb-2 flex items-center justify-center">
                  <p className="text-sm text-gray-400">No Image</p>
                </div>
              )}
              <p className="text-sm text-white">{member.name}</p>
              <p className="text-xs text-gray-400">{member.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
