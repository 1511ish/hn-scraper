import React, { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { fetchStories, triggerScrape } from '../api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState('');

  const loadStories = async () => {
    try {
      setLoading(true);
      const { data } = await fetchStories();
      setStories(data);
    } catch {
      setError('Failed to load stories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleScrape = async () => {
    setScraping(true);
    try {
      await triggerScrape();
      await loadStories();
    } catch {
      setError('Scraping failed.');
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Top Stories</h1>
          <p className="page-subtitle">Latest from Hacker News</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading stories...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="empty-state">
          <p>No stories yet. Click "Refresh Stories" to scrape HN.</p>
        </div>
      ) : (
        <div className="stories-list">
          {stories.map((story, i) => (
            <StoryCard key={story._id} story={story} rank={i + 1} />
          ))}
        </div>
      )}

      {!user && (
        <div className="login-prompt">
          <p>
            <a href="/">Login</a> or <a href="">Register</a> to
            bookmark stories.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
