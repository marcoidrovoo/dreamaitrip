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
  