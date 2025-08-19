/**
 * SPARROW-DS Main Application Module
 * Orchestrates all system components and initialization
 */

class SparrowApp {
    constructor() {
        this.modules = {
            menu: null,
            notifications: null,
            animations: null
        };
        
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            // Initialize menu manager
            this.modules.menu = new MenuManager();
            
            // Initialize notification manager
            this.modules.notifications = new NotificationManager();
            
            // Initialize animation manager
            this.modules.animations = new AnimationManager();
            
            // Setup additional functionality
            this.setupAdditionalFeatures();
            
            // Initialize SPARROW system if available
            this.initializeSparrowSystem();
            
            this.isInitialized = true;
            console.log('SPARROW-DS App initialized successfully');
            
        } catch (error) {
            console.error('Error initializing SPARROW-DS App:', error);
        }
    }

    setupAdditionalFeatures() {
        // Setup sub menu functionality
        this.setupSubMenu();
        
        // Setup utility functions
        this.setupUtilityFunctions();
        
        // Setup all animations
        if (this.modules.animations) {
            this.modules.animations.setupAllAnimations();
        }
    }

    setupSubMenu() {
        // Sub menu functionality (placeholder)
        window.openSubMenu = () => {
            alert('Sub menu functionality will be implemented here');
        };
    }

    setupUtilityFunctions() {
        // Global utility functions
        window.removeNotification = (notificationElement) => {
            if (this.modules.notifications) {
                this.modules.notifications.remove(notificationElement);
            }
        };

        window.removeAllNotifications = () => {
            if (this.modules.notifications) {
                this.modules.notifications.removeAll();
            }
        };

        window.testNotificationRemoval = () => {
            if (this.modules.notifications) {
                this.modules.notifications.test();
            }
        };

        // Menu functions for backward compatibility
        window.openMenu = () => {
            if (this.modules.menu) {
                this.modules.menu.open();
            }
        };

        window.closeMenu = () => {
            if (this.modules.menu) {
                this.modules.menu.close();
            }
        };
    }

    initializeSparrowSystem() {
        // Initialize SPARROW system if available
        if (typeof SparrowSystem !== 'undefined') {
            try {
                SparrowSystem.initialize();
                console.log('SPARROW System initialized');
            } catch (error) {
                console.warn('SPARROW System initialization failed:', error);
            }
        } else {
            console.log('SPARROW System not available, using fallback functionality');
        }
    }

    // Public methods for external use
    getMenuManager() {
        return this.modules.menu;
    }

    getNotificationManager() {
        return this.modules.notifications;
    }

    getAnimationManager() {
        return this.modules.animations;
    }

    // Utility methods
    showNotification(message, type = 'info', duration = 5000) {
        if (this.modules.notifications) {
            // This would integrate with the notification system
            console.log(`Notification: ${message} (${type})`);
        }
    }

    animateElement(element, animationType = 'fadeIn') {
        if (this.modules.animations) {
            this.modules.animations.animate(element, animationType);
        }
    }

    // System status
    getStatus() {
        return {
            initialized: this.isInitialized,
            modules: Object.keys(this.modules).map(key => ({
                name: key,
                status: this.modules[key] ? 'active' : 'inactive'
            }))
        };
    }
}

// Initialize the application when the script loads
let sparrowApp = null;
let initializeAttempts = 0;
const MAX_INITIALIZE_ATTEMPTS = 50; // ~5s with 100ms backoff

// Wait for all modules to load
function initializeApp() {
    if (typeof MenuManager !== 'undefined' && 
        typeof NotificationManager !== 'undefined' && 
        typeof AnimationManager !== 'undefined') {
        
        sparrowApp = new SparrowApp();
        
        // Make it globally available
        window.sparrowApp = sparrowApp;
        
        console.log('SPARROW-DS Application ready');
    } else {
        // Retry after a short delay with cap
        if (initializeAttempts < MAX_INITIALIZE_ATTEMPTS) {
            initializeAttempts += 1;
            setTimeout(initializeApp, 100);
        } else {
            console.warn('SPARROW-DS Application: modules not available after retries');
        }
    }
}

// Start initialization
initializeApp();
