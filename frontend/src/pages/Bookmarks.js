import React, { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { fetchBookmarks } from '../api';

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchBookmarks();
        setStories(data);
      } catch {
        setError('Failed to load bookmarks.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>★ Bookmarks</h1>
          <p className="page-subtitle">Your saved stories</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading bookmarks...</p>
        </div>
      ) : stories.length === 0 ? (
        <div className="empty-state">
          <p>No bookmarks yet. Star stories from the home page!</p>
          <a href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
            Browse Stories
          </a>
        </div>
      ) : (
        <div className="stories-list">
          {stories.map((story, i) => (
            <StoryCard key={story._id} story={story} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
