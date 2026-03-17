// Arrow of Light Wildlife & Pest Solutions - Main JavaScript

(function() {
  'use strict';

  // Navigation Toggle
  function initNavToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Navigation Scroll Effect
  function initNavScrollEffect() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Scroll Fade-In Animation
  function initScrollFadeIn() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger the animation with a delay
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Auto-apply to common card elements
    const fadeElements = document.querySelectorAll(`
      .problem-card, 
      .service-card, 
      .step-card, 
      .pricing-card,
      .testimonial-card,
      .feature-card
    `);
    
    fadeElements.forEach((element) => {
      element.classList.add('fade-in');
      observer.observe(element);
    });
  }

  // Smooth Scrolling for Anchor Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Form Submission Handler
  function initFormHandler() {
    const forms = document.querySelectorAll('form[data-form="contact"]');
    
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          
          // For now, just show success message (SendGrid will be wired later)
          console.log('Form submission:', data);
          
          // Show success state
          submitButton.textContent = 'Message Sent!';
          submitButton.style.backgroundColor = '#2d5a27';
          
          // Reset form after delay
          setTimeout(() => {
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
          }, 3000);
          
        } catch (error) {
          console.error('Form submission error:', error);
          submitButton.textContent = 'Error - Try Again';
          submitButton.disabled = false;
          
          setTimeout(() => {
            submitButton.textContent = originalText;
          }, 3000);
        }
      });
    });
  }

  // FAQ Accordion Enhancement (native details/summary)
  function initFAQEnhancement() {
    const faqItems = document.querySelectorAll('.faq-item details');
    
    faqItems.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          // Close other FAQ items for accordion behavior
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.open) {
              otherItem.open = false;
            }
          });
        }
      });
    });
  }

  // Services Accordion (if present on services page)
  function initServicesAccordion() {
    const serviceToggles = document.querySelectorAll('.service-toggle');
    
    serviceToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        const isOpen = toggle.classList.contains('active');
        
        // Close all others
        serviceToggles.forEach(t => {
          t.classList.remove('active');
          if (t.nextElementSibling) {
            t.nextElementSibling.style.maxHeight = null;
          }
        });
        
        // Open current if it wasn't open
        if (!isOpen) {
          toggle.classList.add('active');
          if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        }
      });
    });
  }

  // Phone Number Click Tracking
  function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Track phone click for analytics
        console.log('Phone number clicked:', link.href);
        
        // You can add Google Analytics or other tracking here
        if (typeof gtag !== 'undefined') {
          gtag('event', 'phone_click', {
            phone_number: link.href.replace('tel:', ''),
            page_location: window.location.href
          });
        }
      });
    });
  }

  // Image Lazy Loading Enhancement
  function initImageLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // Initialize everything when DOM is ready
  function init() {
    initNavToggle();
    initNavScrollEffect();
    initScrollFadeIn();
    initSmoothScroll();
    initFormHandler();
    initFAQEnhancement();
    initServicesAccordion();
    initPhoneTracking();
    initImageLazyLoading();
    
    console.log('Arrow of Light website initialized');
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();