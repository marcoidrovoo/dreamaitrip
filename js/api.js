async function generateItinerary(userInput) {
    try {
      // Replace with your actual backend URL when deployed
      // For local testing, you might use: http://localhost:3000/generate-itinerary
      const response = await fetch('https://dreamaitrip.onrender.com/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput)
      });
  
      const data = await response.json();
      return data.itinerary;
    } catch (error) {
      console.error('Error:', error);
      return 'Failed to generate itinerary';
    }
  }
  
  // Make the function available globally
  window.generateItinerary = generateItinerary;
  