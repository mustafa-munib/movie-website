// components/MovieCard.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="bg-gray-800 rounded-lg p-5 cursor-pointer hover:scale-105 transition-transform">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-md"
        />
        <h2 className="text-white mt-2 text-lg">{movie.title}</h2>
        <p className="text-gray-400">{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
