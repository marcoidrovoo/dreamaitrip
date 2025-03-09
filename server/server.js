const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

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

// Set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this new route to your existing server.js file, 
// after your existing routes but before the app.listen() line

app.get('/api/unsplash/:query', async (req, res) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${req.params.query}&per_page=8`,
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