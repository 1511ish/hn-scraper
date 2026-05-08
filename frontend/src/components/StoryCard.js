import React, { useState } from 'react';
import { toggleBookmark } from '../api';
import { useAuth } from '../context/AuthContext';

const formatTime = (raw) => {
  if (!raw) return '';

  // raw looks like "2026-05-07T20:23:37 1778185417"
  // we only need the date part before the space
  const datePart = raw.split(' ')[0];

  const date = new Date(datePart + 'Z'); // Z tells JS it's UTC
  if (isNaN(date)) return raw; // fallback to raw if parsing fails

  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const StoryCard = ({ story, rank }) => {
  const { user, updateBookmarks } = useAuth();
  const [bookmarking, setBookmarking] = useState(false);

  const isBookmarked = user?.bookmarks?.includes(story._id);

  const handleBookmark = async () => {
    if (!user) return;
    setBookmarking(true);
    try {
      const { data } = await toggleBookmark(story._id);
      updateBookmarks(data.bookmarks);
    } catch (err) {
      console.error('Bookmark failed:', err);
    } finally {
      setBookmarking(false);
    }
  };

  const domain = story.url
    ? (() => {
        try {
          return new URL(story.url).hostname.replace('www.', '');
        } catch {
          return '';
        }
      })()
    : '';

  return (
    <div className={`story-card ${isBookmarked ? 'bookmarked' : ''}`}>
      <div className="story-rank">{rank}</div>
      <div className="story-content">
        <div className="story-title-row">
          <a
            href={story.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="story-title"
          >
            {story.title}
          </a>
          {domain && <span className="story-domain">({domain})</span>}
        </div>
        <div className="story-meta">
          <span className="meta-points">▲ {story.points} pts</span>
          <span className="meta-sep">·</span>
          <span className="meta-author">by {story.author}</span>
          <span className="meta-sep">·</span>
          <span className="meta-time">{formatTime(story.postedAt)}</span>
        </div>
      </div>
      {user && (
        <button
          className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          disabled={bookmarking}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      )}
    </div>
  );
};

export default StoryCard;
