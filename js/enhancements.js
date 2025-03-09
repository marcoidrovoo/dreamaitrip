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

// Add this function to your enhancements.js file
function addAnimatedCountdown() {
    const departureDate = localStorage.getItem('departureDate');
    if (!departureDate) return;
    
    // Create countdown container
    const countdownContainer = document.createElement('div');
    countdownContainer.className = 'bg-white rounded-xl shadow-sm p-6 mb-10';
    countdownContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 text-center">Countdown to Your Adventure</h3>
      <div class="flex justify-center gap-4 text-center">
        <div class="bg-blue-600 text-white rounded-lg p-3 w-20">
          <span id="countdown-days" class="block text-3xl font-bold">--</span>
          <span class="text-xs">DAYS</span>
        </div>
        <div class="bg-blue-500 text-white rounded-lg p-3 w-20">
          <span id="countdown-hours" class="block text-3xl font-bold">--</span>
          <span class="text-xs">HOURS</span>
        </div>
        <div class="bg-blue-400 text-white rounded-lg p-3 w-20">
          <span id="countdown-minutes" class="block text-3xl font-bold">--</span>
          <span class="text-xs">MINUTES</span>
        </div>
      </div>
    `;
    
    // Insert after upgrade banner
    const upgradeSection = document.querySelector('.upgrade-banner').parentNode;
    upgradeSection.after(countdownContainer);
    
    // Update the countdown every second
    function updateCountdown() {
      const now = new Date();
      const tripDate = new Date(departureDate);
      const diff = tripDate - now;
      
      if (diff <= 0) {
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '0';
        document.getElementById('countdown-minutes').textContent = '0';
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      document.getElementById('countdown-days').textContent = days;
      document.getElementById('countdown-hours').textContent = hours;
      document.getElementById('countdown-minutes').textContent = minutes;
    }
    
    // Update immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
  }
  
  // Call this function when the page loads
  addAnimatedCountdown();

  // Add this function to your enhancements.js file
function addWeatherWidget() {
    const destination = localStorage.getItem('destination');
    if (!destination) return;
    
    // Create weather container
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'bg-white rounded-xl shadow-sm p-6 mb-10';
    weatherContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4">Weather in ${destination}</h3>
      <div id="weather-content" class="text-center py-4">
        <div class="animate-pulse flex space-x-4 justify-center">
          <div class="rounded-full bg-gray-200 h-10 w-10"></div>
          <div class="flex-1 space-y-4 max-w-md">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-500">Loading weather information...</p>
      </div>
    `;
    
    // Insert after map section
    const mapSection = document.querySelector('.map-container').parentNode;
    mapSection.after(weatherContainer);
    
    // For demo purposes only - replace with actual API call
    setTimeout(() => {
      document.getElementById('weather-content').innerHTML = `
        <div class="flex items-center justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/4834/4834559.png" class="w-16 h-16 mr-4" alt="Sunny">
          <div class="text-left">
            <div class="text-4xl font-bold">72°F</div>
            <div class="text-gray-500">Sunny with light clouds</div>
          </div>
        </div>
        <div class="mt-4 flex justify-center space-x-4">
          <div class="text-center">
            <div class="text-gray-500 text-xs">Humidity</div>
            <div class="font-medium">65%</div>
          </div>
          <div class="text-center">
            <div class="text-gray-500 text-xs">Wind</div>
            <div class="font-medium">8 mph</div>
          </div>
          <div class="text-center">
            <div class="text-gray-500 text-xs">Precip</div>
            <div class="font-medium">10%</div>
          </div>
        </div>
      `;
    }, 1500);
  }
  
  // Call this function when the page loads
  addWeatherWidget();

  // Add this function to your enhancements.js file
function addPackingChecklist() {
    // Create checklist container
    const checklistContainer = document.createElement('section');
    checklistContainer.className = 'mb-16';
    checklistContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Packing Checklist</h2>
        <button id="print-checklist" class="text-blue-600 text-sm font-medium hover:underline">
          <i class="fas fa-print mr-1"></i> Print Checklist
        </button>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm overflow-hidden p-6">
        <div id="checklist-items" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Items will be added here -->
        </div>
        
        <div class="mt-6 border-t pt-4">
          <div class="flex">
            <input type="text" id="new-item-input" class="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Add custom item...">
            <button id="add-item-btn" class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Add after emergency info section
    const emergencySection = document.querySelector('section:nth-of-type(5)');
    emergencySection.after(checklistContainer);
    
    // Default packing items
    const defaultItems = [
      "Passport/ID", "Flight tickets", "Travel insurance", 
      "Credit/debit cards", "Phone charger", "Adapter plugs",
      "Medications", "Toothbrush & toothpaste", "Shampoo/soap",
      "Clothes (enough for each day)", "Comfortable walking shoes", "Sunglasses"
    ];
    
    // Add default items to checklist
    const checklistElement = document.getElementById('checklist-items');
    defaultItems.forEach(item => {
      addChecklistItem(item);
    });
    
    // Add functionality to the add button
    document.getElementById('add-item-btn').addEventListener('click', function() {
      const input = document.getElementById('new-item-input');
      const newItem = input.value.trim();
      
      if (newItem) {
        addChecklistItem(newItem);
        input.value = '';
      }
    });
    
    // Also add items when pressing Enter
    document.getElementById('new-item-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        document.getElementById('add-item-btn').click();
      }
    });
    
    // Print checklist button
    document.getElementById('print-checklist').addEventListener('click', function() {
      const printContent = document.getElementById('checklist-items').innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Packing Checklist - DreamAiTrip</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
          </head>
          <body class="p-8">
            <h1 class="text-3xl font-bold mb-6 text-center">My Packing Checklist</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    });
    
    // Helper function to add an item to the checklist
    function addChecklistItem(text) {
      const item = document.createElement('div');
      item.className = 'flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition';
      item.innerHTML = `
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 mr-3">
        <span>${text}</span>
        <button class="ml-auto text-gray-400 hover:text-red-500">
          <i class="fas fa-times"></i>
        </button>
      `;
      
      // Add delete functionality
      item.querySelector('button').addEventListener('click', function() {
        item.remove();
      });
      
      checklistElement.appendChild(item);
      
      // Save to localStorage
      saveChecklist();
    }
    
    // Save checklist to localStorage
    function saveChecklist() {
      const items = [];
      document.querySelectorAll('#checklist-items > div').forEach(item => {
        const text = item.querySelector('span').textContent;
        const checked = item.querySelector('input[type="checkbox"]').checked;
        items.push({ text, checked });
      });
      
      localStorage.setItem('packingChecklist', JSON.stringify(items));
    }
    
    // Add change event listener to save checkbox states
    document.getElementById('checklist-items').addEventListener('change', function() {
      saveChecklist();
    });
    
    // Load checklist from localStorage
    try {
      const savedItems = JSON.parse(localStorage.getItem('packingChecklist'));
      if (savedItems && savedItems.length > 0) {
        // Clear default items
        checklistElement.innerHTML = '';
        
        // Add saved items
        savedItems.forEach(item => {
          const itemEl = document.createElement('div');
          itemEl.className = 'flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition';
          itemEl.innerHTML = `
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600 mr-3" ${item.checked ? 'checked' : ''}>
            <span>${item.text}</span>
            <button class="ml-auto text-gray-400 hover:text-red-500">
              <i class="fas fa-times"></i>
            </button>
          `;
          
          // Add delete functionality
          itemEl.querySelector('button').addEventListener('click', function() {
            itemEl.remove();
            saveChecklist();
          });
          
          checklistElement.appendChild(itemEl);
        });
      }
    } catch (e) {
      console.error('Error loading saved checklist', e);
    }
  }
  
  // Call this function when the page loads
  addPackingChecklist();

  // Add this function to your enhancements.js file
function addCurrencyConverter() {
    // Create currency converter container
    const converterContainer = document.createElement('div');
    converterContainer.className = 'bg-white rounded-xl shadow-sm p-6 mb-10';
    converterContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4">Currency Converter</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div class="flex">
            <select id="from-currency" class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="USD">USD ($) - US Dollar</option>
              <option value="EUR">EUR (€) - Euro</option>
              <option value="GBP">GBP (£) - British Pound</option>
              <option value="JPY">JPY (¥) - Japanese Yen</option>
              <option value="CAD">CAD ($) - Canadian Dollar</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div class="flex">
            <select id="to-currency" class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="EUR">EUR (€) - Euro</option>
              <option value="USD">USD ($) - US Dollar</option>
              <option value="GBP">GBP (£) - British Pound</option>
              <option value="JPY">JPY (¥) - Japanese Yen</option>
              <option value="CAD">CAD ($) - Canadian Dollar</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div class="flex">
            <input type="number" id="amount-input" value="100" min="0" class="flex-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Converted Amount</label>
          <div class="py-2 px-3 border border-gray-200 bg-gray-50 rounded-md font-medium" id="result-display">
            --
          </div>
        </div>
      </div>
      
      <button id="convert-btn" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Convert
      </button>
      
      <div class="mt-4 text-xs text-center text-gray-500">
        <p>For demonstration purposes only. Not real conversion rates.</p>
      </div>
    `;
    
    // Insert after local tips section
    const tipsSection = document.querySelector('section:nth-of-type(6)');
    tipsSection.after(converterContainer);
    
    // Demo exchange rates
    const exchangeRates = {
      USD: { EUR: 0.91, GBP: 0.77, JPY: 147.58, CAD: 1.35, USD: 1 },
      EUR: { USD: 1.09, GBP: 0.85, JPY: 162.11, CAD: 1.48, EUR: 1 },
      GBP: { USD: 1.29, EUR: 1.17, JPY: 190.69, CAD: 1.75, GBP: 1 },
      JPY: { USD: 0.0068, EUR: 0.0062, GBP: 0.0052, CAD: 0.0092, JPY: 1 },
      CAD: { USD: 0.74, EUR: 0.68, GBP: 0.57, JPY: 109.46, CAD: 1 }
    };
    
    // Convert button functionality
    document.getElementById('convert-btn').addEventListener('click', function() {
      const fromCurrency = document.getElementById('from-currency').value;
      const toCurrency = document.getElementById('to-currency').value;
      const amount = parseFloat(document.getElementById('amount-input').value);
      
      if (isNaN(amount)) {
        document.getElementById('result-display').textContent = 'Please enter a valid amount';
        return;
      }
      
      const rate = exchangeRates[fromCurrency][toCurrency];
      const result = (amount * rate).toFixed(2);
      
      const resultDisplay = document.getElementById('result-display');
      resultDisplay.textContent = `${result} ${toCurrency}`;
      
      // Add animation effect
      resultDisplay.classList.add('bg-blue-50');
      setTimeout(() => {
        resultDisplay.classList.remove('bg-blue-50');
      }, 300);
    });
    
    // Auto-convert when changing currencies
    document.getElementById('from-currency').addEventListener('change', function() {
      document.getElementById('convert-btn').click();
    });
    
    document.getElementById('to-currency').addEventListener('change', function() {
      document.getElementById('convert-btn').click();
    });
    
    // Initial conversion
    document.getElementById('convert-btn').click();
  }
  
  // Call this function when the page loads
  addCurrencyConverter();

  // Add an interactive travel timeline
function addTravelTimeline() {
    const itineraryText = localStorage.getItem('generatedItinerary');
    if (!itineraryText) return;
    
    // Create timeline container
    const timelineContainer = document.createElement('section');
    timelineContainer.className = 'mb-16';
    timelineContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Visual Timeline</h2>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
        <div class="timeline-scroll-container overflow-x-auto">
          <div class="timeline-wrapper min-w-max" style="padding: 20px 40px;">
            <div class="timeline-line relative h-1 bg-gray-200 my-8" style="min-width: 800px;">
              <!-- Timeline nodes will be added here -->
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Insert after the itinerary view section
    const itinerarySection = document.querySelector('section:nth-of-type(3)');
    itinerarySection.after(timelineContainer);
    
    // Parse itinerary to find dates and key activities
    setTimeout(() => {
      const departureDate = localStorage.getItem('departureDate');
      const returnDate = localStorage.getItem('returnDate');
      
      if (!departureDate || !returnDate) return;
      
      // Calculate duration
      const start = new Date(departureDate);
      const end = new Date(returnDate);
      const duration = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      // Create timeline
      const timelineLine = document.querySelector('.timeline-line');
      
      // Calculate width based on the number of days
      timelineLine.style.width = `${Math.max(800, duration * 120)}px`;
      
      // Add nodes for each day
      for (let i = 0; i < duration; i++) {
        const dayDate = new Date(start);
        dayDate.setDate(dayDate.getDate() + i);
        
        const formattedDate = dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const dayOfWeek = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
        
        const percentPosition = (i / (duration - 1)) * 100;
        
        const node = document.createElement('div');
        node.className = `absolute bg-white border-2 border-blue-600 rounded-full w-6 h-6 -mt-2.5 flex items-center justify-center cursor-pointer transform hover:scale-125 transition-transform`;
        node.style.left = `${percentPosition}%`;
        node.setAttribute('data-day', `Day ${i + 1}`);
        node.setAttribute('data-date', formattedDate);
        
        node.innerHTML = `
          <span class="text-xs font-bold text-blue-600">${i + 1}</span>
        `;
        
        const label = document.createElement('div');
        label.className = `absolute -mt-10 text-center whitespace-nowrap transform -translate-x-1/2`;
        label.style.left = `${percentPosition}%`;
        label.innerHTML = `
          <div class="font-bold text-gray-800 text-sm">${i === 0 ? 'Departure' : i === duration - 1 ? 'Return' : `Day ${i + 1}`}</div>
          <div class="text-xs text-gray-500">${dayOfWeek}, ${formattedDate}</div>
        `;
        
        timelineLine.appendChild(node);
        timelineLine.appendChild(label);
        
        // Find matching day selector if it exists
        node.addEventListener('click', function() {
          const dayNum = i + 1;
          const dayButton = document.querySelector(`.day-selector button[data-day="${dayNum}"]`);
          if (dayButton) dayButton.click();
          
          // Scroll to day details
          const dayDetails = document.getElementById(`day-${dayNum}-details`);
          if (dayDetails) dayDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      
      // Add major activities
      const activities = [
        { day: 1, name: 'Arrival', icon: 'plane-arrival', color: 'green' },
        { day: Math.ceil(duration / 3), name: 'Exploring', icon: 'landmark', color: 'indigo' },
        { day: Math.ceil(duration / 2), name: 'Activities', icon: 'hiking', color: 'red' },
        { day: Math.floor(duration * 0.8), name: 'Relaxation', icon: 'umbrella-beach', color: 'yellow' },
        { day: duration, name: 'Departure', icon: 'plane-departure', color: 'green' }
      ];
      
      activities.forEach(activity => {
        if (activity.day <= duration) {
          const percentPosition = ((activity.day - 1) / (duration - 1)) * 100;
          
          const activityNode = document.createElement('div');
          activityNode.className = `absolute -mb-14 transform -translate-x-1/2`;
          activityNode.style.left = `${percentPosition}%`;
          activityNode.style.bottom = '0';
          
          activityNode.innerHTML = `
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-${activity.color}-500 text-white flex items-center justify-center mb-1">
                <i class="fas fa-${activity.icon} text-sm"></i>
              </div>
              <div class="text-xs font-medium">${activity.name}</div>
            </div>
          `;
          
          timelineLine.appendChild(activityNode);
        }
      });
    }, 500);
  }
  
  // Call the function when the page loads
  addTravelTimeline();

  // Add useful language phrases based on destination
function addLanguagePhrases() {
    const destination = localStorage.getItem('destination');
    if (!destination) return;
    
    // Define language phrases for popular destinations
    const languagePhrases = {
      'Spain': { language: 'Spanish', phrases: [
        { phrase: 'Hola', translation: 'Hello' },
        { phrase: 'Gracias', translation: 'Thank you' },
        { phrase: '¿Dónde está...?', translation: 'Where is...?' },
        { phrase: 'La cuenta, por favor', translation: 'The bill, please' },
        { phrase: 'No entiendo', translation: 'I don\'t understand' }
      ]},
      'Italy': { language: 'Italian', phrases: [
        { phrase: 'Ciao', translation: 'Hello' },
        { phrase: 'Grazie', translation: 'Thank you' },
        { phrase: 'Dov\'è...?', translation: 'Where is...?' },
        { phrase: 'Il conto, per favore', translation: 'The bill, please' },
        { phrase: 'Non capisco', translation: 'I don\'t understand' }
      ]},
      'France': { language: 'French', phrases: [
        { phrase: 'Bonjour', translation: 'Hello' },
        { phrase: 'Merci', translation: 'Thank you' },
        { phrase: 'Où est...?', translation: 'Where is...?' },
        { phrase: 'L\'addition, s\'il vous plaît', translation: 'The bill, please' },
        { phrase: 'Je ne comprends pas', translation: 'I don\'t understand' }
      ]},
      'Japan': { language: 'Japanese', phrases: [
        { phrase: 'Konnichiwa', translation: 'Hello' },
        { phrase: 'Arigatou', translation: 'Thank you' },
        { phrase: '...wa doko desu ka?', translation: 'Where is...?' },
        { phrase: 'Okaikei onegaishimasu', translation: 'The bill, please' },
        { phrase: 'Wakarimasen', translation: 'I don\'t understand' }
      ]},
      'Germany': { language: 'German', phrases: [
        { phrase: 'Hallo', translation: 'Hello' },
        { phrase: 'Danke', translation: 'Thank you' },
        { phrase: 'Wo ist...?', translation: 'Where is...?' },
        { phrase: 'Die Rechnung, bitte', translation: 'The bill, please' },
        { phrase: 'Ich verstehe nicht', translation: 'I don\'t understand' }
      ]}
    };
    
    // Default phrases if destination not found
    const defaultPhrases = { language: 'Local', phrases: [
      { phrase: 'Hello', translation: 'Basic greeting' },
      { phrase: 'Thank you', translation: 'Express gratitude' },
      { phrase: 'Where is...?', translation: 'Ask for directions' },
      { phrase: 'The bill, please', translation: 'Ask for the check' },
      { phrase: 'I don\'t understand', translation: 'When confused' }
    ]};
    
    // Find matching language phrases
    let matchedPhrases = defaultPhrases;
    
    for (const [country, data] of Object.entries(languagePhrases)) {
      if (destination.toLowerCase().includes(country.toLowerCase())) {
        matchedPhrases = data;
        break;
      }
    }
    
    // Create language phrases container
    const phrasesContainer = document.createElement('div');
    phrasesContainer.className = 'bg-white rounded-xl shadow-sm p-6 mb-10';
    phrasesContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4">Essential ${matchedPhrases.language} Phrases</h3>
      
      <div class="space-y-3">
        ${matchedPhrases.phrases.map(item => `
          <div class="phrase-card p-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition cursor-pointer group">
            <div class="flex justify-between items-center">
              <div class="font-medium">${item.phrase}</div>
              <div class="text-sm text-gray-500 group-hover:text-blue-600">${item.translation}</div>
            </div>
            <div class="hidden phrase-audio text-center mt-2">
              <button class="text-xs text-blue-600 hover:text-blue-800">
                <i class="fas fa-volume-up mr-1"></i> Listen
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-4 text-center">
        <button class="text-blue-600 text-sm font-medium hover:underline">
          <i class="fas fa-plus-circle mr-1"></i> View More Phrases
        </button>
      </div>
    `;
    
    // Insert after the local tips section
    const tipsSection = document.querySelector('section:nth-of-type(6)');
    tipsSection.appendChild(phrasesContainer);
    
    // Add click event to phrase cards
    setTimeout(() => {
      const phraseCards = document.querySelectorAll('.phrase-card');
      phraseCards.forEach(card => {
        card.addEventListener('click', function() {
          const audioElement = this.querySelector('.phrase-audio');
          audioElement.classList.toggle('hidden');
        });
      });
    }, 100);
  }
  
  // Call the function when the page loads
  addLanguagePhrases();

  // Add a photo gallery with destination images
function addPhotoGallery() {
    const destination = localStorage.getItem('destination');
    if (!destination) return;
    
    // Create gallery container
    const galleryContainer = document.createElement('section');
    galleryContainer.className = 'mb-16';
    galleryContainer.innerHTML = `
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Photos of ${destination}</h2>
        <div>
          <button id="gallery-view-btn" class="px-3 py-1 rounded-lg border border-gray-300 text-sm">
            <i class="fas fa-th-large mr-1"></i> Grid
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div id="photo-gallery" class="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+1" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+2" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+3" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+4" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+5" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+6" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+7" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
          <div class="gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer">
            <img src="https://via.placeholder.com/800x600?text=Photo+8" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          </div>
        </div>
      </div>
      
      <!-- Lightbox modal -->
      <div id="photo-lightbox" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center hidden">
        <button id="lightbox-close" class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">
          <i class="fas fa-times"></i>
        </button>
        <button id="lightbox-prev" class="absolute left-4 text-white text-4xl hover:text-gray-300">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button id="lightbox-next" class="absolute right-4 text-white text-4xl hover:text-gray-300">
          <i class="fas fa-chevron-right"></i>
        </button>
        <img id="lightbox-image" class="max-h-screen max-w-screen-lg object-contain" src="">
        <div id="lightbox-caption" class="absolute bottom-4 left-0 right-0 text-white text-center"></div>
      </div>
    `;
    
    // Insert before the emergency info section
    const emergencySection = document.querySelector('section:nth-of-type(4)');
    emergencySection.before(galleryContainer);
    
    // Add gallery interaction
    setTimeout(() => {
      const gallery = document.getElementById('photo-gallery');
      const lightbox = document.getElementById('photo-lightbox');
      const lightboxImage = document.getElementById('lightbox-image');
      const lightboxCaption = document.getElementById('lightbox-caption');
      const closeBtn = document.getElementById('lightbox-close');
      const prevBtn = document.getElementById('lightbox-prev');
      const nextBtn = document.getElementById('lightbox-next');
      const galleryViewBtn = document.getElementById('gallery-view-btn');
      
      let currentImageIndex = 0;
      const photos = document.querySelectorAll('.gallery-photo img');
      
      // Open lightbox
      photos.forEach((photo, index) => {
        photo.addEventListener('click', function() {
          currentImageIndex = index;
          lightboxImage.src = this.src;
          lightboxCaption.textContent = `${destination} - Photo ${index + 1} of ${photos.length}`;
          lightbox.classList.remove('hidden');
          document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
      });
      
      // Close lightbox
      closeBtn.addEventListener('click', function() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      });
      
      // Navigate through photos
      prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length;
        lightboxImage.src = photos[currentImageIndex].src;
        lightboxCaption.textContent = `${destination} - Photo ${currentImageIndex + 1} of ${photos.length}`;
      });
      
      nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % photos.length;
        lightboxImage.src = photos[currentImageIndex].src;
        lightboxCaption.textContent = `${destination} - Photo ${currentImageIndex + 1} of ${photos.length}`;
      });
      
      // Toggle gallery view
      let isGridView = true;
      galleryViewBtn.addEventListener('click', function() {
        isGridView = !isGridView;
        
        if (isGridView) {
          gallery.classList.remove('flex', 'flex-col');
          gallery.classList.add('grid', 'grid-cols-2', 'md:grid-cols-4');
          galleryViewBtn.innerHTML = '<i class="fas fa-th-large mr-1"></i> Grid';
        } else {
          gallery.classList.remove('grid', 'grid-cols-2', 'md:grid-cols-4');
          gallery.classList.add('flex', 'flex-col', 'space-y-4');
          galleryViewBtn.innerHTML = '<i class="fas fa-list mr-1"></i> List';
        }
      });
      
      // Close lightbox when clicking outside the image
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          lightbox.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') closeBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
      });
    }, 100);
  }
  
  // Call the function when the page loads
  addPhotoGallery();

  // Add advanced social media sharing functionality
function addSocialSharing() {
    // Create a new sharing dropdown
    const navShareButton = document.querySelector('button i.fa-share-alt').parentNode;
    
    if (navShareButton) {
      // Replace the original button with dropdown
      const shareDropdown = document.createElement('div');
      shareDropdown.className = 'relative';
      shareDropdown.innerHTML = `
        <button id="share-dropdown-btn" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
          <i class="fas fa-share-alt mr-2"></i> Share
        </button>
        
        <div id="share-dropdown-menu" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 hidden">
          <div class="p-4">
            <h3 class="font-bold mb-3">Share Your Itinerary</h3>
            
            <div class="space-y-3">
              <button class="share-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center" data-platform="copy">
                <i class="fas fa-link text-gray-500 mr-3 w-5"></i>
                <span>Copy Link</span>
              </button>
              <button class="share-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center" data-platform="email">
                <i class="fas fa-envelope text-blue-600 mr-3 w-5"></i>
                <span>Email</span>
              </button>
              <button class="share-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center" data-platform="facebook">
                <i class="fab fa-facebook text-blue-800 mr-3 w-5"></i>
                <span>Facebook</span>
              </button>
              <button class="share-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center" data-platform="twitter">
                <i class="fab fa-twitter text-blue-400 mr-3 w-5"></i>
                <span>Twitter</span>
              </button>
              <button class="share-btn w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center" data-platform="whatsapp">
                <i class="fab fa-whatsapp text-green-500 mr-3 w-5"></i>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      `;
      
      navShareButton.parentNode.replaceChild(shareDropdown, navShareButton);
      
      // Add dropdown functionality
      setTimeout(() => {
        const dropdownBtn = document.getElementById('share-dropdown-btn');
        const dropdownMenu = document.getElementById('share-dropdown-menu');
        const shareButtons = document.querySelectorAll('.share-btn');
        
        // Toggle dropdown
        dropdownBtn.addEventListener('click', function() {
          dropdownMenu.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!shareDropdown.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
          }
        });
        
        // Handle share button clicks
        shareButtons.forEach(button => {
          button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const url = window.location.href;
            const title = document.title;
            const text = `Check out my travel itinerary to ${localStorage.getItem('destination') || 'my destination'} created with DreamAiTrip!`;
            
            // Hide dropdown
            dropdownMenu.classList.add('hidden');
            
            // Handle sharing based on platform
            switch (platform) {
              case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                  // Show toast notification
                  showShareToast('Link copied to clipboard!');
                });
                break;
              case 'email':
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
                break;
              case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
              case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
              case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                break;
            }
          });
        });
        
        // Function to show toast notification
        function showShareToast(message) {
          // Create toast element
          const toast = document.createElement('div');
          toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg opacity-0 transition-opacity duration-300';
          toast.textContent = message;
          document.body.appendChild(toast);
          
          // Show and hide toast
          setTimeout(() => {
            toast.classList.remove('opacity-0');
            setTimeout(() => {
              toast.classList.add('opacity-0');
              setTimeout(() => {
                document.body.removeChild(toast);
              }, 300);
            }, 2000);
          }, 10);
        }
      }, 100);
    }
  }
  
  // Call the function when the page loads
  addSocialSharing();

  // Add social media links to the itinerary page
function addItinerarySocialLinks() {
    // Add to navbar
    const navContainer = document.querySelector('nav .flex.space-x-4');
    
    if (navContainer) {
      // Create social links container
      const socialLinksContainer = document.createElement('div');
      socialLinksContainer.className = "hidden md:flex items-center ml-2 mr-4";
      
      // Add Instagram link
      const instagramLink = document.createElement('a');
      instagramLink.href = "https://www.instagram.com/dreamaitrip";
      instagramLink.className = "text-gray-600 hover:text-blue-600 mx-1";
      instagramLink.target = "_blank";
      instagramLink.title = "Follow us on Instagram";
      instagramLink.innerHTML = '<i class="fab fa-instagram"></i>';
      socialLinksContainer.appendChild(instagramLink);
      
      // Add TikTok link
      const tiktokLink = document.createElement('a');
      tiktokLink.href = "https://www.tiktok.com/@dreamaitrip";
      tiktokLink.className = "text-gray-600 hover:text-blue-600 mx-1";
      tiktokLink.target = "_blank";
      tiktokLink.title = "Follow us on TikTok";
      tiktokLink.innerHTML = '<i class="fab fa-tiktok"></i>';
      socialLinksContainer.appendChild(tiktokLink);
      
      // Insert before the buttons
      navContainer.insertBefore(socialLinksContainer, navContainer.firstChild);
    }
    
    // Also add to footer
    const footerContainer = document.querySelector('footer');
    
    if (footerContainer) {
      // Add social links to footer
      const footerSocial = document.createElement('div');
      footerSocial.className = "flex justify-center space-x-4 mt-4";
      footerSocial.innerHTML = `
        <a href="https://www.instagram.com/dreamaitrip" target="_blank" class="text-blue-600 hover:text-blue-800">
          <i class="fab fa-instagram text-lg"></i>
        </a>
        <a href="https://www.tiktok.com/@dreamaitrip" target="_blank" class="text-blue-600 hover:text-blue-800">
          <i class="fab fa-tiktok text-lg"></i>
        </a>
      `;
      
      footerContainer.insertBefore(footerSocial, footerContainer.lastChild);
    }
    
    // Add a "Follow Us" section at the bottom of the page
    const followSection = document.createElement('section');
    followSection.className = 'mb-16 no-print';
    followSection.innerHTML = `
      <div class="bg-blue-50 rounded-xl p-6 text-center">
        <h3 class="text-xl font-bold mb-3">Follow Our Travel Adventures</h3>
        <p class="text-gray-600 mb-4">Get more travel inspiration and tips by following us on social media.</p>
        
        <div class="flex justify-center space-x-6">
          <a href="https://www.instagram.com/dreamaitrip" target="_blank" class="flex flex-col items-center hover:scale-110 transition-transform">
            <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500 flex items-center justify-center text-white mb-2">
              <i class="fab fa-instagram text-xl"></i>
            </div>
            <span class="text-sm font-medium">@dreamaitrip</span>
          </a>
          
          <a href="https://www.tiktok.com/@dreamaitrip" target="_blank" class="flex flex-col items-center hover:scale-110 transition-transform">
            <div class="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white mb-2">
              <i class="fab fa-tiktok text-xl"></i>
            </div>
            <span class="text-sm font-medium">@dreamaitrip</span>
          </a>
        </div>
      </div>
    `;
    
    // Add before the footer
    const main = document.querySelector('main');
    if (main && main.lastElementChild.tagName.toLowerCase() === 'footer') {
      main.insertBefore(followSection, main.lastElementChild);
    }
  }
  
  // Call the function when the page loads
  addItinerarySocialLinks();