/**
 * STARK FINANCIAL - Landing Page JavaScript
 * Professional 2025 Interactions & Animations
 */

// ============================================
// TIME OF DAY THEME
// ============================================
function setTimeOfDay() {
    const hour = new Date().getHours();
    let timeOfDay;

    if (hour >= 5 && hour < 8) {
        timeOfDay = 'morning';
    } else if (hour >= 8 && hour < 17) {
        timeOfDay = 'day';
    } else if (hour >= 17 && hour < 20) {
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }

    document.documentElement.setAttribute('data-time', timeOfDay);
}

// Set immediately and update every minute
setTimeOfDay();
setInterval(setTimeOfDay, 60000);

// ============================================
// BACKGROUND EFFECTS TOGGLE
// ============================================
class EffectsToggle {
    constructor() {
        this.button = document.getElementById('effectsToggle');
        this.stylesheet = null;
        this.isActive = false;
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => this.toggle());

        // Check localStorage for saved preference (default: enabled)
        const savedState = localStorage.getItem('effectsEnabled');
        if (savedState !== 'false') {
            this.enable();
        }
    }

    toggle() {
        if (this.isActive) {
            this.disable();
        } else {
            this.enable();
        }
    }

    enable() {
        if (!this.stylesheet) {
            this.stylesheet = document.createElement('link');
            this.stylesheet.rel = 'stylesheet';
            this.stylesheet.href = 'effects/backgrounds.css';
            this.stylesheet.id = 'effects-stylesheet';
        }
        document.head.appendChild(this.stylesheet);
        this.isActive = true;
        this.button.classList.add('active');
        this.button.querySelector('.effects-on').style.display = 'none';
        this.button.querySelector('.effects-off').style.display = 'block';
        localStorage.setItem('effectsEnabled', 'true');
    }

    disable() {
        if (this.stylesheet && this.stylesheet.parentNode) {
            this.stylesheet.parentNode.removeChild(this.stylesheet);
        }
        this.isActive = false;
        this.button.classList.remove('active');
        this.button.querySelector('.effects-on').style.display = 'block';
        this.button.querySelector('.effects-off').style.display = 'none';
        localStorage.setItem('effectsEnabled', 'false');
    }
}

// ============================================
// PAGE LOADER
// ============================================
class PageLoader {
    constructor() {
        this.loader = document.querySelector('.page-loader');
        this.progress = document.querySelector('.loader-progress');
        this.loaded = 0;
        this.init();
    }

    init() {
        // Simulate loading progress
        const interval = setInterval(() => {
            this.loaded += Math.random() * 30;
            if (this.loaded >= 100) {
                this.loaded = 100;
                clearInterval(interval);
                setTimeout(() => this.hide(), 200);
            }
            this.updateProgress();
        }, 100);

        // Fallback: hide after 2 seconds max
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loaded = 100;
                this.updateProgress();
                setTimeout(() => this.hide(), 200);
            }, 500);
        });
    }

    updateProgress() {
        if (this.progress) {
            this.progress.style.width = `${this.loaded}%`;
        }
    }

    hide() {
        if (this.loader) {
            this.loader.classList.add('loaded');
            document.body.style.overflow = '';
        }
    }
}

// ============================================
// NAVIGATION
// ============================================
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.overlay = null;
        this.lastScroll = 0;

        this.init();
    }

    init() {
        // Create mobile overlay
        this.createOverlay();

        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile toggle
        this.mobileToggle?.addEventListener('click', () => this.toggleMobile());

        // Close mobile menu when clicking a link
        this.navLinks?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobile());
        });

        // Close mobile menu when clicking overlay
        this.overlay?.addEventListener('click', () => this.closeMobile());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navLinks?.classList.contains('active')) {
                this.closeMobile();
            }
        });
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.classList.add('mobile-menu-overlay');
        document.body.appendChild(this.overlay);
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            this.nav?.classList.add('scrolled');
        } else {
            this.nav?.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }

    toggleMobile() {
        const isActive = this.navLinks?.classList.contains('active');
        if (isActive) {
            this.closeMobile();
        } else {
            this.openMobile();
        }
    }

    openMobile() {
        this.mobileToggle?.classList.add('active');
        this.navLinks?.classList.add('active');
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobile() {
        this.mobileToggle?.classList.remove('active');
        this.navLinks?.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// ANIMATED COUNTERS
// ============================================
class AnimatedCounters {
    constructor() {
        this.counters = document.querySelectorAll('[data-counter]');
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(start + (target - start) * easedProgress);

            element.textContent = prefix + this.formatNumber(current) + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic-btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            const buttonText = button.querySelector('.magnetic-btn-text');

            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const moveX = x * 0.3;
                const moveY = y * 0.3;

                if (buttonText) {
                    buttonText.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });

            button.addEventListener('mouseleave', () => {
                if (buttonText) {
                    buttonText.style.transform = 'translate(0, 0)';
                }
            });
        });
    }
}

// ============================================
// RIPPLE EFFECT
// ============================================
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());
    }
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
class ScrollProgress {
    constructor() {
        this.progressBar = null;
        this.init();
    }

    init() {
        // Create progress bar element
        this.progressBar = document.createElement('div');
        this.progressBar.classList.add('scroll-progress');
        document.body.appendChild(this.progressBar);

        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        this.progressBar.style.width = `${progress}%`;
    }
}

// ============================================
// CARD MOUSE TRACKING
// ============================================
class CardMouseTracking {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card, .result-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }
}

// ============================================
// PARALLAX EFFECTS
// ============================================
class Parallax {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.update());
        });
    }

    update() {
        const scrollY = window.pageYOffset;

        this.elements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.1;
            const rect = element.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowCenterY = window.innerHeight / 2;
            const distance = centerY - windowCenterY;
            const movement = distance * speed;

            element.style.transform = `translateY(${movement}px)`;
        });
    }
}

// ============================================
// 3D TILT EFFECT
// ============================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.hero-card, .feature-card, .result-card, .testimonial-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            // Set fast transition for snappy response
            card.style.transition = 'transform 0.1s ease-out';

            card.addEventListener('mousemove', (e) => this.handleMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleLeave(e, card));
        });
    }

    handleMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }

    handleLeave(e, card) {
        card.style.transition = 'transform 0.25s ease-out';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        // Reset to fast transition after leave animation
        setTimeout(() => {
            card.style.transition = 'transform 0.1s ease-out';
        }, 250);
    }
}

// ============================================
// VIDEO PLAYER
// ============================================
class VideoPlayer {
    constructor() {
        this.placeholder = document.querySelector('.video-placeholder');
        this.init();
    }

    init() {
        this.placeholder?.addEventListener('click', () => {
            // Replace with your actual video embed
            this.placeholder.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="position: absolute; inset: 0; width: 100%; height: 100%;">
                </iframe>
            `;
        });
    }
}

// ============================================
// MOBILE STICKY CTA
// ============================================
class MobileStickyCTA {
    constructor() {
        this.cta = document.querySelector('.mobile-sticky-cta');
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        if (!this.cta || !this.hero) return;

        window.addEventListener('scroll', () => {
            const heroBottom = this.hero.offsetTop + this.hero.offsetHeight;

            if (window.pageYOffset > heroBottom - 200) {
                this.cta.classList.add('visible');
            } else {
                this.cta.classList.remove('visible');
            }
        });
    }
}

// ============================================
// TEXT SCRAMBLE EFFECT
// ============================================
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ============================================
// LOGOS INFINITE SCROLL
// ============================================
class LogosScroll {
    constructor() {
        this.track = document.querySelector('.logos-track');
        this.scrollPos = 0;
        this.speed = 0.5; // pixels per frame
        this.gap = 60;
        this.init();
    }

    init() {
        if (!this.track) return;

        // Get original items
        this.originalItems = Array.from(this.track.children);

        // Clone items enough times to ensure seamless loop on any screen
        for (let i = 0; i < 5; i++) {
            this.originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                this.track.appendChild(clone);
            });
        }

        // Remove CSS animation, we'll handle it with JS
        this.track.style.animation = 'none';

        // Calculate after a brief delay to ensure fonts are loaded
        setTimeout(() => {
            this.calculateWidth();
            this.scroll();
        }, 100);

        // Recalculate on font load
        if (document.fonts) {
            document.fonts.ready.then(() => this.calculateWidth());
        }

        // Pause on hover
        this.track.addEventListener('mouseenter', () => this.paused = true);
        this.track.addEventListener('mouseleave', () => this.paused = false);
    }

    calculateWidth() {
        let setWidth = 0;
        this.originalItems.forEach(item => {
            setWidth += item.offsetWidth;
        });
        setWidth += this.gap * this.originalItems.length;
        this.setWidth = setWidth;
    }

    scroll() {
        if (!this.paused && this.setWidth) {
            this.scrollPos += this.speed;

            // Reset when we've scrolled one full set
            if (this.scrollPos >= this.setWidth) {
                this.scrollPos -= this.setWidth;
            }

            this.track.style.transform = `translateX(-${this.scrollPos}px)`;
        }

        requestAnimationFrame(() => this.scroll());
    }
}

// ============================================
// TYPING EFFECT
// ============================================
class TypingEffect {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.wait = options.wait || 3000;
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentWord.substring(0, this.charIndex);

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// INTERSECTION OBSERVER UTILITY
// ============================================
class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        this.images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// MOBILE DETECTION
// ============================================
const isMobile = () => {
    return window.innerWidth <= 768 ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
};

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Prevent body scroll during load
    document.body.style.overflow = 'hidden';

    // Initialize all modules
    new PageLoader();
    new Navigation();
    new EffectsToggle();
    new SmoothScroll();
    new ScrollReveal();
    new AnimatedCounters();
    new MobileStickyCTA();
    new LogosScroll();
    new LazyLoad();
    new RippleEffect();
    new ScrollProgress();

    // Desktop-only effects (skip on mobile for performance)
    if (!isMobile()) {
        new MagneticButtons();
        new Parallax();
        new TiltEffect();
        new CardMouseTracking();
    }

    new VideoPlayer();

    // Add stagger animations to grids
    document.querySelectorAll('.features-grid .feature-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add(`stagger-${(index % 3) + 1}`);
    });

    document.querySelectorAll('.results-grid .result-card').forEach((card, index) => {
        card.classList.add('reveal-scale');
        card.classList.add(`stagger-${(index % 4) + 1}`);
    });

    document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.add(`stagger-${(index % 3) + 1}`);
    });

    document.querySelectorAll('.stats-grid .stat-item').forEach((item, index) => {
        item.classList.add('reveal');
        item.classList.add(`stagger-${(index % 4) + 1}`);
    });

    // Re-initialize scroll reveal for newly added elements
    setTimeout(() => {
        new ScrollReveal();
    }, 100);

    console.log('🚀 Stark Financial - All systems initialized');
});

// ============================================
// PERFORMANCE: Throttle scroll events
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// GSAP-like animation helper (lightweight)
// ============================================
const animate = {
    to: (element, properties, duration = 300) => {
        return new Promise(resolve => {
            const el = typeof element === 'string' ? document.querySelector(element) : element;
            if (!el) return resolve();

            el.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

            Object.keys(properties).forEach(prop => {
                el.style[prop] = properties[prop];
            });

            setTimeout(resolve, duration);
        });
    },

    from: (element, properties, duration = 300) => {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (!el) return Promise.resolve();

        // Set initial state
        Object.keys(properties).forEach(prop => {
            el.style[prop] = properties[prop];
        });

        // Force reflow
        el.offsetHeight;

        // Animate to default
        el.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

        return new Promise(resolve => {
            setTimeout(() => {
                Object.keys(properties).forEach(prop => {
                    el.style[prop] = '';
                });
                setTimeout(resolve, duration);
            }, 10);
        });
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PageLoader, Navigation, SmoothScroll, ScrollReveal, AnimatedCounters };
}
