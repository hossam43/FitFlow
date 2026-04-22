/**
 * FitFlow - Calories Manager
 * Handles calorie tracking and food logging
 */

class CaloriesManager {
  constructor() {
    this.dailyGoal = 2000; // Default, will be set from profile
  }

  init() {
    this.setupEventListeners();
    this.updateCalorieGoal();
    this.render();
  }

  setupEventListeners() {
    // Quick meal buttons
    document.querySelectorAll(".quick-meal-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const mealType = btn.dataset.meal;

        const meals = {
          chicken: { name: "Chicken Meal", calories: 650 },
          beef: { name: "Beef Meal", calories: 700 },
          fish: { name: "Fish Meal", calories: 700 },
        };

        const selectedMeal = meals[mealType];

        if (selectedMeal) {
          this.addFood(selectedMeal.name, selectedMeal.calories);
        }
      });
    });
    // Food form submission
    document.getElementById("foodForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.addFoodFromForm();
    });

    // Quick food buttons
    document.querySelectorAll(".quick-food-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const food = btn.dataset.food;
        const calories = parseInt(btn.dataset.cal);
        this.addFood(food, calories);
      });
    });

    document.querySelectorAll(".quick-meal-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const name = btn.dataset.name;
        const calories = parseInt(btn.dataset.cal);

        if (name && !isNaN(calories)) {
          this.addFood(name, calories);

          // UI feedback
          btn.classList.add("clicked");
          setTimeout(() => btn.classList.remove("clicked"), 200);
        }
      });
    });

    // Water button
    document
      .getElementById("resetCaloriesBtn")
      .addEventListener("click", () => {
        if (confirm("Reset today's calorie log?")) {
          storage.resetCalories();
          this.render();
          showToast("Calorie log reset! 🔄");
        }
      });
  }

  updateCalorieGoal() {
    const profile = storage.getProfile();
    if (profile && profile.dailyCalories) {
      this.dailyGoal = profile.dailyCalories;
    }
  }

  addFoodFromForm() {
    const nameInput = document.getElementById("foodName");
    const caloriesInput = document.getElementById("foodCalories");

    const name = nameInput.value.trim();
    const calories = parseInt(caloriesInput.value);

    if (name && calories) {
      this.addFood(name, calories);
      nameInput.value = "";
      caloriesInput.value = "";
    }
  }

  addFood(name, calories) {
    storage.addFoodItem(name, calories);
    this.render();
    showToast(`${name} added! 🍽️`);

    // Trigger calorie warning if exceeded
    const totalCalories = storage.getTodayCalories();
    if (totalCalories > this.dailyGoal) {
      this.showWarning();
    }
  }

  removeFood(id) {
    storage.removeFoodItem(id);
    this.render();
    showToast("Food removed! 🗑️");
  }

  showWarning() {
    const warningEl = document.getElementById("calorieWarning");
    warningEl.classList.remove("hidden");
    warningEl.style.animation = "slideIn 0.3s ease";
  }

  hideWarning() {
    const warningEl = document.getElementById("calorieWarning");
    warningEl.classList.add("hidden");
  }

  render() {
    this.updateCalorieGoal();
    const totalCalories = storage.getTodayCalories();
    const dailyData = storage.getDailyData();

    // Update progress displays
    const percentage = Math.min((totalCalories / this.dailyGoal) * 100, 100);

    // Main display
    document.getElementById("caloriesToday").textContent = totalCalories;
    document.getElementById("calorieConsumed").textContent = totalCalories;
    document.getElementById("calorieRemaining").textContent = Math.max(
      0,
      this.dailyGoal - totalCalories,
    );
    document.getElementById("calorieGoalDisplay").textContent = this.dailyGoal;

    // Progress bars
    const progressBars = document.querySelectorAll(
      "#caloriesProgress, #calorieCircle",
    );
    progressBars.forEach((bar) => {
      if (bar.id === "calorieCircle") {
        // Circular progress
        const circumference = 2 * Math.PI * 90;
        const offset = circumference - (percentage / 100) * circumference;
        bar.style.strokeDasharray = circumference;
        bar.style.strokeDashoffset = offset;

        // Update color based on percentage
        if (totalCalories > this.dailyGoal) {
          bar.style.stroke = "url(#gradient-warning)";
        } else {
          bar.style.stroke = "url(#gradient)";
        }
      } else {
        bar.style.width = percentage + "%";
      }
    });

    // Update food log
    this.renderFoodLog(dailyData.calorieItems);

    // Update warning
    if (totalCalories > this.dailyGoal) {
      this.showWarning();
    } else {
      this.hideWarning();
    }

    // Update overview card
    const caloriesDisplay = document.getElementById("caloriesDisplay");
    if (caloriesDisplay) {
      caloriesDisplay.textContent = totalCalories;
    }

    const overviewProgress = document.getElementById("caloriesProgress");
    if (overviewProgress) {
      overviewProgress.style.width =
        Math.min((totalCalories / this.dailyGoal) * 100, 100) + "%";
    }

    const calorieGoal = document.getElementById("calorieGoal");
    if (calorieGoal) {
      calorieGoal.textContent = this.dailyGoal;
    }
  }

  renderFoodLog(items) {
    const foodLog = document.getElementById("foodLog");

    if (!items || items.length === 0) {
      foodLog.innerHTML =
        '<p class="empty-state">No foods logged yet. Add your first meal! 🍽️</p>';
      return;
    }

    foodLog.innerHTML = items
      .map(
        (item) => `
            <div class="log-item">
                <div class="log-item-info">
                    <div class="log-item-name">${item.name}</div>
                    <div class="log-item-time">${item.time}</div>
                </div>
                <div class="log-item-value">${item.calories} kcal</div>
                <button class="log-item-delete" onclick="caloriesManager.removeFood(${item.id})">
                    ×
                </button>
            </div>
        `,
      )
      .join("");
  }
}

// Create global instance
const caloriesManager = new CaloriesManager();
