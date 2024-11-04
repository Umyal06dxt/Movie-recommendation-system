import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-lg text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About Us</h3>
            <p className="text-gray-400 text-sm">
              Discover your next favorite movie with our personalized recommendation engine.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-gray-400 hover:text-white"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Movies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Action</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Comedy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Drama</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sci-Fi</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates about new movies and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button className="px-4 py-2 bg-purple-600 rounded-r-md hover:bg-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Movie Lovers
          </p>
        </div>
      </div>
    </footer>
  );
}