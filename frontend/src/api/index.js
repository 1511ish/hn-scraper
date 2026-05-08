import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Stories
export const fetchStories = () => api.get('/stories');
export const fetchStory = (id) => api.get(`/stories/${id}`);
export const toggleBookmark = (id) => api.post(`/stories/${id}/bookmark`);
export const fetchBookmarks = () => api.get('/stories/bookmarks');

// Scraper
export const triggerScrape = () => api.post('/scrape');

export default api;
