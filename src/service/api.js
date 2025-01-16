import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzBiNmNiMDdiYWM2Yjg4OThmOWZhYzA1MjEyYzNlOSIsIm5iZiI6MTczNjg4Mzk4Mi4zMDcwMDAyLCJzdWIiOiI2Nzg2YmYwZTFmYzBlYzdmMDg3YjFhYTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xee-BHU3Ngj2ARUbGtaGBU32zoQMu9pS9il8tU9MKxg";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const getPopularMovies = async () => {
  const response = await axios.get("trending/movie/day", options);
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
