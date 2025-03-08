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
  });document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Show loading message
      const loadingElement = document.createElement('div');
      loadingElement.innerText = 'Generating your itinerary...';
      form.appendChild(loadingElement);
      
      // Get form data
      const destination = document.getElementById('destination').value;
      const departureCity = document.getElementById('departure').value;
      const departureDate = document.getElementById('departure-date').value;
      const returnDate = document.getElementById('return-date').value;
      
      // Store the data to use in the itinerary page
      localStorage.setItem('destination', destination);
      localStorage.setItem('departureCity', departureCity);
      localStorage.setItem('dates', `${departureDate} to ${returnDate}`);
      
      // Redirect to itinerary page - for demo purposes
      // In a real implementation, you'd call the OpenAI API here
      setTimeout(() => {
        window.location.href = 'free-itinerary.html';
      }, 2000);
    });
  });