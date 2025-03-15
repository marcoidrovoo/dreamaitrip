// Unsplash API integration for DreamAiTrip
// This file handles fetching destination images from our backend API

// Function to fetch images for a destination
async function fetchDestinationImages(destination, count = 8) {
    try {
      // Call our backend API
      const response = await fetch(
        `https://dreamaitrip.onrender.com/api/unsplash-images?destination=${encodeURIComponent(destination)}&count=${count}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch images from API');
      }
  
      const data = await response.json();
      return data.images;
    } catch (error) {
      console.error('Error fetching Unsplash images:', error);
      return []; // Return empty array on error
    }
  }
  
  // Function to load and display a destination photo in the gallery
  function displayDestinationImages(images, galleryId = 'photo-gallery') {
    const gallery = document.getElementById(galleryId);
    if (!gallery || !images || images.length === 0) return;
    
    // Clear existing content
    gallery.innerHTML = '';
    
    // Add each image to the gallery
    images.forEach((image, index) => {
      const photoDiv = document.createElement('div');
      photoDiv.className = 'gallery-photo aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer';
      photoDiv.innerHTML = `
        <img 
          src="${image.url}" 
          data-thumb="${image.thumb}"
          data-photographer="${image.credit.name}"
          data-photo-link="${image.credit.link}"
          alt="${image.alt}" 
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        >
      `;
      gallery.appendChild(photoDiv);
    });
    
    // Add lightbox functionality
    setupLightbox();
  }
  
  // Setup lightbox functionality for the gallery
  function setupLightbox() {
    const photos = document.querySelectorAll('.gallery-photo img');
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    if (!photos.length || !lightbox) return;
    
    let currentImageIndex = 0;
    
    // Open lightbox
    photos.forEach((photo, index) => {
      photo.addEventListener('click', function() {
        currentImageIndex = index;
        lightboxImage.src = this.src;
        
        // Add photographer credit
        const photographer = this.getAttribute('data-photographer');
        const photoLink = this.getAttribute('data-photo-link');
        const destination = localStorage.getItem('destination') || 'Destination';
        
        lightboxCaption.innerHTML = `
          ${destination} - Photo ${index + 1} of ${photos.length}<br>
          <span class="text-sm">Photo by <a href="${photoLink}" target="_blank" class="underline">${photographer}</a> on Unsplash</span>
        `;
        
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });
    
    // Close lightbox
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
    
    // Navigate through photos
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length;
        lightboxImage.src = photos[currentImageIndex].src;
        
        // Update caption
        const photographer = photos[currentImageIndex].getAttribute('data-photographer');
        const photoLink = photos[currentImageIndex].getAttribute('data-photo-link');
        const destination = localStorage.getItem('destination') || 'Destination';
        
        lightboxCaption.innerHTML = `
          ${destination} - Photo ${currentImageIndex + 1} of ${photos.length}<br>
          <span class="text-sm">Photo by <a href="${photoLink}" target="_blank" class="underline">${photographer}</a> on Unsplash</span>
        `;
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % photos.length;
        lightboxImage.src = photos[currentImageIndex].src;
        
        // Update caption
        const photographer = photos[currentImageIndex].getAttribute('data-photographer');
        const photoLink = photos[currentImageIndex].getAttribute('data-photo-link');
        const destination = localStorage.getItem('destination') || 'Destination';
        
        lightboxCaption.innerHTML = `
          ${destination} - Photo ${currentImageIndex + 1} of ${photos.length}<br>
          <span class="text-sm">Photo by <a href="${photoLink}" target="_blank" class="underline">${photographer}</a> on Unsplash</span>
        `;
      });
    }
    
    // Close on background click
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
  }
  
  // Function to update the header background image
  function updateHeaderBackground(images) {
    if (!images || images.length === 0) return;
    
    // Get a random image from the collection
    const randomIndex = Math.floor(Math.random() * images.length);
    const headerImage = images[randomIndex];
    
    // Find the header element
    const header = document.querySelector('.itinerary-header');
    if (!header) return;
    
    // Apply the image as background
    header.style.backgroundImage = `linear-gradient(135deg, rgba(0, 82, 204, 0.85) 0%, rgba(25, 118, 210, 0.85) 100%), url('${headerImage.url}')`;
    header.style.backgroundSize = 'cover';
    header.style.backgroundPosition = 'center';
    
    // Add photo credit
    const creditElement = document.createElement('div');
    creditElement.className = 'text-xs text-white text-opacity-70 absolute bottom-1 right-2';
    creditElement.innerHTML = `Photo by <a href="${headerImage.credit.link}" target="_blank" class="hover:underline">${headerImage.credit.name}</a> on Unsplash`;
    
    // Remove any existing credit
    const existingCredit = header.querySelector('.text-xs.text-white.text-opacity-70');
    if (existingCredit) {
      existingCredit.remove();
    }
    
    header.appendChild(creditElement);
  }
  
  // Export functions to make them available globally
  window.unsplash = {
    fetchDestinationImages,
    displayDestinationImages,
    updateHeaderBackground
  };