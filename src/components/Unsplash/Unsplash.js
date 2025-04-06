// src/api/Unsplash.jsx
import axios from 'axios';

const ACCESS_KEY = 'mKkh-Y14DNYboULiiDnRKoej-5rAsS99EYQxCm4FxDA';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: perPage,
      client_id: ACCESS_KEY,
    },
  });

  return response.data.results;
};
