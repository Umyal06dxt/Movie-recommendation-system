import React, { useEffect, useState } from 'react';
import { Star, Play, Search, ThumbsUp, Monitor } from 'lucide-react';
import { getWatchProviders } from '../services/movieService';

interface MoviePopoverProps {
  movie: any;
  onClose: () => void;
  isShow?: boolean;
}

interface Provider {
  provider_name: string;
  logo_path: string;
}

const MoviePopover: React.FC<MoviePopoverProps> = ({ movie, onClose, isShow = false }) => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const data = await getWatchProviders(movie.id, isShow);
        if (data?.results?.US?.flatrate) {
          setProviders(data.results.US.flatrate);
        }
      } catch (error) {
        console.error('Error loading providers:', error);
      }
    };
    loadProviders();
  }, [movie.id, isShow]);

  const handleGoogleSearch = () => {
    const searchQuery = encodeURIComponent(`${movie.title} ${movie.release_date?.split('-')[0] || ''}`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const handleRottenTomatoes = () => {
    const searchQuery = encodeURIComponent(`${movie.title} ${movie.release_date?.split('-')[0] || ''}movie reviews`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  const handleTrailer = () => {
    const searchQuery = encodeURIComponent(`${movie.title} ${movie.release_date?.split('-')[0] || ''} official trailer`);
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
        </div>
        
        <div className="p-6 -mt-12 relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
                {movie.release_date && (
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">{movie.overview}</p>
          
          {providers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center">
                <Monitor className="w-4 h-4 mr-2" />
                Available on:
              </h4>
              <div className="flex space-x-3">
                {providers.map((provider) => (
                  <img
                    key={provider.provider_name}
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                    className="w-8 h-8 rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={handleTrailer}
              className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Watch Trailer</span>
            </button>
            
            <button
              onClick={handleRottenTomatoes}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Reviews</span>
            </button>
            
            <button
              onClick={handleGoogleSearch}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search Info</span>
            </button>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePopover;