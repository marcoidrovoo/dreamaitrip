// Image API functionality
const unsplashKey = 'https://dreamaitrip.onrender.com/generate-itinerary'; // Replace with your key

// Fetch destination images from Unsplash
async function fetchDestinationImages(destination, count = 6) {
  // Check local storage cache first
  const cacheKey = `images_${destination}`;
  const cachedData = localStorage.getItem(cacheKey);
  const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
  
  // Use cache if less than 24 hours old
  if (cachedData && cacheTimestamp && (Date.now() - cacheTimestamp < 24 * 60 * 60 * 1000)) {
    return JSON.parse(cachedData);
  }
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${destination}&per_page=${count}`,
      {
        headers: {
          'Authorization': `Client-ID ${unsplashKey}`
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch images');
    
    const data = await response.json();
    const images = data.results.map(img => ({
      url: img.urls.regular,
      alt: img.alt_description || destination,
      photographer: img.user.name,
      photographerUrl: img.user.links.html
    }));
    
    // Cache the results
    localStorage.setItem(cacheKey, JSON.stringify(images));
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return []; // Return empty array on error
  }
}

// Update the photo gallery with real images
async function updatePhotoGallery() {
  const destination = localStorage.getItem('destination');
  if (!destination) return;
  
  const gallery = document.getElementById('photo-gallery');
  if (!gallery) return;
  
  // Show loading state
  gallery.innerHTML = '<div class="text-center p-8"><i class="fas fa-spinner fa-spin text-blue-600 text-3xl"></i></div>';
  
  // Get images from API
  const images = await fetchDestinationImages(destination);
  
  // If no images found, show placeholder
  if (images.length === 0) {
    gallery.innerHTML = '<div class="text-center p-8 text-gray-500">No images found for this destination.</div>';
    return;
  }
  
  // Create gallery HTML
  gallery.innerHTML = '';
  images.forEach(image => {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer';
    photoDiv.innerHTML = `
      <img src="${image.url}" alt="${image.alt}" 
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
      <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 hover:opacity-100 transition-opacity">
        Photo by ${image.photographer}
      </div>
    `;
    gallery.appendChild(photoDiv);
  });
  
  // Set up lightbox functionality
  setupLightbox();
}