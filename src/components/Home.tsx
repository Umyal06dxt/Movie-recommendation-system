import React from "react";
import { motion } from "framer-motion";
import { Clapperboard, Search, Star, Tv } from "lucide-react";
import ScrollingPosters from "./ScrollingPosters";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Discover Movies",
      description: "Find hidden gems and popular hits",
      action: () => navigate("/discover"),
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Get Recommendations",
      description: "Personalized suggestions just for you",
      action: () => navigate("/recommendations"),
    },
    {
      icon: <Tv className="w-8 h-8" />,
      title: "Track Shows",
      description: "Keep up with your favorite series",
      action: () => navigate("/shows"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3')] opacity-20 bg-cover bg-center" />

      <ScrollingPosters />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Clapperboard className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            CineSense
          </h1>
          <p className="text-2xl text-gray-300 mb-12">
            Your Personal Movie Adventure Starts Here
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={feature.action}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-opacity-70 transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <div className="flex justify-center mb-4 text-purple-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;