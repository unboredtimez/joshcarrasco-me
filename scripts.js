document.addEventListener('DOMContentLoaded', () => {
    // Elements that should fade in as they enter the viewport
    const fadeElements = [
      ...document.querySelectorAll('.hero'),
      ...document.querySelectorAll('.work-section'),
      ...document.querySelectorAll('.about-section'),
      ...document.querySelectorAll('.contact-section'),
      ...document.querySelectorAll('.work-item')
    ];
  
    // Options for the Intersection Observer
    const observerOptions = {
      threshold: 0.1  // Adjust to taste. 0.1 means element is considered visible when 10% is in view.
    };
  
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          obs.unobserve(entry.target); // Stop observing once the fade-in animation has triggered
        }
      });
    }, observerOptions);
  
    // Observe each element that needs to fade in
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  });