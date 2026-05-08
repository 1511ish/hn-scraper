const Story = require('../models/Story');
const User = require('../models/User');

// Get all stories sorted by points descending
const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ points: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single story by ID
const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle bookmark for a story
const toggleBookmark = async (req, res) => {
  try {
    const storyId = req.params.id;
    const user = await User.findById(req.user._id);

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const isBookmarked = user.bookmarks.includes(storyId);

    if (isBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.json({
      message: isBookmarked ? 'Bookmark removed' : 'Story bookmarked',
      bookmarked: !isBookmarked,
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookmarked stories for logged-in user
const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'bookmarks',
      options: { sort: { points: -1 } },
    });
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStories, getStory, toggleBookmark, getBookmarks };
