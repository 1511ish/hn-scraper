require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { scrapeHackerNews } = require('./controllers/scraperController');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stories', require('./routes/storyRoutes'));
app.use('/api/scrape', require('./routes/scraperRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'HN Scraper API running' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await scrapeHackerNews();
    console.log('Initial scrape completed.');
  } catch (err) {
    console.error('Initial scrape failed:', err.message);
  }
});