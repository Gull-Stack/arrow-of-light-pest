// Arrow of Light Wildlife & Pest Solutions - Main JavaScript
// Interactive effects following D One Builders design patterns

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Nav scroll effect - add shadow when scrolled
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    function handleNavScroll() {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    }

    window.addEventListener('scroll', handleNavScroll);
    
    // 2. Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // 3. Scroll fade-in animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // 4. Step number pulse effect on hover
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 2s infinite';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
    
    // 5. Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = nav ? nav.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 6. Enhance native details elements for FAQ
    const faqDetails = document.querySelectorAll('.faq-item details');
    faqDetails.forEach(details => {
        details.addEventListener('toggle', function() {
            if (this.open) {
                // Close other open details in the same group
                faqDetails.forEach(other => {
                    if (other !== this && other.open) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
    
    // 7. Enhanced button hover effects
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 8. Comparison table row hover enhancement
    const comparisonRows = document.querySelectorAll('.comparison-table tbody tr');
    comparisonRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--gray-50)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // 9. Service card hover enhancement (already in CSS, but add JS for accessibility)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
        
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
    
    // 10. Problem card hover enhancement
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Add any desired action for problem cards
            }
        });
        
        card.setAttribute('tabindex', '0');
    });
    
    // 11. Loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // 12. Performance optimization: Pause animations when page is not visible
    document.addEventListener('visibilitychange', function() {
        const animations = document.querySelectorAll('[style*="animation"]');
        animations.forEach(el => {
            if (document.hidden) {
                el.style.animationPlayState = 'paused';
            } else {
                el.style.animationPlayState = 'running';
            }
        });
    });
    
    // 13. Preload critical images on hover
    const imageElements = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    imageElements.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 14. Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Remove keyboard nav class on mouse interaction
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // 15. Error handling for missing elements
    try {
        // Ensure all critical interactive elements exist
        const criticalElements = {
            nav: '.nav',
            heroButtons: '.hero-cta .btn',
            serviceCards: '.service-card'
        };
        
        for (const [name, selector] of Object.entries(criticalElements)) {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                console.warn(`Critical element missing: ${name} (${selector})`);
            }
        }
    } catch (error) {
        console.error('Error in critical element check:', error);
    }
    
    console.log('Arrow of Light - All interactive effects loaded successfully');
});

// Utility functions

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add support for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', '0s');
    
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
}