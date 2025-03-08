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
        itineraryForm.appendChild(loadingDiv);
        
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
    
    // Check if we're on the itinerary page
    if (window.location.href.includes('free-itinerary.html')) {
      // Get the data from localStorage
      const destination = localStorage.getItem('destination') || 'Barcelona';
      const departure = localStorage.getItem('departure') || 'New York';
      const departureDate = localStorage.getItem('departureDate') || '2025-05-15';
      const returnDate = localStorage.getItem('returnDate') || '2025-05-22';
      const generatedItinerary = localStorage.getItem('generatedItinerary');
      
      // Update the itinerary page with the user's data
      document.querySelectorAll('.destination-placeholder').forEach(el => {
        el.textContent = destination;
      });
      
      document.querySelectorAll('.departure-placeholder').forEach(el => {
        el.textContent = departure;
      });
      
      const formattedDates = `${formatDate(departureDate)} to ${formatDate(returnDate)}`;
      document.querySelectorAll('.dates-placeholder').forEach(el => {
        el.textContent = formattedDates;
      });
      
      // If we have a generated itinerary, display it
      if (generatedItinerary) {
        const itineraryContainer = document.getElementById('generated-itinerary-content');
        if (itineraryContainer) {
          itineraryContainer.innerHTML = formatItineraryText(generatedItinerary);
        }
      }
    }
    
    // Helper function to format dates
    function formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    
    // Helper function to get selected interests
    function getSelectedInterests() {
      const interests = [];
      document.querySelectorAll('input[name="interests"]:checked').forEach(el => {
        interests.push(el.value);
      });
      return interests.join(', ');
    }
    
    // Helper function to format itinerary text with HTML
    function formatItineraryText(text) {
      // Convert line breaks to <br> and paragraphs to <p> tags
      return text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    }
  });