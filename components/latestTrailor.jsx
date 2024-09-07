"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

const LatestTrailers = () => {
  const [trailers, setTrailers] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchTrailers();
  }, []);

  const fetchTrailers = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming`,
        {
          params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY },
        }
      );
      setTrailers(response.data.results.slice(0, 10)); // Fetch top 10 trailers
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  };

  // Infinite scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-4">Latest Trailers</h2>

      <div className="flex space-x-4 items-center mb-6">
        <button className="px-4 py-2 rounded-full bg-teal-600 text-white">
          Popular
        </button>
      </div>

      <div
        className="relative flex overflow-x-scroll scroll-smooth hide-scrollbar"
        ref={scrollRef}
      >
        {trailers.map((trailer) => (
          <div
            key={trailer.id}
            className="min-w-[300px] h-[200px] rounded-lg shadow-lg bg-gray-800 flex-shrink-0 mx-2 relative"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${trailer.backdrop_path}`}
              alt={trailer.title}
              width={300}
              height={200}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <button className="text-white text-2xl">
                <i className="fas fa-play"></i>
              </button>
            </div>
            <div className="text-center mt-2 text-white">
              <h3 className="text-sm font-semibold">{trailer.title}</h3>
              <p className="text-xs text-gray-300">Now Playing</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTrailers;
