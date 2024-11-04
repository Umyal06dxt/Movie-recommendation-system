import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { getPopularMovies, getMovieRecommendations } from '../services/tmdb';

interface UseMovieRecommendations {
  currentMovie: Movie | null;
  likedMovies: Movie[];
  loading: boolean;
  error: string | null;
  handleLike: () => void;
  handleSkip: () => void;
  showQuestionnaire: boolean;
  handleQuestionnaireComplete: (preferences: Record<string, string>) => void;
}

export function useMovieRecommendations(): UseMovieRecommendations {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [preferences, setPreferences] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!showQuestionnaire) {
      fetchInitialMovies();
    }
  }, [showQuestionnaire]);

  const fetchInitialMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies();
      const filteredMovies = filterMoviesByPreferences(popularMovies, preferences);
      setMovies(filteredMovies);
      if (filteredMovies.length > 0) {
        setCurrentMovie(filteredMovies[0]);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const filterMoviesByPreferences = (movies: Movie[], prefs: Record<string, string>) => {
    return movies.filter(movie => {
      if (prefs.rating && prefs.rating !== 'Any rating') {
        const minRating = parseInt(prefs.rating.split(' ')[1]);
        if (movie.rating < minRating) return false;
      }

      if (prefs.duration && prefs.duration !== 'No preference') {
        // We'll need runtime data from an additional API call for this
        // For now, we'll skip duration filtering
      }

      if (prefs.mood || prefs.genre) {
        const moodToGenre: Record<string, string[]> = {
          'Happy': ['Comedy', 'Animation', 'Family'],
          'Relaxed': ['Drama', 'Documentary'],
          'Excited': ['Action', 'Adventure', 'Thriller'],
          'Thoughtful': ['Drama', 'Mystery'],
          'Need a good laugh': ['Comedy']
        };

        const preferredGenres = [
          ...(prefs.genre ? [prefs.genre] : []),
          ...(prefs.mood ? moodToGenre[prefs.mood] || [] : [])
        ];

        if (preferredGenres.length > 0 && !preferredGenres.includes(movie.genre)) {
          return false;
        }
      }

      return true;
    });
  };

  const fetchRecommendations = async (movieId: number) => {
    try {
      const recommendations = await getMovieRecommendations(movieId);
      const filteredRecommendations = filterMoviesByPreferences(recommendations, preferences);
      setMovies(prevMovies => [...prevMovies, ...filteredRecommendations]);
    } catch (err) {
      setError('Failed to fetch recommendations');
    }
  };

  const getNextMovie = () => {
    if (movies.length <= 1) {
      if (currentMovie) {
        fetchRecommendations(currentMovie.id);
      }
    }
    
    const nextMovie = movies[1] || null;
    setMovies(prevMovies => prevMovies.slice(1));
    setCurrentMovie(nextMovie);
  };

  const handleLike = () => {
    if (currentMovie) {
      setLikedMovies(prev => [...prev, currentMovie]);
      fetchRecommendations(currentMovie.id);
    }
    getNextMovie();
  };

  const handleSkip = () => {
    getNextMovie();
  };

  const handleQuestionnaireComplete = (prefs: Record<string, string>) => {
    setPreferences(prefs);
    setShowQuestionnaire(false);
  };

  return {
    currentMovie,
    likedMovies,
    loading,
    error,
    handleLike,
    handleSkip,
    showQuestionnaire,
    handleQuestionnaireComplete,
  };
}