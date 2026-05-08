require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stories', require('./routes/storyRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'HN Scraper API running' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
