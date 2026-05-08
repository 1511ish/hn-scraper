const express = require('express');
const router = express.Router();
const {
  getStories,
  getStory,
  toggleBookmark,
  getBookmarks,
} = require('../controllers/storyController');

router.get('/', getStories);
router.get('/bookmarks', getBookmarks);
router.get('/:id', getStory);
router.post('/:id/bookmark', toggleBookmark);

module.exports = router;
