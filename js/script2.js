document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itinerary-form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Stop the page from reloading

        // Collect user input from form fields
        const userInput = {
            destination: document.getElementById('destination').value,
            departure: document.getElementById('departure').value,
            departureDate: document.getElementById('departure-date').value,
            returnDate: document.getElementById('return-date').value,
            budget: parseInt(document.getElementById('budget').value),
            adults: parseInt(document.getElementById('adults').value),
            children: parseInt(document.getElementById('children').value),
            interests: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.nextElementSibling.innerText),
            additionalInfo: document.getElementById('additional').value,
            premium: document.getElementById('premium').checked
        };

        console.log('Submitting:', userInput);

        try {
            const itinerary = await generateItinerary(userInput);
            console.log('Generated Itinerary:', itinerary);
            alert('Itinerary created successfully! Check console for details.');
        } catch (error) {
            console.error('Error creating itinerary:', error);
            alert('Failed to generate itinerary. Please try again.');
        }
    });
});
// Test deployment - just a comment
