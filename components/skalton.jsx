// components/SkeletonLoader.js
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 h-44 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonLoader;
