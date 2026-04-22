/**
 * FitFlow - Main Application
 * Initializes and manages the entire fitness tracking application
 */

class FitFlowApp {
    constructor() {
        this.setupModal = document.getElementById('setupModal');
        this.dashboard = document.getElementById('dashboard');
    }

    init() {
        // Check if user is set up
        if (!storage.hasProfile()) {
            this.showSetupModal();
        } else {
            this.showDashboard();
        }

        // Handle daily reset
        if (storage.hasDateChanged()) {
            this.resetDailyData();
        }

        // Initialize all managers
        uiManager.init();
        caloriesManager.init();
        waterManager.init();
        workoutsManager.init();

        // Update dashboard
        this.updateAll();

        // Setup periodic updates (every minute)
        setInterval(() => {
            this.updateAll();
        }, 60000);

        // Setup reset data functionality
        document.getElementById('resetAllBtn').addEventListener('click', () => {
            if (confirm('⚠️ This will delete ALL your data and cannot be undone. Are you sure?')) {
                if (confirm('Really sure? This is permanent!')) {
                    this.resetAllData();
                }
            }
        });
    }

    showSetupModal() {
        this.setupModal.classList.remove('hidden');
        this.dashboard.classList.add('hidden');

        document.getElementById('setupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSetup();
        });
    }

    showDashboard() {
        this.setupModal.classList.add('hidden');
        this.dashboard.classList.remove('hidden');
    }

    handleSetup() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseInt(document.getElementById('height').value);
        const targetWeight = parseFloat(document.getElementById('targetWeight').value);
        const activityLevel = document.getElementById('activityLevel').value;

        if (!weight || !height || !targetWeight || !activityLevel) {
            showToast('Please fill in all fields! 📋');
            return;
        }

        // Calculate daily calorie needs (using Mifflin-St Jeor formula)
        const dailyCalories = storage.calculateDailyCalories(weight, height, 30, activityLevel);

        const profile = {
            weight,
            height,
            targetWeight,
            activityLevel,
            dailyCalories,
            setupDate: new Date().toISOString()
        };

        storage.setProfile(profile);
        caloriesManager.updateCalorieGoal();

        showToast(`Welcome! Your daily goal is ${dailyCalories} kcal! 🎉`);

        this.showDashboard();
        this.updateAll();
    }

    resetDailyData() {
        // Reset daily tracking but keep history
        console.log('New day detected - resetting daily data');
    }

    resetAllData() {
        storage.clearAll();
        showToast('All data has been reset! 🔄');
        
        setTimeout(() => {
            location.reload();
        }, 1500);
    }

    updateAll() {
        uiManager.updateDashboard();
        caloriesManager.render();
        waterManager.render();
        workoutsManager.render();
        uiManager.renderHistory();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new FitFlowApp();
    app.init();

    // Make app globally accessible for debugging
    window.fitflowApp = app;
});
