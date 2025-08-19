/**
 * SPARROW-DS Notification Management Module
 * Handles all notification-related functionality
 */

class NotificationManager {
    constructor() {
        this.container = null;
        this.isInitialized = false;
        this.autoRemoveTimeout = 5000; // 5 seconds
        
        this.init();
    }

    init() {
        this.container = document.querySelector('.notification-container');
        
        if (this.container) {
            this.setupEventListeners();
            this.isInitialized = true;
        } else {
            console.warn('Notification container not found');
        }
    }

    setupEventListeners() {
        // Delegate close button clicks
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList && target.classList.contains('notification-close')) {
                this.handleCloseClick(event);
            }
        });

        // Auto-remove notifications after timeout
        this.setupAutoRemoval();
    }

    handleCloseClick(event) {
        if (event.target.classList.contains('notification-close')) {
            const notification = event.target.closest('.notification');
            if (notification) {
                this.removeNotification(notification);
            }
        }
    }

    setupAutoRemoval() {
        if (typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Respect reduced motion: remove instantly without animation
            setTimeout(() => {
                const notifications = document.querySelectorAll('.notification');
                notifications.forEach(notification => {
                    if (notification.parentNode) notification.remove();
                });
            }, this.autoRemoveTimeout);
            return;
        }

        setTimeout(() => {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                this.removeNotification(notification);
            });
        }, this.autoRemoveTimeout);
    }

    removeNotification(notificationElement) {
        if (notificationElement && notificationElement.classList.contains('notification')) {
            // Use the SPARROW notification system if available
            if (window.sparrowNotifications && typeof window.sparrowNotifications.removeElement === 'function') {
                window.sparrowNotifications.removeElement(notificationElement);
            } else {
                // Fallback removal with animation
                this.animateOut(notificationElement);
            }
        }
    }

    animateOut(notificationElement) {
        if (!notificationElement) return;
        // Skip animations for reduced motion
        if (typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (notificationElement.parentNode) notificationElement.remove();
            return;
        }
        notificationElement.style.transform = 'translateX(100%)';
        notificationElement.style.opacity = '0';
        
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.remove();
            }
        }, 300);
    }

    removeAllNotifications() {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }

    // Test function for debugging
    testNotificationRemoval() {
        console.log('Testing notification removal...');
        const notifications = document.querySelectorAll('.notification');
        console.log('Found notifications:', notifications.length);
        this.removeAllNotifications();
    }

    // Public methods for external use
    remove(notificationElement) {
        this.removeNotification(notificationElement);
    }

    removeAll() {
        this.removeAllNotifications();
    }

    test() {
        this.testNotificationRemoval();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
} else {
    window.NotificationManager = NotificationManager;
}
