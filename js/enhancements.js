// This file adds extra features to our itinerary page
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SHARE BUTTON
    const shareButton = document.querySelector('button i.fa-share-alt').parentNode;
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            // Just copy the URL to clipboard for now
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard! You can now share it.');
            });
        });
    }
    
    // 2. PRINT BUTTON
    // This one already works! It uses the built-in window.print()
    
    // 3. DOWNLOAD PDF BUTTON
    // We'll leave this for later - it requires an external library
    
    // 4. MAKE THE DESTINATION SHOW UP CORRECTLY
    const destination = localStorage.getItem('destination');
    if (destination) {
        // Update all places that should show the destination
        document.querySelectorAll('.destination-placeholder').forEach(el => {
            el.textContent = destination;
        });
    }
    
    // 5. ADD A "NEW ITINERARY" BUTTON
    const navButtons = document.querySelector('nav .flex.space-x-4');
    if (navButtons) {
        const newButton = document.createElement('button');
        newButton.className = 'px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100';
        newButton.innerHTML = '<i class="fas fa-plus mr-2"></i> New Itinerary';
        newButton.addEventListener('click', function() {
            if (confirm('Create a new itinerary?')) {
                window.location.href = 'index.html';
            }
        });
        navButtons.appendChild(newButton);
    }
});

// 6. ADD A TRIP COUNTDOWN
const departureDate = localStorage.getItem('departureDate');
if (departureDate) {
    // Create a countdown element
    const countdownDiv = document.createElement('div');
    countdownDiv.className = 'bg-white rounded-lg p-4 mt-4 mb-8 shadow-sm';
    
    const today = new Date();
    const tripDate = new Date(departureDate);
    const daysLeft = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
    
    countdownDiv.innerHTML = `
        <h3 class="font-bold mb-2">Trip Countdown</h3>
        <div class="flex justify-between mb-2">
            <span>Days until your trip:</span>
            <span class="font-bold">${daysLeft > 0 ? daysLeft : 'Trip has started!'}</span>
        </div>
    `;
    
    // Add the countdown after the map section
    const mapSection = document.querySelector('.map-container').parentNode;
    mapSection.after(countdownDiv);
}