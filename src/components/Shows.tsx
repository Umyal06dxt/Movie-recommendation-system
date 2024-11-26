import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { fetchPopularShows, searchShows, type TVShow } from "../services/tvService";
import ShowCard from "./ShowCard";

const Shows: React.FC = () => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [trackedShows, setTrackedShows] = useState<Set<number>>(
    new Set(JSON.parse(localStorage.getItem("trackedShows") || "[]"))
  );

  useEffect(() => {
    loadShows();
  }, []);

  useEffect(() => {
    localStorage.setItem("trackedShows", JSON.stringify([...trackedShows]));
  }, [trackedShows]);

  const loadShows = async () => {
    setLoading(true);
    try {
      const data = await fetchPopularShows();
      setShows(data);
    } catch (error) {
      console.error("Error loading shows:", error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadShows();
      return;
    }

    setLoading(true);
    try {
      const results = await searchShows(searchQuery);
      setShows(results);
    } catch (error) {
      console.error("Error searching shows:", error);
    }
    setLoading(false);
  };

  const toggleTrackShow = (show: TVShow) => {
    setTrackedShows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(show.id)) {
        newSet.delete(show.id);
      } else {
        newSet.add(show.id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-28">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Track Your Favorite Shows
          </h1>
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-gray-800 text-white rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
                isTracked={trackedShows.has(show.id)}
                onToggleTrack={toggleTrackShow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shows;