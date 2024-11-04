import { motion } from "framer-motion";
import React from "react";
import { Heart, Menu, Popcorn, Search, Star } from "lucide-react";
import { searchMovies } from "../services/tmdb";
import { Movie } from "../types/movie";

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails = ({ movie, onClose }: MovieDetailsProps) => {
  if (!movie) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 max-w-2xl w-full relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <motion.img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full md:w-64 h-96 object-cover rounded-lg shadow-2xl"
            layoutId={`search-movie-${movie.id}`}
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-purple-400 mb-4">{movie.year}</p>
            <p className="text-gray-300 mb-4 line-clamp-4">{movie.description}</p>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-5 h-5" fill="currentColor" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-colors"
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await searchMovies(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <motion.nav
        className="fixed w-full z-50 bg-black/80 backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Popcorn className="w-8 h-8 text-purple-500" />
              </motion.div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    Discover
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    Categories
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 w-64"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute mt-2 w-full bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl z-10 overflow-hidden">
                      <ul className="max-h-96 overflow-auto">
                        {searchResults.map((movie) => (
                          <li
                            key={movie.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-700/50 cursor-pointer transition-colors"
                            onClick={() => handleMovieClick(movie)}
                          >
                            <img
                              src={movie.imageUrl}
                              alt={movie.title}
                              className="w-10 h-14 object-cover rounded"
                            />
                            <div>
                              <p className="text-white font-medium">{movie.title}</p>
                              <p className="text-gray-400 text-sm">
                                {movie.year}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <Heart className="w-6 h-6 text-gray-300" />
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600 hover:text-white"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-600 hover:text-white"
            >
              Categories
            </a>
          </div>
        </motion.div>
      </motion.nav>
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}
    </>
  );
}