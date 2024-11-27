import axios from "axios";

const API_KEY = "25124425de0e7de6dbf9bebce9fc2aec";
const BASE_URL = "https://api.themoviedb.org/3";

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export const fetchPopularShows = async (page: number = 1): Promise<TVShow[]> => {
  const response = await axios.get(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response.data.results;
};

export const searchShows = async (query: string): Promise<TVShow[]> => {
  const response = await axios.get(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=1`
  );
  return response.data.results;
};

export const fetchShowDetails = async (id: number) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};