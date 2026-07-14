document.addEventListener('DOMContentLoaded', () => {

  /* --- MOBILE MENU TOGGLE --- */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });


  /* --- SCROLL NAVBAR STATE & SCROLL HIGHLIGHT --- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Dynamic active links on scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });


  /* --- SCROLL-TRIGGERED ANIMATIONS --- */
  const scrollElements = document.querySelectorAll('.scroll-animate');

  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // If skill panel is in view, trigger progress bars fill animation
        if (entry.target.id === 'skills-panel') {
          animateSkills();
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollElements.forEach(el => {
    elementObserver.observe(el);
  });


  /* --- SKILLS ANIMATION --- */
  function animateSkills() {
    const progressFills = document.querySelectorAll('.skill-progress-fill');
    progressFills.forEach(fill => {
      const percentage = fill.getAttribute('data-percentage');
      fill.style.width = percentage;
    });
  }


  /* --- PROJECTS FILTER SYSTEM --- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Set active button
      filterButtons.forEach(button => button.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Animation layout fade-out
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            // Trigger layout recalculation then fade back in
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300); // Matches transition styling time
      });
    });
  });


  /* --- CONTACT FORM HANDLER & VALIDATION --- */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset feedback
    formFeedback.className = 'form-message';
    formFeedback.textContent = '';

    // Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Basic Validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !subjectInput.value.trim() || !messageInput.value.trim()) {
      showFeedback('Please fill out all fields.', 'error');
      return;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Mock form submission success
    const submitBtn = document.getElementById('btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    
    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message <span class="spinner">⏳</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      showFeedback('Thank you, Sarah! Your message was sent successfully. She will reply soon.', 'success');
      contactForm.reset();
    }, 1500);
  });

  function isValidEmail(email) {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);
  }

  function showFeedback(message, type) {
    formFeedback.className = `form-message ${type}`;
    formFeedback.textContent = message;

    // Scroll to feedback message
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

});
