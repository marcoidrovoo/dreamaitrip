const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
// Add these new imports
const path = require('path');
const fs = require('fs');

// Add this for fetch API
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

// Serve static files
app.use(express.static('./'));

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

// New endpoint for Unsplash images
app.get('/api/unsplash-images', async (req, res) => {
  try {
    const destination = req.query.destination;
    const count = req.query.count || 8;
    
    if (!destination) {
      return res.status(400).json({ error: 'Destination is required' });
    }
    
    // Clean up the destination for better search results
    const searchTerm = destination.split(',')[0].trim();
    
    // Make request to Unsplash API
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images from Unsplash');
    }

    const data = await response.json();
    
    // Format the response
    const images = data.results.map(image => ({
      url: image.urls.regular,
      thumb: image.urls.small,
      alt: image.alt_description || `Photo of ${destination}`,
      credit: {
        name: image.user.name,
        link: image.user.links.html
      }
    }));
    
    res.json({ images });
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// Set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});