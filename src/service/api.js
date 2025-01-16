import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const getPopularMovies = async (page) => {
  const response = await axios.get("trending/movie/day", {
    ...options,
    params: {
      ...options.params,
      page: `${page}`,
    },
  });
  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`movie/${id}`, options);
  return response.data;
};

export const getMovieCasts = async (id) => {
  const response = await axios.get(`movie/${id}/credits`, options);
  return response.data;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get(`movie/${id}/reviews`, options);
  return response.data;
};

export const getMoviesByQuery = async (query) => {
  const response = await axios.get(`search/movie`, {
    ...options,
    params: {
      ...options.params,
      query,
    },
  });
  return response.data;
};
