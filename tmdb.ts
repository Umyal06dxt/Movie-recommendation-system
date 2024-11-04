import axios from 'axios';
import { Movie } from '../types/movie';

const TMDB_API_KEY = '25124425de0e7de6dbf9bebce9fc2aec';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

interface TMDBMovie {
  id: number;
  title: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results.map((movie: TMDBMovie) => ({
    id: movie.id,
    title: movie.title,
    genre: GENRE_MAP[movie.genre_ids[0]] || 'Unknown',
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average,
    imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
    description: movie.overview,
    director: 'Unknown',
  }));
}

export async function getMovieRecommendations(movieId: number): Promise<Movie[]> {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results.map((movie: TMDBMovie) => ({
    id: movie.id,
    title: movie.title,
    genre: GENRE_MAP[movie.genre_ids[0]] || 'Unknown',
    year: new Date(movie.release_date).getFullYear(),
    rating: movie.vote_average,
    imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
    description: movie.overview,
    director: 'Unknown',
  }));
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
      language: 'en-US',
      page: 1,
    },
  });

  return response.data.results
    .filter((movie: TMDBMovie) => movie.poster_path) // Only return movies with posters
    .map((movie: TMDBMovie) => ({
      id: movie.id,
      title: movie.title,
      genre: GENRE_MAP[movie.genre_ids[0]] || 'Unknown',
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average,
      imageUrl: `${IMAGE_BASE_URL}${movie.poster_path}`,
      description: movie.overview,
      director: 'Unknown',
    }));
}