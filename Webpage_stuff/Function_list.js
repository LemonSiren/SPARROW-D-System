// SPARROW-DS System Utility Functions
// Modern, refined functions for the agricultural monitoring dashboard

/**
 * Real-time data update utilities
 */
class SparrowDataManager {
    constructor() {
        this.updateInterval = 30000; // 30 seconds
        this.isRunning = false;
        this.dataCache = new Map();
    }

    /**
     * Start real-time data updates
     */
    startRealTimeUpdates() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.updateData();
        
        setInterval(() => {
            this.updateData();
        }, this.updateInterval);
    }

    /**
     * Stop real-time data updates
     */
    stopRealTimeUpdates() {
        this.isRunning = false;
    }

    /**
     * Update dashboard data
     */
    updateData() {
        // Simulate real-time data updates
        this.updateCropHealth();
        this.updateSoilMoisture();
        this.updateBirdActivity();
        this.updateWeather();
        this.updateNotifications();
    }

    /**
     * Update crop health data
     */
    updateCropHealth() {
        const cropHealthElement = document.querySelector('.data-card .card-status');
        if (cropHealthElement && cropHealthElement.textContent.includes('CROP HEALTH')) {
            const statuses = ['HEALTHY', 'UNHEALTHY', 'WARNING'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            cropHealthElement.textContent = randomStatus;
            
            // Update status class
            cropHealthElement.className = 'card-status';
            if (randomStatus === 'HEALTHY') {
                cropHealthElement.classList.add('status-healthy');
            } else if (randomStatus === 'WARNING') {
                cropHealthElement.classList.add('status-warning');
            } else {
                cropHealthElement.classList.add('status-danger');
            }
        }
    }

    /**
     * Update soil moisture data
     */
    updateSoilMoisture() {
        const soilElement = document.querySelector('.data-card .card-status');
        if (soilElement && soilElement.textContent.includes('SOIL MOISTURE')) {
            const moistureLevels = ['DRY', 'MOIST', 'WET'];
            const randomLevel = moistureLevels[Math.floor(Math.random() * moistureLevels.length)];
            soilElement.textContent = randomLevel;
        }
    }

    /**
     * Update bird activity data
     */
    updateBirdActivity() {
        const birdElement = document.querySelector('.data-card .card-status');
        if (birdElement && birdElement.textContent.includes('BIRD ACTIVITY')) {
            const activityLevels = ['LOW', 'MEDIUM', 'HIGH'];
            const randomLevel = activityLevels[Math.floor(Math.random() * activityLevels.length)];
            birdElement.textContent = randomLevel + ' ✓';
        }
    }

    /**
     * Update weather data
     */
    updateWeather() {
        const weatherElement = document.querySelector('.data-card .card-status');
        if (weatherElement && weatherElement.textContent.includes('WEATHER')) {
            const weatherConditions = ['SUNNY', 'CLOUDY', 'RAINY', 'PARTLY CLOUDY'];
            const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            weatherElement.textContent = randomCondition;
        }
    }

    /**
     * Update notification badge
     */
    updateNotifications() {
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            const currentCount = parseInt(notificationBadge.textContent) || 0;
            const newCount = Math.max(0, currentCount + (Math.random() > 0.7 ? 1 : 0));
            notificationBadge.textContent = newCount;
            
            if (newCount > 0) {
                notificationBadge.style.animation = 'pulse 1s infinite';
            } else {
                notificationBadge.style.animation = 'none';
            }
        }
    }
}

/**
 * Chart and visualization utilities
 */
class SparrowCharts {
    /**
     * Create a simple progress bar
     */
    static createProgressBar(container, value, max, label) {
        const progressHTML = `
            <div class="progress-container">
                <div class="progress-label">${label}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(value / max) * 100}%"></div>
                </div>
                <div class="progress-value">${value}/${max}</div>
            </div>
        `;
        
        if (typeof container === 'string') {
            document.getElementById(container).innerHTML = progressHTML;
        } else {
            container.innerHTML = progressHTML;
        }
    }

    /**
     * Create a gauge chart
     */
    static createGauge(container, value, max, label, color = '#4ade80') {
        const percentage = (value / max) * 100;
        const angle = (percentage / 100) * 180;
        
        const gaugeHTML = `
            <div class="gauge-container">
                <div class="gauge-label">${label}</div>
                <div class="gauge">
                    <div class="gauge-fill" style="transform: rotate(${angle}deg); background: ${color}"></div>
                </div>
                <div class="gauge-value">${value}%</div>
            </div>
        `;
        
        if (typeof container === 'string') {
            document.getElementById(container).innerHTML = gaugeHTML;
        } else {
            container.innerHTML = gaugeHTML;
        }
    }
}

/**
 * Notification system
 */
class SparrowNotifications {
    constructor() {
        this.notifications = [];
        this.container = null;
    }

    /**
     * Initialize notification container
     */
    init(containerId = 'notification-container') {
        if (!document.getElementById(containerId)) {
            const container = document.createElement('div');
            container.id = containerId;
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        this.container = document.getElementById(containerId);
    }

    /**
     * Show a notification
     */
    show(message, type = 'info', duration = 5000) {
        const notification = {
            id: Date.now(),
            message,
            type,
            duration
        };

        this.notifications.push(notification);
        this.render(notification);
        
        setTimeout(() => {
            this.remove(notification.id);
        }, duration);
    }

    /**
     * Render a notification
     */
    render(notification) {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification notification-${notification.type}`;
        notificationElement.setAttribute('data-id', notification.id);
        notificationElement.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${notification.message}</span>
                <button class="notification-close" onclick="this.closest('.notification').remove()">&times;</button>
            </div>
        `;
        
        this.container.appendChild(notificationElement);
        
        // Add animation
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);
    }

    /**
     * Remove a notification
     */
    remove(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            const element = this.container.querySelector(`[data-id="${id}"]`);
            if (element) {
                element.classList.remove('show');
                element.style.transform = 'translateX(100%)';
                element.style.opacity = '0';
                setTimeout(() => {
                    element.remove();
                }, 300);
            }
            this.notifications = this.notifications.filter(n => n.id !== id);
        }
    }

    /**
     * Remove notification by element
     */
    removeElement(element) {
        if (element && element.classList.contains('notification')) {
            element.classList.remove('show');
            element.style.transform = 'translateX(100%)';
            element.style.opacity = '0';
            setTimeout(() => {
                element.remove();
            }, 300);
        }
    }

    /**
     * Clear all notifications
     */
    clear() {
        this.notifications = [];
        this.container.innerHTML = '';
    }
}

/**
 * Data export utilities
 */
class SparrowDataExport {
    /**
     * Export data as CSV
     */
    static exportToCSV(data, filename = 'sparrow-data.csv') {
        const csvContent = this.convertToCSV(data);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    /**
     * Convert data to CSV format
     */
    static convertToCSV(data) {
        if (!Array.isArray(data) || data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value}"` : value;
            });
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    }

    /**
     * Export data as JSON
     */
    static exportToJSON(data, filename = 'sparrow-data.json') {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

/**
 * Theme management
 */
class SparrowThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                primary: '#4ade80',
                secondary: '#fbbf24',
                background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
                surface: 'rgba(255, 255, 255, 0.1)',
                text: '#ffffff'
            },
            light: {
                primary: '#059669',
                secondary: '#d97706',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
                surface: 'rgba(0, 0, 0, 0.05)',
                text: '#1e293b'
            }
        };
    }

    /**
     * Toggle between themes
     */
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('sparrow-theme', this.currentTheme);
    }

    /**
     * Apply current theme
     */
    applyTheme() {
        const theme = this.themes[this.currentTheme];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--surface-color', theme.surface);
        root.style.setProperty('--text-color', theme.text);
        
        // Update body background
        document.body.style.background = theme.background;
        document.body.style.color = theme.text;
    }

    /**
     * Initialize theme from localStorage
     */
    init() {
        const savedTheme = localStorage.getItem('sparrow-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.currentTheme = savedTheme;
        }
        this.applyTheme();
    }
}

/**
 * Initialize all SPARROW-DS components
 */
function initializeSparrowSystem() {
    // Initialize theme manager
    const themeManager = new SparrowThemeManager();
    themeManager.init();
    
    // Initialize data manager
    const dataManager = new SparrowDataManager();
    
    // Initialize notifications
    const notifications = new SparrowNotifications();
    notifications.init();
    
    // Start real-time updates after a delay
    setTimeout(() => {
        dataManager.startRealTimeUpdates();
    }, 2000);
    
    // Add theme toggle button to header if it exists
    const header = document.querySelector('.header');
    if (header) {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.onclick = () => themeManager.toggleTheme();
        header.appendChild(themeToggle);
    }
    
    // Show welcome notification
    notifications.show('SPARROW-DS System initialized successfully!', 'success', 3000);
    
    return {
        themeManager,
        dataManager,
        notifications
    };
}

// Global instances
let sparrowSystem = null;
let sparrowNotifications = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    sparrowSystem = initializeSparrowSystem();
    sparrowNotifications = sparrowSystem.notifications;
});

// Export for global use
window.SparrowSystem = {
    initialize: initializeSparrowSystem,
    charts: SparrowCharts,
    export: SparrowDataExport,
    notifications: SparrowNotifications
};