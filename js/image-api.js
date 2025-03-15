// Image API functionality - Secure Version

// Your existing backend URL (where your OpenAI API is already running)
const backendUrl = 'https://dreamaitrip.onrender.com'; // Update this to your actual URL

// Fetch destination images through your backend proxy
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
    // Call your own backend API instead of Unsplash directly
    const response = await fetch(
      `${backendUrl}/api/images?query=${encodeURIComponent(destination)}&count=${count}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch images');
    
    const images = await response.json();
    
    // Cache the results
    localStorage.setItem(cacheKey, JSON.stringify(images));
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    
    // Fallback to placeholder images
    return getPlaceholderImages(destination, count);
  }
}

// Generate placeholder images as fallback
function getPlaceholderImages(destination, count) {
  const placeholders = [];
  for (let i = 1; i <= count; i++) {
    // Use your backend placeholder service
    placeholders.push({
      url: `${backendUrl}/api/placeholder/800/600?text=${encodeURIComponent(destination + ' ' + i)}`,
      alt: `${destination} image ${i}`,
      photographer: 'Placeholder',
      photographerUrl: '#'
    });
  }
  return placeholders;
}

// Function to replace all placeholder image src attributes
function replaceAllPlaceholderImages() {
  // Find all images with placeholder URLs
  const placeholderImages = document.querySelectorAll('img[src^="/api/placeholder/"]');
  
  placeholderImages.forEach(img => {
    const src = img.getAttribute('src');
    // Extract dimensions from the URL pattern /api/placeholder/width/height
    const dimensions = src.replace('/api/placeholder/', '').split('/');
    if (dimensions.length >= 2) {
      const width = dimensions[0];
      const height = dimensions[1];
      const alt = img.getAttribute('alt') || 'placeholder';
      
      // Replace with your backend placeholder service
      img.src = `${backendUrl}/api/placeholder/${width}/${height}?text=${encodeURIComponent(alt)}`;
    }
  });
}

// Update the photo gallery with real images (if it exists)
async function updatePhotoGallery() {
  const destination = localStorage.getItem('destination') || 'Travel Destination';
  const gallery = document.getElementById('photo-gallery');
  
  if (gallery) {
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
    
    // Set up lightbox functionality (if you have this function defined)
    if (typeof setupLightbox === 'function') {
      setupLightbox();
    }
  }
  
  // Also replace all placeholder images on the page
  replaceAllPlaceholderImages();
}

// Run when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Replace all placeholder images
  replaceAllPlaceholderImages();
  
  // Update photo gallery if it exists
  updatePhotoGallery();
});

// Export functions for use in other scripts
window.imageApi = {
  fetchDestinationImages,
  updatePhotoGallery,
  replaceAllPlaceholderImages
};