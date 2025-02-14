// Register ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);
// Initialize ScrollReveal
ScrollReveal({ reset: true });

// Apply animations to elements
ScrollReveal().reveal('.hero h1, .hero p, .hero .btn', {
  delay: 300,
  distance: '50px',
  origin: 'bottom',
  interval: 200,
});

ScrollReveal().reveal('.card', {
  delay: 300,
  distance: '50px',
  origin: 'bottom',
  interval: 200,
});

ScrollReveal().reveal('.portfolio-item', {
  delay: 300,
  distance: '50px',
  origin: 'bottom',
  interval: 200,
});
// Animate About Section Cards
// Floating symbols animation
gsap.utils.toArray(".symbol").forEach((symbol, index) => {
  gsap.set(symbol, {
    x: gsap.utils.random(-500, 500),
    y: gsap.utils.random(-300, 300),
  });

  gsap.to(symbol, {
    duration: gsap.utils.random(10, 15),
    x: "+=random(-100, 100)",
    y: "+=random(-50, 50)",
    opacity: 0.3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
});

// Text reveal animation
gsap.from(".about-text", {
  duration: 1.5,
  x: -100,
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
  }
});

// Title animation
gsap.from(".about-title", {
  duration: 1,
  y: 50,
  opacity: 0,
  scale: 0.5,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".about",
    start: "top 85%",
  }
});
gsap.to(".letter", {
  duration: 0.8,
  y: 0,
  opacity: 1,
  stagger: {
      amount: 1,
      from: "random"
  },
  ease: "power4.out",
  onComplete: () => {
      // Morph animation to logo
      gsap.to(".loader", {
          duration: 1,
          opacity: 0,
          onComplete: () => {
              document.querySelector(".loader").style.display = "none";
          }
      });

      // Animate logo into nav bar
      gsap.fromTo(".nav-logo",
          { 
              opacity: 0,
              scale: 0.8,
              y: 50
          },
          {
              duration: 1.2,
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "back.out(1.7)"
          }
      );

      // Show navigation
      gsap.to(".navbar", {
          duration: 1,
          top: 0,
          ease: "power4.out"
      });

      // Reveal hero section
      gsap.to(".hero", { 
          duration: 1,
          opacity: 1
      });

      // Animate hero content
      gsap.to(".hero-content", {
          duration: 1,
          y: 0,
          opacity: 1,
          ease: "power4.out"
      });
  }
});

// Background video animation
gsap.from("video", {
  duration: 2,
  filter: "brightness(0)",
  ease: "power2.inOut"
});
window.addEventListener('load', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.add('loaded');
});

// Active link animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');
  
  
  if (!navbar) {
      console.error('Navbar element not found!');
      return;
  }

  let navbarHeight = navbar.offsetHeight;

  function activateLink() {
      const scrollPosition = window.scrollY + navbarHeight + 100;

      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const sectionId = section.id;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${sectionId}`) {
                      link.classList.add('active');
                      gsap.to(link.parentElement, {
                          duration: 0.6,
                          y: -5,
                          ease: "elastic.out(1, 0.5)"
                      });
                  }
              });
          }
      });

      // Handle home section
      if (window.scrollY < 100) {
          navLinks.forEach(link => link.classList.remove('active'));
          document.querySelector('.nav-links a[href="#home"]').classList.add('active');
      }
  }

  // Initialize
  activateLink();

  // Event listeners
  window.addEventListener('scroll', () => requestAnimationFrame(activateLink));
  window.addEventListener('resize', () => {
      navbarHeight = navbar.offsetHeight;
      requestAnimationFrame(activateLink);
  });

  // Smooth scroll for nav links
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
              const targetPosition = targetSection.offsetTop - navbarHeight;
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  const dots = document.querySelectorAll('.progress-dot');
  let currentActive = 0;

  // Initialize first card as active
  updateCards(0);

  function updateCards(index) {
      cards.forEach((card, i) => {
          card.classList.remove('active', 'previous', 'next');
          
          if(i === index) {
              card.classList.add('active');
          } else if(i < index) {
              card.classList.add('previous');
          } else {
              card.classList.add('next');
          }
      });

      dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
      });
  }

  // Scroll handler
 
window.addEventListener('scroll', () => {
  const section = document.querySelector('.services-section');
  const { top: sectionTop, height: sectionHeight } = section.getBoundingClientRect();
  const scrollStart = sectionTop + window.scrollY;
  const scrollEnd = scrollStart + sectionHeight;
  const currentScroll = window.scrollY + window.innerHeight;

  // Calculate progress within section boundaries
  const scrollProgress = Math.min(
    Math.max(0, (currentScroll - scrollStart) / sectionHeight), 
    1
  );

  const newActive = Math.floor(scrollProgress * (cards.length - 1));

  if(newActive !== currentActive) {
    currentActive = newActive;
    updateCards(currentActive);
  }
});

  // Click handler for cards
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      if(!card.classList.contains('active')) {
        // Calculate exact scroll position for this card
        const sectionTop = document.querySelector('.services-section').offsetTop;
        const cardPosition = sectionTop + (index * (window.innerHeight * 0.8));
        
        // window.scrollTo({
        //   top: cardPosition,
        //   behavior: 'smooth'
        // });
        
        // Force update after scroll completes
        setTimeout(() => {
          currentActive = index;
          updateCards(currentActive);
        }, 800);
      }
    });
  });

  // Hide progress dots when not in services section
  ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top center',
      end: 'bottom bottom',
      onEnter: () => document.querySelector('.scroll-progress').style.display = 'flex',
      onLeaveBack: () => document.querySelector('.scroll-progress').style.display = 'none'
  });
  
});
document.getElementById('phone').addEventListener('keydown', function(e) {
  const allowedKeys = ['+', '-', ' ', 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
  if (!/[0-9]|\./.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  
  // Validate fields
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');
  
  let isValid = true;
  const phoneValue = phone.value.replace(/[^\d+]/g, ''); // Remove all non-digit/non-plus characters
  const isValidPhone = /^\+?\d{10,15}$/.test(phoneValue); // Validate sanitized number
  
  if(!isValidPhone) {
    document.getElementById('phoneError').textContent = 
      'Please enter a valid phone number (10-15 digits, +country code optional)';
    phone.classList.add('invalid');
    return;
  }
  if(!name.value.trim()) {
    document.getElementById('nameError').textContent = 'Name is required';
    isValid = false;
  }
  
  if(!email.checkValidity()) {
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    isValid = false;
  }
  
  if(!phone.checkValidity()) {
    document.getElementById('phoneError').textContent = 
      'Please enter a valid phone number (10 digits, +country code optional)';
    isValid = false;
  }
  
  if(!message.value.trim()) {
    document.getElementById('messageError').textContent = 'Message is required';
    isValid = false;
  }

  if(isValid) {
    // Handle form submission
    console.log('Form is valid, submit data');
    // Add your AJAX submission code here
  }
});

// Real-time validation
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
  input.addEventListener('input', () => {
    const errorElement = input.parentElement.querySelector('.error-message');
    
    if(input.checkValidity()) {
      errorElement.textContent = '';
    } else {
      if(input.validity.valueMissing) {
        errorElement.textContent = 'This field is required';
      } else if(input.validity.typeMismatch) {
        errorElement.textContent = 'Please enter a valid format';
      } else if(input.validity.patternMismatch) {
        errorElement.textContent = input.id === 'phone' 
          ? 'Valid format: +1 2345678900 or 0234567890' 
          : 'Invalid format';
      }
    }
  });
});
document.getElementById('phone').addEventListener('input', function() {
  const errorElement = document.getElementById('phoneError');
  const sanitized = this.value.replace(/[^\d+]/g, '');
  
  if(sanitized.length < 10 || sanitized.length > 15) {
    errorElement.textContent = 'Phone number must be 10-15 digits';
  } else if(!this.checkValidity()) {
    errorElement.textContent = 'Invalid format (valid: +1 234 567 8900)';
  } else {
    errorElement.textContent = '';
  }
});
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
    
    // Toggle body overflow
    document.body.style.overflow = navLinks.classList.contains('active') 
        ? 'hidden' 
        : 'auto';
});
emailjs.init('N0HtgLQPJwuIqus_A'); // Replace with your EmailJS user ID

    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      emailjs.sendForm('service_ysv9mu9', 'template_w5qev76', this)
        .then(() => {
          document.getElementById('message').innerHTML = 'Message sent successfully!';
          document.getElementById('contactForm').reset();
        })
        .catch(() => {
          document.getElementById('message').innerHTML = 'Failed to send message. Please try again.';
        });
    });
