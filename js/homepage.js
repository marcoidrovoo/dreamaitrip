// This file adds functionality to buttons on the home page
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MAKE ALL NAVIGATION LINKS WORK
    // This makes all header links scroll smoothly to the correct section
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for nav bar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 2. MAKE "CREATE FREE ITINERARY" BUTTON WORK
    const createButtons = document.querySelectorAll('a[href="#get-started"]');
    createButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('get-started');
            if (formSection) {
                window.scrollTo({
                    top: formSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3. MAKE "VIEW SAMPLES" BUTTON WORK
    const sampleButtons = document.querySelectorAll('a[href="#samples"]');
    sampleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const samplesSection = document.getElementById('samples');
            if (samplesSection) {
                window.scrollTo({
                    top: samplesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 4. MAKE SAMPLE ITINERARY BUTTONS WORK
    const viewItineraryButtons = document.querySelectorAll('#samples a.block');
    viewItineraryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This is a sample itinerary. To create your own personalized itinerary, please fill out the form at the bottom of the page.');
            
            // Optionally scroll to the form
            const formSection = document.getElementById('get-started');
            if (formSection) {
                window.scrollTo({
                    top: formSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 5. MAKE PRICING BUTTONS WORK
    const pricingButtons = document.querySelectorAll('#pricing a.block');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('get-started');
            if (formSection) {
                window.scrollTo({
                    top: formSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 6. MAKE MOBILE MENU TOGGLE WORK
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    const mobileMenu = document.querySelector('nav .hidden.md\\:flex');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu visibility
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-white', 'shadow-md', 'p-4');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-white', 'shadow-md', 'p-4');
            }
        });
    }
});

// Add an animated testimonials carousel to the homepage
function addTestimonialsCarousel() {
    // Create testimonials section
    const testimonialSection = document.createElement('section');
    testimonialSection.className = 'py-16 bg-gray-50';
    testimonialSection.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from travelers who used DreamAiTrip
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto relative" id="testimonials-container">
          <div class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 z-10">
            <button id="prev-testimonial" class="bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center">
              <i class="fas fa-chevron-left text-blue-600"></i>
            </button>
          </div>
          
          <div class="overflow-hidden">
            <div id="testimonials-slider" class="flex transition-transform duration-500 ease-in-out">
              <!-- Testimonial 1 -->
              <div class="testimonial-slide w-full flex-shrink-0 px-4">
                <div class="bg-white p-8 rounded-xl shadow-sm">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center">
                      <span class="text-xl font-bold">S</span>
                    </div>
                    <div class="ml-4">
                      <h3 class="font-bold">Sarah Johnson</h3>
                      <p class="text-gray-500 text-sm">Tokyo Adventure</p>
                    </div>
                    <div class="ml-auto flex text-yellow-400">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                  <p class="text-gray-600 italic">
                    "I was blown away by how detailed my Tokyo itinerary was! Every restaurant recommendation was perfect for my foodie preferences. The AI even suggested a hidden jazz bar that became the highlight of my trip!"
                  </p>
                </div>
              </div>
              
              <!-- Testimonial 2 -->
              <div class="testimonial-slide w-full flex-shrink-0 px-4">
                <div class="bg-white p-8 rounded-xl shadow-sm">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-green-600 rounded-full text-white flex items-center justify-center">
                      <span class="text-xl font-bold">M</span>
                    </div>
                    <div class="ml-4">
                      <h3 class="font-bold">Marcus Chen</h3>
                      <p class="text-gray-500 text-sm">Europe Backpacking</p>
                    </div>
                    <div class="ml-auto flex text-yellow-400">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                  <p class="text-gray-600 italic">
                    "As a budget traveler, I was impressed with how well the itinerary balanced cost and experience. The train scheduling for my 5-country tour was perfect, and I saved hundreds on accommodations!"
                  </p>
                </div>
              </div>
              
              <!-- Testimonial 3 -->
              <div class="testimonial-slide w-full flex-shrink-0 px-4">
                <div class="bg-white p-8 rounded-xl shadow-sm">
                  <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-purple-600 rounded-full text-white flex items-center justify-center">
                      <span class="text-xl font-bold">J</span>
                    </div>
                    <div class="ml-4">
                      <h3 class="font-bold">Jessica & David</h3>
                      <p class="text-gray-500 text-sm">Bali Honeymoon</p>
                    </div>
                    <div class="ml-auto flex text-yellow-400">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                  </div>
                  <p class="text-gray-600 italic">
                    "Our honeymoon in Bali was absolute perfection thanks to DreamAiTrip! The AI created the perfect balance of relaxation and adventure. The premium upgrade with 24/7 support saved us when our flight was delayed."
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 z-10">
            <button id="next-testimonial" class="bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center">
              <i class="fas fa-chevron-right text-blue-600"></i>
            </button>
          </div>
          
          <div class="flex justify-center mt-8">
            <button class="testimonial-dot w-3 h-3 rounded-full bg-blue-600 mx-1" data-index="0"></button>
            <button class="testimonial-dot w-3 h-3 rounded-full bg-gray-300 mx-1" data-index="1"></button>
            <button class="testimonial-dot w-3 h-3 rounded-full bg-gray-300 mx-1" data-index="2"></button>
          </div>
        </div>
      </div>
    `;
    
    // Insert before the "How It Works" section
    const howItWorksSection = document.getElementById('how-it-works');
    howItWorksSection.before(testimonialSection);
    
    // Add carousel functionality after the section is added to the DOM
    setTimeout(() => {
      const slider = document.getElementById('testimonials-slider');
      const slides = document.querySelectorAll('.testimonial-slide');
      const prevBtn = document.getElementById('prev-testimonial');
      const nextBtn = document.getElementById('next-testimonial');
      const dots = document.querySelectorAll('.testimonial-dot');
      
      let currentSlide = 0;
      
      function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
          dot.classList.toggle('bg-blue-600', i === currentSlide);
          dot.classList.toggle('bg-gray-300', i !== currentSlide);
        });
      }
      
      prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
      nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
      
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          goToSlide(parseInt(this.getAttribute('data-index')));
        });
      });
      
      // Auto advance the slider
      let intervalId = setInterval(() => goToSlide(currentSlide + 1), 5000);
      
      // Pause on hover
      const testimonialContainer = document.getElementById('testimonials-container');
      testimonialContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
      testimonialContainer.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        intervalId = setInterval(() => goToSlide(currentSlide + 1), 5000);
      });
    }, 100);
  }
  
  // Call the function when the page loads
  addTestimonialsCarousel();

  // Add a destination inspiration section with hover effects
function addDestinationInspiration() {
    // Create destinations section
    const destinationsSection = document.createElement('section');
    destinationsSection.className = 'py-16 bg-white';
    destinationsSection.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Get Inspired</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore trending destinations that travelers are loving right now
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Destination 1 -->
          <div class="destination-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
            <img src="https://via.placeholder.com/600x400?text=Bali" alt="Bali" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform">Bali, Indonesia</h3>
              <p class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Beaches, temples, and jungle adventures await
              </p>
            </div>
          </div>
          
          <!-- Destination 2 -->
          <div class="destination-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
            <img src="https://via.placeholder.com/600x400?text=Kyoto" alt="Kyoto" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform">Kyoto, Japan</h3>
              <p class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Ancient temples and serene gardens
              </p>
            </div>
          </div>
          
          <!-- Destination 3 -->
          <div class="destination-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
            <img src="https://via.placeholder.com/600x400?text=Barcelona" alt="Barcelona" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform">Barcelona, Spain</h3>
              <p class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Architecture, beaches, and vibrant culture
              </p>
            </div>
          </div>
          
          <!-- Destination 4 -->
          <div class="destination-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
            <img src="https://via.placeholder.com/600x400?text=Santorini" alt="Santorini" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform">Santorini, Greece</h3>
              <p class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                White-washed buildings with breathtaking views
              </p>
            </div>
          </div>
          
          <!-- Destination 5 -->
          <div class="destination-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
            <img src="https://via.placeholder.com/600x400?text=New+York" alt="New York" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform">New York City, USA</h3>
              <p class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                The city that never sleeps
              </p>
            </div>
          </div>
          
          <!-- Destination 6 -->
          <div class="destination-card relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity z-10"></div>
            <img src="https://via.placeholder.com/600x400?text=Marrakech" alt="Marrakech" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform">Marrakech, Morocco</h3>
              <p class="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Vibrant markets and rich culture
              </p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <button class="btn-primary px-8 py-3 rounded-full text-lg font-bold">
            Explore All Destinations
          </button>
        </div>
      </div>
    `;
    
    // Insert before the pricing section
    const pricingSection = document.getElementById('pricing');
    pricingSection.before(destinationsSection);
    
    // Make destination cards clickable
    setTimeout(() => {
      const destinationCards = document.querySelectorAll('.destination-card');
      destinationCards.forEach(card => {
        card.addEventListener('click', function() {
          const destination = this.querySelector('h3').textContent.split(',')[0].trim();
          
          // Auto-fill the destination in the form and scroll to it
          const destinationInput = document.getElementById('destination');
          if (destinationInput) {
            destinationInput.value = destination;
            
            // Scroll to the form
            const formSection = document.getElementById('get-started');
            formSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add highlight effect to the input
            destinationInput.classList.add('ring-2', 'ring-blue-500');
            setTimeout(() => {
              destinationInput.classList.remove('ring-2', 'ring-blue-500');
            }, 1500);
          }
        });
      });
    }, 100);
  }
  
  // Call the function when the page loads
  addDestinationInspiration();

  // Add social media links to the homepage
function addSocialMediaLinks() {
    // Find the footer social icons section
    const socialLinksContainer = document.querySelector('footer .flex.space-x-4');
    
    if (socialLinksContainer) {
      // Clear existing placeholder links
      socialLinksContainer.innerHTML = '';
      
      // Add Instagram link
      const instagramLink = document.createElement('a');
      instagramLink.href = "https://www.instagram.com/dreamaitrip";
      instagramLink.className = "text-gray-400 hover:text-white";
      instagramLink.target = "_blank";
      instagramLink.innerHTML = '<i class="fab fa-instagram text-xl"></i>';
      socialLinksContainer.appendChild(instagramLink);
      
      // Add TikTok link
      const tiktokLink = document.createElement('a');
      tiktokLink.href = "https://www.tiktok.com/@dreamaitrip";
      tiktokLink.className = "text-gray-400 hover:text-white";
      tiktokLink.target = "_blank";
      tiktokLink.innerHTML = '<i class="fab fa-tiktok text-xl"></i>';
      socialLinksContainer.appendChild(tiktokLink);
    }
    
    // Also add to the header navigation
    const navContainer = document.querySelector('nav .flex.items-center.space-x-4');
    
    if (navContainer) {
      // Create a container for social links
      const socialNav = document.createElement('div');
      socialNav.className = "hidden md:flex items-center space-x-2 ml-2";
      
      // Add Instagram link
      const navInstagram = document.createElement('a');
      navInstagram.href = "https://www.instagram.com/dreamaitrip";
      navInstagram.className = "text-gray-600 hover:text-blue-600";
      navInstagram.target = "_blank";
      navInstagram.innerHTML = '<i class="fab fa-instagram"></i>';
      socialNav.appendChild(navInstagram);
      
      // Add TikTok link
      const navTiktok = document.createElement('a');
      navTiktok.href = "https://www.tiktok.com/@dreamaitrip";
      navTiktok.className = "text-gray-600 hover:text-blue-600";
      navTiktok.target = "_blank";
      navTiktok.innerHTML = '<i class="fab fa-tiktok"></i>';
      socialNav.appendChild(navTiktok);
      
      // Add to navigation
      navContainer.appendChild(socialNav);
    }
  }
  
  // Call the function when the page loads
  addSocialMediaLinks();

  