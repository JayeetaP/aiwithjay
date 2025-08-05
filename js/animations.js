// ===== ADVANCED ANIMATIONS =====

// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: function() {
                // Disable animations on mobile for better performance
                return window.innerWidth < 768;
            }
        });
    }
    
    // Initialize custom animations
    initCustomAnimations();
    initParticleBackground();
    initGradientAnimation();
    initTextAnimations();
    initImageEffects();
});

// ===== CUSTOM ANIMATIONS =====
function initCustomAnimations() {
    // Floating animation for hero image
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        heroImage.style.animation = 'float 3s ease-in-out infinite';
    }
    
    // Pulse animation for achievement badges
    const badges = document.querySelectorAll('.achievement-badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.5}s`;
        badge.classList.add('pulse-animation');
    });
    
    // Stagger animation for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
    
    // Timeline animation
    animateTimeline();
    
    // Stats counter animation
    initAdvancedCounters();
}

// ===== PARTICLE BACKGROUND =====
function initParticleBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #3b82f6, #06b6d4);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: float-particle ${duration}s linear infinite;
        animation-delay: ${delay}s;
        opacity: 0.6;
    `;
    
    container.appendChild(particle);
}

// ===== GRADIENT ANIMATION =====
function initGradientAnimation() {
    const gradientElements = document.querySelectorAll('.btn-primary, .card-icon, .logo-text');
    
    gradientElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #1e3a8a 100%)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)';
        });
    });
}

// ===== TEXT ANIMATIONS =====
function initTextAnimations() {
    // Typewriter effect for hero title
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typewriter effect after page load
        setTimeout(typeWriter, 500);
    }
    
    // Text reveal animation
    initTextReveal();
    
    // Split text animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        splitTextAnimation(title);
    });
}

function initTextReveal() {
    const textElements = document.querySelectorAll('.hero-description, .about-intro p');
    
    textElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-reveal');
                }
            });
        });
        
        observer.observe(element);
    });
}

function splitTextAnimation(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.6s ease ${index * 0.1}s`;
        element.appendChild(span);
    });
    
    // Trigger animation when element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
            }
        });
    });
    
    observer.observe(element);
}

// ===== IMAGE EFFECTS =====
function initImageEffects() {
    // Parallax effect for images
    const images = document.querySelectorAll('.hero-img, .about-img');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const speed = 0.5;
                const yPos = -(scrollY * speed);
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 16));
    
    // Image hover effects
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'brightness(1.1)';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            }
        });
    });
}

// ===== TIMELINE ANIMATION =====
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
                
                // Animate the timeline dot
                const dot = entry.target.querySelector('::before');
                if (dot) {
                    setTimeout(() => {
                        entry.target.style.setProperty('--dot-scale', '1.2');
                    }, 400);
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== ADVANCED COUNTERS =====
function initAdvancedCounters() {
    const counters = document.querySelectorAll('.stat-number, .impact-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target') || element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current);
            
            // Add special formatting
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
        
        // Add pulsing effect during counting
        element.style.animation = 'pulse 0.5s ease-in-out infinite';
        setTimeout(() => {
            element.style.animation = 'none';
        }, duration);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.7
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== MOUSE INTERACTIONS =====
function initMouseInteractions() {
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Cursor trail effect
    if (window.innerWidth > 768) {
        initCursorTrail();
    }
}

function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #3b82f6, #06b6d4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hide cursor trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1e3a8a, #3b82f6, #06b6d4);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== CSS ANIMATIONS =====
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes float-particle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .text-reveal {
            animation: fadeInUp 1s ease-out forwards;
        }
        
        /* Disable animations for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== INITIALIZE ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    initMouseInteractions();
    initScrollProgress();
    
    // Performance check - disable heavy animations on slow devices
    if (navigator.hardwareConcurrency < 4) {
        console.log('Reduced animations for better performance');
        return;
    }
    
    // Initialize advanced features for capable devices
    setTimeout(() => {
        initCustomAnimations();
    }, 1000);
});