import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface MoviePopoverProps {
  movie: any;
  onClose: () => void;
}

const SearchPop: React.FC<MoviePopoverProps> = ({ movie, onClose }) => {
  const handleGoogleSearch = () => {
    const searchQuery = encodeURIComponent(`${movie.title} ${movie.release_date?.split('-')[0] || ''} movie reviews`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" >
      <div 
        className="bg-gray-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
        </div>
        
        <div className="p-6 -mt-12 relative">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
                {movie.release_date && (
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                )}
              </div>
            </div>
            <button
              onClick={handleGoogleSearch}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Search Reviews</span>
            </button>
          </div>
          
          <p className="text-gray-300 mb-4 line-clamp-3">{movie.overview}</p>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPop;