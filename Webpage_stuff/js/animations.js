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
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
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
        // Observe all sections for animation
        document.querySelectorAll('.fade-in-up').forEach(section => {
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
        document.querySelectorAll('.log-item').forEach(entry => {
            entry.addEventListener('click', (event) => this.handleClickEffect(event));
        });

        // Suggestion items
        document.querySelectorAll('.suggestion-item').forEach(entry => {
            entry.addEventListener('click', (event) => this.handleClickEffect(event));
        });

        // Data cards
        document.querySelectorAll('.data-card').forEach(entry => {
            entry.addEventListener('click', (event) => this.handleClickEffect(event));
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
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    }

    // Slide in from right animation
    slideInRight(element, duration = 300) {
        if (element) {
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
