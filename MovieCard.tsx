import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onLike: () => void;
  onSkip: () => void;
}

export function MovieCard({ movie, onLike, onSkip }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateY: 180 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="perspective-1000 max-w-2xl mx-auto"
    >
      <div className="relative group transform-style-3d transition-transform duration-1000 hover:rotate-y-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-[500px]">
            <motion.img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              layoutId={`movie-image-${movie.id}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <motion.div
              className="absolute bottom-0 left-0 p-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
              <div className="flex items-center space-x-4 text-sm mb-4">
                <span className="bg-purple-600 px-3 py-1 rounded-full">
                  {movie.genre}
                </span>
                <span className="opacity-75">{movie.year}</span>
                <div className="flex items-center">
                  <Star
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                  />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-sm opacity-75 line-clamp-3 max-w-xl">
                {movie.description}
              </p>
              {movie.director !== 'Unknown' && (
                <div className="mt-2 text-sm opacity-75">
                  Directed by {movie.director}
                </div>
              )}
            </motion.div>
          </div>
          <motion.div
            className="p-8 flex justify-center space-x-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={onSkip}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12"
            >
              Skip
            </button>
            <button
              onClick={onLike}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-rotate-12"
            >
              Watch
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}