/**
 * Demo Website - Main JavaScript
 */

'use strict';


const CONFIG = {
    scrollOffset: 80,
    animationDuration: 2000,
    statisticsThreshold: 0.5,
    cardAnimationThreshold: 0.1,
};

/**
 * ==============================================
 * UTILITY FUNCTIONS
 * ==============================================
 */
const Utils = {
    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function}
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

/**
 * ==============================================
 * NAVIGATION MODULE
 * ==============================================
 */
const Navigation = {
    init() {
        this.setupSmoothScrolling();
        this.setupScrollEffect();
        this.setupMobileMenu();
    },

    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - CONFIG.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    /**
     * Setup navbar scroll effect
     */
    setupScrollEffect() {
        const navbar = document.querySelector('.navbar');
        
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        };

        window.addEventListener('scroll', Utils.debounce(handleScroll, 10));
        handleScroll(); // Initial check
    },

    /**
     * Setup mobile menu auto-close functionality
     */
    setupMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('#navbarNav .nav-link');
        
        if (!navbarToggler || !navbarCollapse) return;

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
};

/**
 * ==============================================
 * STATISTICS MODULE
 * ==============================================
 */
const Statistics = {
    init() {
        this.setupAnimations();
    },

    /**
     * Animate a counter from 0 to target
     * @param {HTMLElement} element - Element to animate
     * @param {number} target - Target number
     * @param {number} duration - Animation duration in ms
     */
    animateCounter(element, target, duration = CONFIG.animationDuration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                element.classList.add('animate');
                setTimeout(() => element.classList.remove('animate'), 300);
            }
        };
        
        updateCounter();
    },

    /**
     * Setup intersection observer for statistics animation
     */
    setupAnimations() {
        const statisticsSection = document.querySelector('#services .border-top');
        const statisticNumbers = document.querySelectorAll('.statistic-number');
        
        if (!statisticsSection || statisticNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statisticNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        this.animateCounter(stat, target);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: CONFIG.statisticsThreshold });
        
        observer.observe(statisticsSection);
    }
};

/**
 * ==============================================
 * PORTFOLIO MODULE
 * ==============================================
 */
const Portfolio = {
    init() {
        this.setupFiltering();
        this.setupModals();
    },

    /**
     * Setup portfolio filtering functionality
     */
    setupFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length === 0 || portfolioItems.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const filterValue = button.getAttribute('data-filter');
                this.filterItems(portfolioItems, filterValue);
            });
        });
    },

    /**
     * Filter portfolio items based on category
     * @param {NodeList} items - Portfolio items
     * @param {string} filterValue - Filter category
     */
    filterItems(items, filterValue) {
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    },

    /**
     * Setup modal functionality
     */
    setupModals() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const viewLiveButtons = document.querySelectorAll('.modal-footer .btn-primary');
        
        // Add click animation to portfolio items
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Handle "View Live Site" button clicks
        viewLiveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modalTitle = this.closest('.modal').querySelector('.modal-title').textContent;
                alert(`Opening live site for ${modalTitle}. In a real application, this would navigate to the actual project URL.`);
            });
        });
    }
};

/**
 * ==============================================
 * CONTACT FORM MODULE
 * ==============================================
 */
const ContactForm = {
    init() {
        this.setupFormValidation();
    },

    /**
     * Setup contact form validation and submission
     */
    setupFormValidation() {
        const contactForm = document.querySelector('form');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            if (this.validateForm(formData)) {
                this.handleSubmit(contactForm, formData);
            } else {
                alert('Please fill in all fields.');
            }
        });
    },

    /**
     * Validate form data
     * @param {Object} formData - Form data object
     * @returns {boolean}
     */
    validateForm(formData) {
        return formData.name && formData.email && formData.message;
    },

    /**
     * Handle form submission
     * @param {HTMLFormElement} form - Form element
     * @param {Object} formData - Form data
     */
    handleSubmit(form, formData) {
        // Simulate API call
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    }
};

/**
 * ==============================================
 * ANIMATIONS MODULE
 * ==============================================
 */
const Animations = {
    init() {
        this.setupScrollAnimations();
    },

    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        const cards = document.querySelectorAll('.card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: CONFIG.cardAnimationThreshold,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
};

/**
 * ==============================================
 * APPLICATION INITIALIZATION
 * ==============================================
 */
const App = {
    /**
     * Initialize the application
     */
    init() {
        console.log('%c🚀 Demo Agency App Initialized', 'color: #667eea; font-size: 14px; font-weight: bold;');
        
        // Initialize all modules
        Navigation.init();
        Statistics.init();
        Portfolio.init();
        ContactForm.init();
        Animations.init();
        
        console.log('%c✅ All modules loaded successfully', 'color: #28a745; font-size: 12px;');
    }
};

/**
 * ==============================================
 * DOM READY
 * ==============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * ==============================================
 * EXPORT (for testing purposes)
 * ==============================================
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        Navigation,
        Statistics,
        Portfolio,
        ContactForm,
        Animations,
        App
    };
}