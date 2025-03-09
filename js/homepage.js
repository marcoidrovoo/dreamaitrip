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