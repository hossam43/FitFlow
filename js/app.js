/**
 * FitFlow - Main Application v3.0
 */

class FitFlowApp {
  constructor() {
    this.setupModal = document.getElementById("setupModal");
    this.dashboard = document.getElementById("dashboard");
  }

  init() {
    // Patch storage with saveCustomExercises if missing
    this.patchStorage();

    if (!storage.hasProfile()) {
      this.showSetupModal();
    } else {
      this.showDashboard();
    }

    if (storage.hasDateChanged()) {
      console.log("New day — daily data reset.");
    }

    uiManager.init();
    caloriesManager.init();
    waterManager.init();
    workoutsManager.init();

    this.updateAll();

    // Periodic refresh every 60 s
    setInterval(() => this.updateAll(), 60000);

    // Reset all data
    document.getElementById("resetAllBtn")?.addEventListener("click", () => {
      if (confirm("⚠️ Delete ALL data? This cannot be undone.")) {
        if (confirm("Really sure? This is permanent!")) {
          this.resetAllData();
        }
      }
    });

    // Export / Import
    document.getElementById("exportDataBtn")?.addEventListener("click", () => {
      const area = document.getElementById("dataExportArea");
      if (!area) return;
      area.value = storage.exportAsJSON();
      area.classList.remove("hidden");
      showToast("Data exported! 📥");
    });

    document.getElementById("importDataBtn")?.addEventListener("click", () => {
      const area = document.getElementById("dataExportArea");
      if (!area) return;
      area.classList.remove("hidden");
      area.placeholder = "Paste your exported JSON here and tap Import again…";
      area.addEventListener(
        "blur",
        () => {
          if (area.value.trim().startsWith("{")) {
            if (storage.importData(area.value)) {
              showToast("Data imported! 📤");
              setTimeout(() => location.reload(), 1200);
            } else {
              showToast("Import failed — invalid data ❌");
            }
          }
        },
        { once: true },
      );
    });

    // Day detail modal close
    document.getElementById("closeDayDetail")?.addEventListener("click", () => {
      document.getElementById("dayDetailModal")?.classList.add("hidden");
    });
    document
      .getElementById("dayDetailModal")
      ?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget)
          e.currentTarget.classList.add("hidden");
      });
  }

  // ── Patch storage so saveCustomExercises always exists ──────
  patchStorage() {
    if (!storage.saveCustomExercises) {
      storage.saveCustomExercises = function (exercises) {
        return this.set("customExercises", exercises);
      };
    }
    // Also ensure getTodayKey is accessible on the instance (it already is,
    // but some paths call it as a standalone — alias just in case)
    if (!storage.getTodayKey) {
      storage.getTodayKey = function () {
        const n = new Date();
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
      };
    }
  }

  showSetupModal() {
    this.setupModal?.classList.remove("hidden");
    this.dashboard?.classList.add("hidden");
    document.getElementById("setupForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSetup();
    });
  }

  showDashboard() {
    this.setupModal?.classList.add("hidden");
    this.dashboard?.classList.remove("hidden");
  }

  handleSetup() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseInt(document.getElementById("height").value);
    const targetWeight = parseFloat(
      document.getElementById("targetWeight").value,
    );
    const activityLevel = document.getElementById("activityLevel").value;

    if (!weight || !height || !targetWeight || !activityLevel) {
      showToast("Please fill in all fields! 📋");
      return;
    }

    const dailyCalories = storage.calculateDailyCalories(
      weight,
      height,
      30,
      activityLevel,
    );
    storage.setProfile({
      weight,
      height,
      targetWeight,
      activityLevel,
      dailyCalories,
      setupDate: new Date().toISOString(),
    });

    showToast(`Welcome! Daily goal: ${dailyCalories} kcal 🎉`);
    this.showDashboard();
    this.updateAll();
  }

  resetAllData() {
    storage.clearAll();
    showToast("All data reset! 🔄");
    setTimeout(() => location.reload(), 1500);
  }

  updateAll() {
    uiManager.updateDashboard();
    caloriesManager.render();
    waterManager.render();
    workoutsManager.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new FitFlowApp();
  app.init();
  window.fitflowApp = app;
});
