document.addEventListener('DOMContentLoaded', function() {
    const itineraryForm = document.getElementById('itinerary-form');
    const resultContainer = document.getElementById('generated-itinerary-content'); // For displaying result

    if (itineraryForm) {
        itineraryForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Show loading spinner
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
                budget: document.getElementById('budget').value || 0,
                adults: document.getElementById('adults').value || 1,
                children: document.getElementById('children').value || 0,
                interests: getSelectedInterests(),
                additionalInfo: document.getElementById('additional-info').value || '',
                premium: document.getElementById('premium').checked
            };

            console.log('Submitting:', userInput);

            try {
                // Save data locally for future use
                localStorage.setItem('destination', userInput.destination);
                localStorage.setItem('departure', userInput.departure);
                localStorage.setItem('departureDate', userInput.departureDate);
                localStorage.setItem('returnDate', userInput.returnDate);

                // Call OpenAI or API to generate itinerary (replace this with actual API call)
                const itineraryText = await generateItinerary(userInput);

                // Save generated itinerary locally
                localStorage.setItem('generatedItinerary', itineraryText);

                // Display result directly on the same page
                displayItinerary(itineraryText);

                // Remove loading spinner
                loadingDiv.remove();

            } catch (error) {
                console.error('Error generating itinerary:', error);
                loadingDiv.innerHTML = '<p>Failed to create itinerary. Please try again!</p>';
            }
        });
    }

    // If we're on the itinerary page, load the stored itinerary
    if (window.location.href.includes('free-itinerary.html')) {
        loadStoredItinerary();
    }

    // Function to generate itinerary (replace this with actual API call)
    async function generateItinerary(userInput) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`
                🏙️ Destination: ${userInput.destination}
                🛫 Departure: ${userInput.departure}
                📅 Dates: ${formatDate(userInput.departureDate)} to ${formatDate(userInput.returnDate)}
                💰 Budget: $${userInput.budget}
                👥 Travelers: ${userInput.adults} adults, ${userInput.children} children
                🎯 Interests: ${userInput.interests}
                ✨ Additional Info: ${userInput.additionalInfo}
                `);
            }, 1500); // Simulate response delay
        });
    }

    // Function to display itinerary
    function displayItinerary(itineraryText) {
        if (resultContainer) {
            resultContainer.innerHTML = formatItineraryText(itineraryText);
        }
    }

    // Function to load itinerary from local storage (for other pages)
    function loadStoredItinerary() {
        const destination = localStorage.getItem('destination') || 'Barcelona';
        const departure = localStorage.getItem('departure') || 'New York';
        const departureDate = localStorage.getItem('departureDate') || '2025-05-15';
        const returnDate = localStorage.getItem('returnDate') || '2025-05-22';
        const generatedItinerary = localStorage.getItem('generatedItinerary');

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

        if (generatedItinerary) {
            resultContainer.innerHTML = formatItineraryText(generatedItinerary);
        }
    }

    // Function to format date
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Function to get selected interests
    function getSelectedInterests() {
        const interests = [];
        document.querySelectorAll('input[name="interests"]:checked').forEach(el => {
            interests.push(el.value);
        });
        return interests.join(', ');
    }

    // Function to format itinerary text with HTML
    function formatItineraryText(text) {
        return text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    }
});
