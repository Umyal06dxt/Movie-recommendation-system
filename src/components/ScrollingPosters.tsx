import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchMoviePosters } from "../services/movieService";

const ScrollingPosters: React.FC = () => {
  const [leftPosters, setLeftPosters] = useState<string[]>([]);
  const [rightPosters, setRightPosters] = useState<string[]>([]);

  useEffect(() => {
    const loadPosters = async () => {
      try {
        const [popular, topRated] = await Promise.all([
          fetchMoviePosters("popular"),
          fetchMoviePosters("top_rated"),
        ]);
        setLeftPosters([...popular, ...popular]);
        setRightPosters([...topRated, ...topRated]);
      } catch (error) {
        console.error("Error loading posters:", error);
      }
    };

    loadPosters();
  }, []);

  return (
    <>
      {/* Left Scrolling Posters */}
      <div className="fixed left-0 top-0 w-48 h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ y: { duration: 60, repeat: Infinity, ease: "linear" } }}
          className="space-y-4 py-4"
        >
          {leftPosters.map((poster, index) => (
            <motion.img
              key={index}
              src={poster}
              alt={`Movie Poster ${index}`}
              className="w-full rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Right Scrolling Posters */}
      <div className="fixed right-0 top-0 w-48 h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ y: { duration: 60, repeat: Infinity, ease: "linear" } }}
          className="space-y-4 py-4"
        >
          {rightPosters.map((poster, index) => (
            <motion.img
              key={index}
              src={poster}
              alt={`Movie Poster ${index}`}
              className="w-full rounded-lg shadow-lg"
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default ScrollingPosters;