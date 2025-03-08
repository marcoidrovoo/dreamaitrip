// Replace with your actual API key
const OPENAI_API_KEY = 'your-api-key-here';

async function generateItinerary(userInput) {
  try {
    const response = await fetch('https://dreamaitrip.onrender.com/generate-itinerary', {      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: "You are a travel expert creating detailed itineraries."
          },
          {
            role: "user",
            content: `Create a detailed travel itinerary for: ${userInput}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    return 'Failed to generate itinerary';
  }
}