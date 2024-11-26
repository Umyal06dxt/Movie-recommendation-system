import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fetchRandomMovies, getMovieReviews } from '../services/movieService';

interface Review {
  id: string;
  author: string;
  content: string;
  url?: string;
  author_details?: {
    rating?: number;
  };
  movieTitle: string;
  movieId: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const movies = await fetchRandomMovies(5);
      const reviewsPromises = movies.map(async (movie) => {
        const movieReviews = await getMovieReviews(movie.id);
        return movieReviews.map(review => ({
          ...review,
          movieTitle: movie.title,
          movieId: movie.id,
          content: review.content.length > 300 
            ? `${review.content.slice(0, 300)}...` 
            : review.content
        }));
      });
      
      const allReviews = (await Promise.all(reviewsPromises))
        .flat()
        .filter(review => review.content.length >= 100)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);

      setReviews(allReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
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

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-7xl mx-auto pt-28">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Movie Reviews
          </h1>
          <button
            onClick={loadReviews}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Load New Reviews
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <Quote className="w-8 h-8 text-purple-400 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-purple-400 mb-2">{review.movieTitle}</h2>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{review.author}</h3>
                    {review.author_details?.rating && (
                      <div className="flex items-center text-sm text-gray-400">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{review.author_details.rating}/10</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
                  {review.url && (
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Read full review →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;