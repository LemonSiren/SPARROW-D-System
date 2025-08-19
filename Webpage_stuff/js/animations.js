/**
 * SPARROW-DS Animation Management Module
 * Handles all animation and UI effect functionality
 */

class AnimationManager {
    constructor() {
        this.observer = null;
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        // Header auto-hide state
        this.headerEl = null;
        this.mainContentEl = null;
        this.headerHeight = 0;
        this.lastScrollY = 0;
        this.scrollTicking = false;
        this.hideTolerance = 5;
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHeaderAutoHide();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);
    }

    setupScrollAnimations() {
        // Respect reduced motion
        const prefersReduced = typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        document.querySelectorAll('.fade-in-up').forEach(section => {
            if (prefersReduced) {
                // Apply final styles without animation
                section.style.opacity = '1';
                section.style.transform = 'none';
                return;
            }
            this.prepareElement(section);
            this.observer.observe(section);
        });
    }

    prepareElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    // Add click effects to interactive elements
    setupClickEffects() {
        // Log items
        document.addEventListener('click', (event) => {
            const target = event.target.closest('.log-item, .suggestion-item, .data-card');
            if (!target) return;
            this.handleClickEffect({ currentTarget: target });
        });
    }

    handleClickEffect(event) {
        const element = event.currentTarget;
        
        // Add visual feedback
        element.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    // Fade in animation for elements
    fadeIn(element, duration = 600) {
        if (element) {
            const prefersReduced = typeof window.matchMedia === 'function' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                element.style.opacity = '1';
                element.style.transform = 'none';
                return;
            }
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all ${duration}ms ease-out`;
            
            // Trigger animation
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }
    }

    // Fade out animation for elements
    fadeOut(element, duration = 600) {
        if (element) {
            const prefersReduced = typeof window.matchMedia === 'function' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                element.style.opacity = '0';
                element.style.transform = 'none';
                return;
            }
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    }

    // Slide in from right animation
    slideInRight(element, duration = 300) {
        if (element) {
            const prefersReduced = typeof window.matchMedia === 'function' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                element.style.transform = 'none';
                return;
            }
            element.style.transform = 'translateX(100%)';
            element.style.transition = `all ${duration}ms ease-out`;
            
            requestAnimationFrame(() => {
                element.style.transform = 'translateX(0)';
            });
        }
    }

    // Slide out to right animation
    slideOutRight(element, duration = 300) {
        if (element) {
            const prefersReduced = typeof window.matchMedia === 'function' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                element.style.transform = 'none';
                return;
            }
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.transform = 'translateX(100%)';
        }
    }

    // Pulse animation
    pulse(element, duration = 1000) {
        if (element) {
            element.style.animation = `pulse ${duration}ms ease-in-out`;
            
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        }
    }

    // Bounce animation
    bounce(element, duration = 600) {
        if (element) {
            element.style.animation = `bounce ${duration}ms ease-in-out`;
            
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        }
    }

    // Shake animation
    shake(element, duration = 500) {
        if (element) {
            element.style.animation = `shake ${duration}ms ease-in-out`;
            
            setTimeout(() => {
                element.style.animation = '';
            }, duration);
        }
    }

    // Add custom keyframe animations
    addCustomAnimations() {
        if (!document.getElementById('custom-animations')) {
            const style = document.createElement('style');
            style.id = 'custom-animations';
            style.textContent = `
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                    40%, 43% { transform: translate3d(0,-30px,0); }
                    70% { transform: translate3d(0,-15px,0); }
                    90% { transform: translate3d(0,-4px,0); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize all animations
    setupAllAnimations() {
        this.addCustomAnimations();
        this.setupClickEffects();
    }

    // Auto-hide header on scroll down, show on scroll up
    setupHeaderAutoHide() {
        this.headerEl = document.querySelector('.header');
        this.mainContentEl = document.querySelector('.main-content');
        if (!this.headerEl || !this.mainContentEl) return;

        // Respect reduced motion
        const prefersReduced = typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const updateHeaderMetrics = () => {
            this.headerHeight = this.headerEl.offsetHeight || 0;
            this.mainContentEl.style.marginTop = `${this.headerHeight}px`;
        };

        updateHeaderMetrics();
        window.addEventListener('resize', updateHeaderMetrics, { passive: true });

        this.lastScrollY = window.scrollY;

        const onScroll = () => {
            if (this.scrollTicking) return;
            this.scrollTicking = true;
            requestAnimationFrame(() => {
                const currentY = window.scrollY;
                const scrolledDown = currentY > this.lastScrollY + this.hideTolerance;
                const scrolledUp = currentY < this.lastScrollY - this.hideTolerance;

                if (scrolledDown) {
                    this.headerEl.classList.add('hide');
                } else if (scrolledUp) {
                    this.headerEl.classList.remove('hide');
                }

                this.lastScrollY = currentY;
                this.scrollTicking = false;
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Public methods for external use
    animate(element, animationType = 'fadeIn') {
        switch (animationType) {
            case 'fadeIn':
                this.fadeIn(element);
                break;
            case 'fadeOut':
                this.fadeOut(element);
                break;
            case 'slideInRight':
                this.slideInRight(element);
                break;
            case 'slideOutRight':
                this.slideOutRight(element);
                break;
            case 'pulse':
                this.pulse(element);
                break;
            case 'bounce':
                this.bounce(element);
                break;
            case 'shake':
                this.shake(element);
                break;
            default:
                this.fadeIn(element);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
} else {
    window.AnimationManager = AnimationManager;
}
