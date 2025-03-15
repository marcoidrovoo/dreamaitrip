const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Add this if needed

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create API endpoint for generating itineraries
app.post('/generate-itinerary', async (req, res) => {
  try {
    const { destination, departure, departureDate, returnDate, budget, adults, children, interests } = req.body;
    
    const prompt = `Create a detailed travel itinerary for a trip to ${destination} from ${departure}.
Trip dates: ${departureDate} to ${returnDate}
Budget: $${budget}
Travelers: ${adults} adults, ${children} children
Interests: ${interests || 'general sightseeing'}

Include daily activities, recommended accommodations, and approximate costs.`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a travel expert creating detailed itineraries." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });
    
    res.json({ itinerary: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

// Enhanced Unsplash API endpoint
app.get('/api/images', async (req, res) => {
  const { query, count = 6 } = req.query;
  
  try {
    // Call Unsplash API using server-side key
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the data in a more usable way
    const images = data.results.map(img => ({
      url: img.urls.regular,
      alt: img.alt_description || query,
      photographer: img.user.name,
      photographerUrl: img.user.links.html
    }));
    
    // Send back the formatted data
    res.json(images);
    
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ 
      error: 'Failed to fetch images',
      message: error.message 
    });
  }
});

// Keep the existing endpoint for compatibility (forwards to the new one)
app.get('/api/unsplash/:query', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(req.params.query)}&per_page=8`,
      {
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
      }
    );
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Add placeholder image endpoint
app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  const text = req.query.text || 'Placeholder';
  
  // Redirect to a placeholder service
  res.redirect(`https://placehold.co/${width}x${height}?text=${encodeURIComponent(text)}`);
});

// Set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});