document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the form page
  const itineraryForm = document.getElementById('itinerary-form');
  
  if (itineraryForm) {
    itineraryForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Show loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-indicator';
      loadingDiv.innerHTML = '<p>Creating your personalized itinerary...</p>';
      document.body.appendChild(loadingDiv);
      
      // Get form data
      const userInput = {
        destination: document.getElementById('destination').value,
        departure: document.getElementById('departure').value,
        departureDate: document.getElementById('departure-date').value,
        returnDate: document.getElementById('return-date').value,
        budget: document.getElementById('budget').value,
        adults: document.getElementById('adults').value || 1,
        children: document.getElementById('children').value || 0,
        interests: getSelectedInterests()
      };
      
      // Save basic data in localStorage
      localStorage.setItem('destination', userInput.destination);
      localStorage.setItem('departure', userInput.departure);
      localStorage.setItem('departureDate', userInput.departureDate);
      localStorage.setItem('returnDate', userInput.returnDate);
      
      try {
        // Call API to generate itinerary
        const itineraryText = await generateItinerary(userInput);
        
        // Store the result
        localStorage.setItem('generatedItinerary', itineraryText);
        
        // Redirect to itinerary page
        window.location.href = 'free-itinerary.html';
      } catch (error) {
        console.error('Error generating itinerary:', error);
        loadingDiv.innerHTML = '<p>Sorry, there was an error generating your itinerary. Please try again.</p>';
      }
    });
  }
  
  // Helper function to get selected interests
  function getSelectedInterests() {
    const interests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(el => {
      interests.push(el.value);
    });
    return interests.join(', ');
  }
});