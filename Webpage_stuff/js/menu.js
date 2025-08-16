/**
 * SPARROW-DS Menu Management Module
 * Handles all menu-related functionality including mobile support
 */

class MenuManager {
    constructor() {
        this.sidemenu = null;
        this.openMenuBtn = null;
        this.isInitialized = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        this.sidemenu = document.getElementById('mySidemenu');
        this.openMenuBtn = document.getElementById('openMenuBtn');
        
        if (this.sidemenu && this.openMenuBtn) {
            this.setupEventListeners();
            this.ensureMenuClosed();
            this.isInitialized = true;
        } else {
            console.warn('Menu elements not found');
        }
    }

    setupEventListeners() {
        // Menu button click
        if (this.openMenuBtn) {
            this.openMenuBtn.addEventListener('click', () => this.openMenu());
        }

        // Close menu when clicking outside
        document.addEventListener('click', (event) => this.handleOutsideClick(event));

        // Close menu on escape key
        document.addEventListener('keydown', (event) => this.handleKeyPress(event));

        // Close menu on window resize
        window.addEventListener('resize', () => this.handleResize());

        // Touch gesture support
        this.setupTouchGestures();
    }

    setupTouchGestures() {
        document.addEventListener('touchstart', (event) => {
            this.touchStartX = event.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (event) => {
            this.touchEndX = event.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    openMenu() {
        if (this.sidemenu) {
            this.sidemenu.style.width = "280px";
            this.sidemenu.classList.add('open');
        }
    }

    closeMenu() {
        if (this.sidemenu) {
            this.sidemenu.style.width = "0";
            this.sidemenu.classList.remove('open');
        }
    }

    ensureMenuClosed() {
        if (this.sidemenu) {
            this.sidemenu.style.width = "0";
            this.sidemenu.classList.remove('open');
        }
    }

    handleOutsideClick(event) {
        if (this.sidemenu && !this.sidemenu.contains(event.target) && 
            this.openMenuBtn && !this.openMenuBtn.contains(event.target)) {
            this.closeMenu();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Escape') {
            this.closeMenu();
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMenu();
        }
    }

    handleSwipe() {
        if (!this.sidemenu) return;

        const swipeThreshold = 50;
        const swipeDistance = this.touchEndX - this.touchStartX;

        // Swipe left to close menu (if menu is open)
        if (this.sidemenu.classList.contains('open') && swipeDistance < -swipeThreshold) {
            this.closeMenu();
        }
        // Swipe right to open menu (if menu is closed)
        else if (!this.sidemenu.classList.contains('open') && swipeDistance > swipeThreshold) {
            this.openMenu();
        }
    }

    // Public methods for external use
    open() {
        this.openMenu();
    }

    close() {
        this.closeMenu();
    }

    toggle() {
        if (this.sidemenu && this.sidemenu.classList.contains('open')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuManager;
} else {
    window.MenuManager = MenuManager;
}
