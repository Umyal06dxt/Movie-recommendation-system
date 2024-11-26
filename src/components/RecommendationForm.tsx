import React, { useState } from "react";
import { motion } from "framer-motion";
import { Film, Clock, Smile } from "lucide-react";
import { getRecommendations } from "../services/movieService";
import MoviePopover from "./MoviePopover";

const genres = [
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "99", name: "Documentary" },
  { id: "18", name: "Drama" },
  { id: "10751", name: "Family" },
  { id: "14", name: "Fantasy" },
  { id: "36", name: "History" },
  { id: "27", name: "Horror" },
  { id: "10402", name: "Music" },
  { id: "9648", name: "Mystery" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Science Fiction" },
  { id: "53", name: "Thriller" },
];

const moods = ["Happy", "Sad", "Excited", "Relaxed"];
const durations = ["Short", "Medium", "Long"];

const RecommendationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [duration, setDuration] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const results = await getRecommendations({
        genres: selectedGenres,
        mood,
        duration
      });
      setRecommendations(results);
      setStep(4);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-2xl mx-auto pt-28">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Get Personalized Movie Recommendations
        </h1>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Select Your Favorite Genres</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {genres.map(genre => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`p-3 rounded-lg transition-colors ${
                    selectedGenres.includes(genre.id)
                      ? "bg-purple-500 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={selectedGenres.length === 0}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Smile className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">What's Your Current Mood?</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => {
                    setMood(m);
                    setStep(3);
                  }}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {m}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gray-800 p-3 rounded-lg"
            >
              Back
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Preferred Movie Duration</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {durations.map(d => (
                <button
                  key={d}
                  onClick={() => {
                    setDuration(d);
                    handleSubmit();
                  }}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {d}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-gray-800 p-3 rounded-lg"
            >
              Back
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-4">Your Recommendations</h2>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recommendations.slice(0, 6).map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-gray-400">
                        Rating: {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg"
            >
              Start Over
            </button>
          </motion.div>
        )}

        {selectedMovie && (
          <MoviePopover movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    </div>
  );
};

export default RecommendationForm;