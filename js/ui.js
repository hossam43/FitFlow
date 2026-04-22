/**
 * FitFlow - UI Manager
 * Handles UI updates, theme switching, and navigation
 */

class UIManager {
  constructor() {
    this.motivationalMessages = [
      "💪 Let's crush today's goals!",
      "🔥 You've got this! Keep pushing!",
      "🎯 Every rep counts! Stay focused!",
      "⚡ Energy is building! Let's go!",
      "🏆 You're a champion! Keep going!",
      "💯 Today is YOUR day!",
      "🚀 Launch your fitness journey!",
      "🌟 You're unstoppable!",
      "✨ Believe in yourself!",
      "🎊 Another day, another victory!",
      "🔋 Recharge and reset!",
      "💎 You're becoming stronger!",
    ];
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.renderGradients();
  }

  setupEventListeners() {
    // Dark mode toggle
    document.getElementById("darkModeBtn").addEventListener("click", () => {
      this.toggleDarkMode();
    });

    // Tab navigation
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.switchTab(btn.dataset.tab);
      });
    });
  }

  renderGradients() {
    // Add SVG gradients to the page if they don't exist
    if (!document.getElementById("gradient")) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.display = "none";
      svg.innerHTML = `
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FFB800;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="gradient-warning" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#E63946;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#4ECDC4;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#44A08D;stop-opacity:1" />
                    </linearGradient>
                </defs>
            `;
      document.body.appendChild(svg);
    }
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    storage.setDarkMode(isDark);

    const icon = document.querySelector(".mode-icon");
    icon.textContent = isDark ? "☀️" : "🌙";

    showToast(isDark ? "Dark mode enabled! 🌙" : "Light mode enabled! ☀️");
  }

  applyTheme() {
    const isDark = storage.getDarkMode();
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.querySelector(".mode-icon").textContent = "☀️";
    }
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

    // Update tab content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    document.getElementById(`${tabName}-tab`).classList.add("active");

    // Scroll to top
    window.scrollTo(0, 0);
  }

  updateDashboard() {
    this.updateStreakCard();
    this.updateOverview();
    this.updateMotivationalMessage();
  }

  updateStreakCard() {
    const profile = storage.getProfile();
    const streak = storage.calculateStreak(profile.dailyCalories);

    document.getElementById("currentStreak").textContent = streak.current;
    document.getElementById("bestStreak").textContent = streak.best;

    // Update requirement indicators
    const requirements = storage.checkStreakRequirements(profile.dailyCalories);

    this.updateRequirement("calories", requirements.calories);
    this.updateRequirement("water", requirements.water);
    this.updateRequirement("workout", requirements.workout);
  }
  updateRequirement(type, met) {
    const req = document.getElementById(`req-${type}`);

    if (met) {
      req.classList.add("completed");
    } else {
      req.classList.remove("completed");
    }
  }

  updateOverview() {
    const profile = storage.getProfile();
    const dailyData = storage.getDailyData();

    // Calories
    const caloriesDisplay = document.getElementById("caloriesDisplay");
    if (caloriesDisplay) {
      caloriesDisplay.textContent = dailyData.calories;
    }

    const caloriesGoal = document.getElementById("calorieGoal");
    if (caloriesGoal) {
      caloriesGoal.textContent = profile.dailyCalories;
    }

    const caloriesProgress = document.getElementById("caloriesProgress");
    if (caloriesProgress) {
      const percentage = Math.min(
        (dailyData.calories / profile.dailyCalories) * 100,
        100,
      );
      caloriesProgress.style.width = percentage + "%";
    }

    // Water
    const waterDisplay = document.getElementById("waterDisplay");
    if (waterDisplay) {
      waterDisplay.textContent = dailyData.water;
    }

    const waterProgress = document.getElementById("waterProgress");
    if (waterProgress) {
      const percentage = Math.min((dailyData.water / 2000) * 100, 100);
      waterProgress.style.width = percentage + "%";
    }
  }

  updateMotivationalMessage() {
    const message = this.getRandomMotivationalMessage();
    document.getElementById("motivationalMessage").textContent = message;
  }

  getRandomMotivationalMessage() {
    return this.motivationalMessages[
      Math.floor(Math.random() * this.motivationalMessages.length)
    ];
  }

  renderHistory() {
    const historyEntries = document.getElementById("historyEntries");
    const days = storage.getLastNDays(7);

    if (days.length === 0) {
      historyEntries.innerHTML =
        '<p class="empty-state">Your history will appear here as you track your fitness! 📊</p>';
      return;
    }

    historyEntries.innerHTML = days
      .map((day) => {
        const date = new Date(day.date);
        const dateStr = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        const calories = day.calories || 0;
        const water = day.water || 0;
        const workouts = day.workouts ? day.workouts.length : 0;

        return `
                <div class="history-entry">
                    <div class="history-entry-date">${dateStr}</div>
                    <div class="history-entry-item">
                        <span class="history-entry-label">🍽️ Calories</span>
                        <span class="history-entry-value">${calories} kcal</span>
                    </div>
                    <div class="history-entry-item">
                        <span class="history-entry-label">💧 Water</span>
                        <span class="history-entry-value">${(water / 1000).toFixed(1)}L</span>
                    </div>
                    <div class="history-entry-item">
                        <span class="history-entry-label">🏋️ Workouts</span>
                        <span class="history-entry-value">${workouts} completed</span>
                    </div>
                </div>
            `;
      })
      .join("");

    // Update stats
    const allDays = storage.getAllDays();
    const totalWorkouts = allDays.reduce(
      (sum, day) => sum + (day.workouts ? day.workouts.length : 0),
      0,
    );
    const totalWater = allDays.reduce((sum, day) => sum + (day.water || 0), 0);
    const profile = storage.getProfile();

    document.getElementById("totalWorkouts").textContent = totalWorkouts;
    document.getElementById("totalWater").textContent =
      (totalWater / 1000).toFixed(1) + "L";
    document.getElementById("currentWeight").textContent =
      profile.weight + " kg";
  }
}

// Create global instance
const uiManager = new UIManager();

/**
 * Global helper functions
 */

function switchTab(tabName) {
  uiManager.switchTab(tabName);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function playSound(type = "success") {
  // Using Web Audio API for simple beep sounds
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  switch (type) {
    case "success":
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2,
      );
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
    case "warning":
      oscillator.frequency.value = 400;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
  }
}
