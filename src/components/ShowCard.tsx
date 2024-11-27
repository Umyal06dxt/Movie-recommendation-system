import React from "react";
import { motion } from "framer-motion";
import { Star, Plus, Check } from "lucide-react";
import type { TVShow } from "../services/tvService";
import MoviePopover from "./MoviePopover";

interface ShowCardProps {
  show: TVShow;
  isTracked: boolean;
  onToggleTrack: (show: TVShow) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, isTracked, onToggleTrack }) => {
  const [showPopover, setShowPopover] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopover(true);
  };

  const movieData = {
    ...show,
    title: show.name,
    release_date: show.first_air_date,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={handleClick}
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleTrack(show);
              }}
              className={`p-2 rounded-full ${
                isTracked
                  ? "bg-purple-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {isTracked ? (
                <Check className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{show.name}</h3>
          <div className="flex items-center text-gray-400 text-sm mb-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {show.vote_average.toFixed(1)}
            <span className="mx-2">•</span>
            {new Date(show.first_air_date).getFullYear()}
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{show.overview}</p>
        </div>
      </motion.div>

      {showPopover && (
        <MoviePopover
          movie={movieData}
          onClose={() => setShowPopover(false)}
          isShow={true}
        />
      )}
    </>
  );
};

export default ShowCard;