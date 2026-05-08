const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getStories,
  getStory,
  toggleBookmark,
  getBookmarks,
} = require('../controllers/storyController');

router.get('/', getStories);
router.get('/bookmarks', protect, getBookmarks);
router.get('/:id', getStory);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
