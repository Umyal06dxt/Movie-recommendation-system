import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { MovieQuestionnaire } from './components/MovieQuestionnaire';
import { LikedMovieGrid } from './components/LikedMovieGrid';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useMovieRecommendations } from './hooks/useMovieRecommendations';

function App() {
  const {
    currentMovie,
    likedMovies,
    loading,
    error,
    handleLike,
    handleSkip,
    showQuestionnaire,
    handleQuestionnaireComplete
  } = useMovieRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {error && (
          <div className="text-red-500 text-center mb-8">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {showQuestionnaire ? (
            <MovieQuestionnaire onComplete={handleQuestionnaireComplete} />
          ) : loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-96"
            >
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </motion.div>
          ) : !currentMovie ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.h2 
                className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [-1, 1, -1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Ready to discover your next favorite movie?
              </motion.h2>
              <motion.button
                onClick={handleSkip}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-2 mx-auto transition-all duration-300 transform hover:scale-105 hover:rotate-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shuffle className="w-6 h-6" />
                <span>Find Me a Movie</span>
              </motion.button>
            </motion.div>
          ) : (
            <MovieCard
              movie={currentMovie}
              onLike={handleLike}
              onSkip={handleSkip}
            />
          )}
        </AnimatePresence>

        {likedMovies.length > 0 && <LikedMovieGrid movies={likedMovies} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;