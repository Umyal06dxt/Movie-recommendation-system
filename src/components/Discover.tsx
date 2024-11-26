import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Shuffle, Star } from "lucide-react";
import { fetchRandomMovies, getMovieDetails } from "../services/movieService";
import MoviePopover from "./MoviePopover";

const Discover: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [popupMovie, setPopupMovie] = useState<any>(null);

  useEffect(() => {
    loadMovies();
  }, [searchParams]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const isRandom = searchParams.get("random") === "true";
      if (isRandom) {
        const randomMovie = await fetchRandomMovies(1);
        if (randomMovie.length > 0) {
          const details = await getMovieDetails(randomMovie[0].id);
          setSelectedMovie(details);
          setMovies([]);
        }
      } else {
        const randomMovies = await fetchRandomMovies(12);
        setMovies(randomMovies);
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (selectedMovie) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl overflow-hidden"
          >
            <div className="relative h-96">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 flex items-end">
                <img
                  src={`https://image.tmdb.org/t/p/w342${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-48 rounded-lg shadow-2xl cursor-pointer"
                  onClick={() => setPopupMovie(selectedMovie)}
                />
                <div className="ml-8 text-white">
                  <h1 className="text-4xl font-bold mb-2">{selectedMovie.title}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span>{selectedMovie.vote_average.toFixed(1)}</span>
                    </div>
                    <span>{selectedMovie.release_date.split("-")[0]}</span>
                    <span>{selectedMovie.runtime} min</span>
                  </div>
                  <button
                    onClick={loadMovies}
                    className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Try Another Random Movie</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-lg text-gray-300 mb-6">{selectedMovie.overview}</p>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Discover Movies</h1>
          <button
            onClick={loadMovies}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Shuffle Movies</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setPopupMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {movie.vote_average.toFixed(1)}
                  <span className="mx-2">•</span>
                  {new Date(movie.release_date).getFullYear()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {popupMovie && (
        <MoviePopover movie={popupMovie} onClose={() => setPopupMovie(null)} />
      )}
    </div>
  );
};

export default Discover;