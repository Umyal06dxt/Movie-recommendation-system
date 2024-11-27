import axios from "axios";

const API_KEY = "25124425de0e7de6dbf9bebce9fc2aec";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
  );
  return response.data.results;
};

export const fetchRandomMovies = async (count: number = 12): Promise<Movie[]> => {
  const page = Math.floor(Math.random() * 5) + 1;
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`
  );
  return response.data.results
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

export const getMovieReviews = async (id: number) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

export const fetchMoviePosters = async (type: "popular" | "top_rated"): Promise<string[]> => {
  const response = await axios.get(
    `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results
    .filter((movie: Movie) => movie.poster_path)
    .map((movie: Movie) => `https://image.tmdb.org/t/p/w342${movie.poster_path}`);
};

export const getWatchProviders = async (id: number, isShow: boolean = false): Promise<{ results: { US?: { flatrate?: WatchProvider[] } } }> => {
  const type = isShow ? 'tv' : 'movie';
  const response = await axios.get(
    `${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`
  );
  return response.data;
};

export const getRecommendations = async (params: {
  genres: string[];
  mood: string;
  duration: string;
}): Promise<Movie[]> => {
  let query = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US`;
  
  if (params.genres.length > 0) {
    query += `&with_genres=${params.genres.join(",")}`;
  }


  switch (params.mood.toLowerCase()) {
    case "happy":
      query += "&with_genres=35,10751&sort_by=popularity.desc";
      break;
    case "sad":
      query += "&with_genres=18&sort_by=vote_average.desc";
      break;
    case "excited":
      query += "&with_genres=28,12&sort_by=popularity.desc";
      break;
    case "relaxed":
      query += "&with_genres=99,36&sort_by=vote_average.desc";
      break;
    default:
      query += "&sort_by=popularity.desc";
  }

  
  switch (params.duration.toLowerCase()) {
    case "short":
      query += "&with_runtime.lte=90";
      break;
    case "medium":
      query += "&with_runtime.gte=90&with_runtime.lte=120";
      break;
    case "long":
      query += "&with_runtime.gte=120";
      break;
  }

  const response = await axios.get(query);
  return response.data.results;
};