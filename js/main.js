document.addEventListener('DOMContentLoaded', function() {
    const itineraryForm = document.getElementById('itinerary-form');
    
    if (itineraryForm) {
      itineraryForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading spinner
        document.getElementById('loading').style.display = 'block';
        
        // Get form data
        const destination = document.getElementById('destination').value;
        const departure = document.getElementById('departure').value;
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        const budget = document.getElementById('budget').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        
        // Prepare input for OpenAI
        const userInput = `Destination: ${destination}, Departure from: ${departure}, 
                           Dates: ${departureDate} to ${returnDate}, Budget: $${budget}, 
                           Travelers: ${adults} adults, ${children} children`;
        
        // Call OpenAI API
        const itineraryText = await generateItinerary(userInput);
        
        // For now, just redirect to the free itinerary template
        localStorage.setItem('generatedItinerary', itineraryText);
        window.location.href = 'free-itinerary.html';
      });
    }
  });