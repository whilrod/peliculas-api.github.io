// src/services/tmdb.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER}`,
    accept: 'application/json',
  },
});

export const getNowPlayingMovies = (page = 1) => {
  return api.get('/movie/now_playing', {
    params: {
      language: 'es-ES',
      page: page,
    },
  });
};

export const searchMovies = (query, page = 1) => {
  return api.get('/search/movie', {
    params: {
      query,
      page,
      language: 'es-ES',
    },
  });
};

export default api;
