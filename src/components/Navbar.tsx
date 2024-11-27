import React, { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Github,
  Mail,
  Clapperboard,
  Shuffle,
  Quote,
} from "lucide-react";
import { searchMovies } from "../services/movieService";
// import MoviePopover from "./MoviePopover";
import SearchPop from "./SearchPop";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const blurTimeout = useRef<number | null>(null);
 

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const results = await searchMovies(query);
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleBlur = () => {
    blurTimeout.current = window.setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleFocus = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
    }
    setShowResults(true);
  };

  const handleSelectMovie = (movie: any) => {
    setSelectedMovie(movie);
    setShowResults(false); // Hide results when a movie is selected
  };

  const handleRandomMovie = () => {
    navigate("/discover");
  };

  
  return (
    <>
      <nav className="bg-gray-800 bg-opacity-95 backdrop-blur-sm fixed w-full z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
              <Clapperboard className="w-6 h-6" />
              <span className="font-bold text-xl">CineSense</span>
            </a>
            
            <div className="hidden md:flex space-x-6">
              <a onClick={handleRandomMovie} className="text-gray-300 hover:text-white">Discover</a>
              <a onClick={() => navigate("/recommendations")} className="text-gray-300 hover:text-white">Recommendations</a>
              <a onClick={() => navigate("/shows")} className="text-gray-300 hover:text-white">TV Shows</a>
              <a onClick={() => navigate("/reviews")} className="text-gray-300 hover:text-white flex items-center space-x-2 hover:pointer-events-auto">
                <Quote className="w-4 h-4" />
                <span>Reviews</span>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
          <div className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search any movie..."
            value={searchQuery}
            onChange={handleSearch}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="w-64 bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {showResults && searchResults.length > 0 && (
          <div
            className="absolute top-full left-0 w-full mt-2 bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from triggering
          >
            {searchResults.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
                className="block p-3 hover:bg-gray-700 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
          
            <button
              onClick={handleRandomMovie}
              className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Random Movie</span>
            </button>

   
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Umyal06dxt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:umyal06dixit@gmail.com"
                className="text-gray-300 hover:text-white"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {selectedMovie && (
        <SearchPop
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default Navbar;