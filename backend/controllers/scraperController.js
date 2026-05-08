const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
  const { data } = await axios.get('https://news.ycombinator.com', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; HN-Scraper/1.0)',
    },
    timeout: 10000,
  });

  const $ = cheerio.load(data);

  const stories = [];

  // Each story occupies two rows: .athing (title row) and the subtext row
  $('.athing').each((i, el) => {
    if (i >= 10) return false; // top 10 only

    const titleRow = $(el);
    const subtextRow = titleRow.next(); // the subtext row

    const hnId = titleRow.attr('id');
    const titleEl = titleRow.find('.titleline > a').first();
    const title = titleEl.text().trim();
    const url = titleEl.attr('href') || '';

    const subtext = subtextRow.find('.subtext');
    const points = parseInt(subtext.find('.score').text()) || 0;
    const author = subtext.find('.hnuser').text().trim() || 'unknown';
    const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text().trim() || '';
    console.log("postedAt: ", postedAt);
    if (title) {
      stories.push({ hnId, title, url, points, author, postedAt });
    }
  });

  // Upsert stories by hnId to avoid duplicates
  const ops = stories.map((story) => ({
    updateOne: {
      filter: { hnId: story.hnId },
      update: { $set: story },
      upsert: true,
    },
  }));

  if (ops.length > 0) {
    await Story.bulkWrite(ops);
  }

  return stories;
};

const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.json({ message: `Scraped ${stories.length} stories successfully`, count: stories.length });
  } catch (error) {
    res.status(500).json({ message: 'Scraping failed', error: error.message });
  }
};

module.exports = { scrapeHackerNews, triggerScrape };
