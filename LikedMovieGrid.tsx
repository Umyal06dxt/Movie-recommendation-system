import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface LikedMovieGridProps {
  movies: Movie[];
}

export function LikedMovieGrid({ movies }: LikedMovieGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-12"
    >
      <h3 className="text-2xl font-bold mb-6">Your Watchlist</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:rotate-1"
          >
            <div className="relative">
              <motion.img
                src={movie.imageUrl}
                alt={movie.title}
                layoutId={`movie-image-${movie.title}`}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg mb-1">{movie.title}</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-75">{movie.genre}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span>{movie.rating}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}