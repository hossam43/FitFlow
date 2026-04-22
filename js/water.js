/**
 * FitFlow - Water Manager
 * Handles water intake tracking
 */

class WaterManager {
    constructor() {
        this.dailyGoal = 2000; // ml
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Water amount buttons
        document.querySelectorAll('.btn-water').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const amount = parseInt(btn.dataset.amount);
                this.addWater(amount);
            });
        });

        // Custom water form
        document.getElementById('customWaterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = parseInt(document.getElementById('customWaterAmount').value);
            if (amount && amount > 0) {
                this.addWater(amount);
                document.getElementById('customWaterAmount').value = '';
            }
        });

        // Reset button
        document.getElementById('resetWaterBtn').addEventListener('click', () => {
            if (confirm('Reset today\'s water log?')) {
                storage.resetWater();
                this.render();
                showToast('Water log reset! 🔄');
            }
        });
    }

    addWater(amount) {
        storage.addWater(amount);
        this.render();
        
        const liters = (amount / 1000).toFixed(2);
        showToast(`Added ${liters}L of water! 💧`);

        // Celebrate if goal reached
        const totalWater = storage.getTodayWater();
        if (totalWater >= this.dailyGoal && (totalWater - amount) < this.dailyGoal) {
            this.celebrate();
        }
    }

    removeWater(id) {
        storage.removeWaterItem(id);
        this.render();
        showToast('Water entry removed! 🗑️');
    }

    celebrate() {
        const waterCircle = document.getElementById('waterToday');
        if (waterCircle) {
            waterCircle.style.animation = 'celebrate 0.6s ease';
            setTimeout(() => {
                waterCircle.style.animation = '';
            }, 600);
        }
        showToast('Water goal reached! 🎉');
    }

    render() {
        const totalWater = storage.getTodayWater();
        const dailyData = storage.getDailyData();
        const percentage = Math.min((totalWater / this.dailyGoal) * 100, 100);

        // Update displays
        document.getElementById('waterDisplay').textContent = totalWater;
        document.getElementById('waterToday').textContent = totalWater;

        // Update circular progress
        const waterCircle = document.getElementById('waterCircle');
        if (waterCircle) {
            const circumference = 2 * Math.PI * 90;
            const offset = circumference - (percentage / 100) * circumference;
            waterCircle.style.strokeDasharray = circumference;
            waterCircle.style.strokeDashoffset = offset;
        }

        // Update progress bar
        const waterProgress = document.getElementById('waterProgress');
        if (waterProgress) {
            waterProgress.style.width = Math.min(percentage, 100) + '%';
        }

        // Render water log
        this.renderWaterLog(dailyData.waterItems);
    }

    renderWaterLog(items) {
        const waterLog = document.getElementById('waterLog');

        if (!items || items.length === 0) {
            waterLog.innerHTML = '<p class="empty-state">Start hydrating! Add water to see your log. 💧</p>';
            return;
        }

        waterLog.innerHTML = items.map(item => {
            const liters = (item.amount / 1000).toFixed(2);
            return `
                <div class="log-item">
                    <div class="log-item-info">
                        <div class="log-item-name">Water Intake</div>
                        <div class="log-item-time">${item.time}</div>
                    </div>
                    <div class="log-item-value">${liters}L</div>
                    <button class="log-item-delete" onclick="waterManager.removeWater(${item.id})">
                        ×
                    </button>
                </div>
            `;
        }).join('');
    }
}

// Create global instance
const waterManager = new WaterManager();
