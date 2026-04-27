/**
 * FitFlow - UI Manager v3.0
 * Fixed streak, calendar history, mobile-first, clean overview
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
    ];
    this.calendarYear = new Date().getFullYear();
    this.calendarMonth = new Date().getMonth(); // 0-indexed
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.renderGradients();
    this.ensureEditModal();
    this.ensureEditTypeButtons();
  }

  // ─────────────────────────────────────────────────────────────
  //  EDIT MODAL — injected once
  // ─────────────────────────────────────────────────────────────
  ensureEditModal() {
    if (document.getElementById("editExerciseModal")) return;
    const modal = document.createElement("div");
    modal.id = "editExerciseModal";
    modal.className = "modal hidden";
    modal.innerHTML = `
      <div class="modal-content edit-exercise-modal">
        <div class="modal-header">
          <h2>✏️ Edit Exercise</h2>
          <p>Update details and muscle ratings</p>
        </div>
        <div class="edit-exercise-body">
          <div class="form-group">
            <label>Exercise Name</label>
            <input type="text" id="editExName" placeholder="e.g., Push-ups" />
          </div>
          <div class="form-group">
            <label>Type</label>
            <div class="exercise-type-selector edit-type-selector">
              <button type="button" class="exercise-type-btn edit-type-btn" data-type="push">💪 Push</button>
              <button type="button" class="exercise-type-btn edit-type-btn" data-type="pull">🤸 Pull</button>
              <button type="button" class="exercise-type-btn edit-type-btn" data-type="legs">🦵 Legs</button>
              <button type="button" class="exercise-type-btn edit-type-btn" data-type="cardio">🏃 Cardio</button>
            </div>
            <input type="hidden" id="editExType" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Sets</label>
              <input type="text" id="editExSets" placeholder="3" />
            </div>
            <div class="form-group">
              <label>Reps / Duration</label>
              <input type="text" id="editExReps" placeholder="10–15" />
            </div>
          </div>
          <div class="form-group">
            <label>Difficulty</label>
            <select id="editExDiff">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
          <div class="form-group">
            <label>Muscles Worked</label>
            <div id="editMuscleRows" class="edit-muscle-rows"></div>
            <button id="addMuscleBtn" class="btn btn-secondary btn-small" style="margin-top:8px">+ Add Muscle</button>
          </div>
          <div class="form-actions">
            <button id="closeEditModal" class="btn btn-secondary">Cancel</button>
            <button id="saveEditBtn" class="btn btn-primary">Save 💾</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  ensureEditTypeButtons() {
    // wire up edit-type-btn clicks after modal is injected
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".edit-type-btn");
      if (!btn) return;
      document
        .querySelectorAll(".edit-type-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const input = document.getElementById("editExType");
      if (input) input.value = btn.dataset.type;
    });

    // wire saveEdit / closeEditModal / addMuscleBtn via delegation
    document.addEventListener("click", (e) => {
      if (e.target.id === "saveEditBtn") workoutsManager.saveEdit();
      if (e.target.id === "closeEditModal") workoutsManager.closeEditModal();
      if (e.target.id === "addMuscleBtn") workoutsManager.addMuscleRow();
    });
  }

  // ─────────────────────────────────────────────────────────────
  //  SETUP
  // ─────────────────────────────────────────────────────────────
  setupEventListeners() {
    document
      .getElementById("darkModeBtn")
      ?.addEventListener("click", () => this.toggleDarkMode());

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
    });
  }

  renderGradients() {
    if (document.getElementById("ff-gradients")) return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "ff-gradients";
    svg.style.display = "none";
    svg.innerHTML = `
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#FFB800;stop-opacity:1"/>
        </linearGradient>
        <linearGradient id="water-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4ECDC4;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#44A08D;stop-opacity:1"/>
        </linearGradient>
      </defs>`;
    document.body.appendChild(svg);
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    storage.setDarkMode(isDark);
    document.querySelector(".mode-icon").textContent = isDark ? "☀️" : "🌙";
    showToast(isDark ? "Dark mode on 🌙" : "Light mode on ☀️");
  }

  applyTheme() {
    if (storage.getDarkMode()) {
      document.body.classList.add("dark-mode");
      const icon = document.querySelector(".mode-icon");
      if (icon) icon.textContent = "☀️";
    }
  }

  switchTab(tabName) {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));
    const activeContent = document.getElementById(`${tabName}-tab`);
    if (activeContent) activeContent.classList.add("active");

    if (tabName === "history") this.renderCalendar();
    window.scrollTo(0, 0);
  }

  // ─────────────────────────────────────────────────────────────
  //  DASHBOARD UPDATE
  // ─────────────────────────────────────────────────────────────
  updateDashboard() {
    this.updateStreakCard();
    this.updateOverview();
    this.updateMotivationalMessage();
  }

  // ─────────────────────────────────────────────────────────────
  //  STREAK — fixed: properly reads stored streak
  // ─────────────────────────────────────────────────────────────
  updateStreakCard() {
    const profile = storage.getProfile();
    if (!profile) return;

    const streak = storage.calculateStreak(profile.dailyCalories);
    const el = document.getElementById("currentStreak");
    const bestEl = document.getElementById("bestStreak");
    if (el) el.textContent = streak.current;
    if (bestEl) bestEl.textContent = streak.best;

    const reqs = storage.checkStreakRequirements(profile.dailyCalories);
    this.updateRequirement("calories", reqs.calories);
    this.updateRequirement("water", reqs.water);
    this.updateRequirement("workout", reqs.workout);
  }

  updateRequirement(type, met) {
    const el = document.getElementById(`req-${type}`);
    if (!el) return;
    if (met) el.classList.add("completed");
    else el.classList.remove("completed");
  }

  updateOverview() {
    const profile = storage.getProfile();
    const daily = storage.getDailyData();

    // calories
    const cals = document.getElementById("caloriesDisplay");
    if (cals) cals.textContent = daily.calories || 0;
    const goal = document.getElementById("calorieGoal");
    if (goal) goal.textContent = profile?.dailyCalories || 2000;
    const cp = document.getElementById("caloriesProgress");
    if (cp)
      cp.style.width =
        Math.min(
          ((daily.calories || 0) / (profile?.dailyCalories || 2000)) * 100,
          100,
        ) + "%";

    // water
    const wd = document.getElementById("waterDisplay");
    if (wd) wd.textContent = daily.water || 0;
    const wp = document.getElementById("waterProgress");
    if (wp)
      wp.style.width = Math.min(((daily.water || 0) / 2000) * 100, 100) + "%";
  }

  updateMotivationalMessage() {
    const el = document.getElementById("motivationalMessage");
    if (el) {
      el.textContent =
        this.motivationalMessages[
          Math.floor(Math.random() * this.motivationalMessages.length)
        ];
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  CALENDAR — replaces the broken history tab
  // ─────────────────────────────────────────────────────────────
  renderCalendar() {
    const container = document.getElementById("calendarContainer");
    if (!container) return;

    const year = this.calendarYear;
    const month = this.calendarMonth;

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Build date map from storage
    const allDays = storage.getAllDays();
    const dayMap = {};
    allDays.forEach((d) => {
      dayMap[d.date] = d;
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = storage.getTodayKey();

    // Build cells
    let cells = "";
    // empty leading cells
    for (let i = 0; i < firstDay; i++)
      cells += `<div class="cal-cell cal-empty"></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dayData = dayMap[dateKey];
      const isToday = dateKey === todayKey;
      const isPast = dateKey < todayKey;

      let status = "";
      let dot = "";
      if (dayData) {
        const hasActivity =
          dayData.calories > 0 ||
          dayData.water > 0 ||
          dayData.workouts?.length > 0;
        const allMet =
          storage.checkStreakRequirements && isPast
            ? dayData.calories > 0 &&
              dayData.water >= 2000 &&
              dayData.workouts?.length > 0
            : false;

        if (hasActivity) {
          status = allMet ? "cal-perfect" : "cal-partial";
          const dots = [];
          if (dayData.calories > 0)
            dots.push('<span class="cal-dot dot-cal"></span>');
          if (dayData.water > 0)
            dots.push('<span class="cal-dot dot-water"></span>');
          if (dayData.workouts?.length > 0)
            dots.push('<span class="cal-dot dot-workout"></span>');
          dot = `<div class="cal-dots">${dots.join("")}</div>`;
        }
      }

      cells += `
        <div class="cal-cell ${isToday ? "cal-today" : ""} ${status}"
             onclick="uiManager.openDayDetail('${dateKey}')">
          <span class="cal-day-num">${d}</span>
          ${dot}
        </div>`;
    }

    container.innerHTML = `
      <div class="calendar-nav">
        <button class="cal-nav-btn" onclick="uiManager.prevMonth()">‹</button>
        <span class="cal-month-title">${monthNames[month]} ${year}</span>
        <button class="cal-nav-btn" onclick="uiManager.nextMonth()">›</button>
      </div>
      <div class="cal-legend">
        <span><span class="cal-dot dot-cal"></span> Calories</span>
        <span><span class="cal-dot dot-water"></span> Water</span>
        <span><span class="cal-dot dot-workout"></span> Workout</span>
      </div>
      <div class="cal-grid">
        ${dayNames.map((n) => `<div class="cal-header-cell">${n}</div>`).join("")}
        ${cells}
      </div>`;

    // Also render summary stats below calendar
    this.renderHistoryStats();
  }

  prevMonth() {
    this.calendarMonth--;
    if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    }
    this.renderCalendar();
  }

  nextMonth() {
    this.calendarMonth++;
    if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    }
    this.renderCalendar();
  }

  openDayDetail(dateKey) {
    const dayData = storage.getDailyData(dateKey);
    const modal = document.getElementById("dayDetailModal");
    const content = document.getElementById("dayDetailContent");
    if (!modal || !content) return;

    const date = new Date(dateKey + "T00:00:00");
    const label = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const exercises = (storage.getCustomExercises() || []).filter((ex) =>
      (dayData.workouts || []).includes(ex.id),
    );

    const foods = dayData.calorieItems || [];
    const water = dayData.water || 0;

    content.innerHTML = `
      <h3 class="day-detail-date">${label}</h3>

      <div class="day-detail-section">
        <div class="day-detail-stat">
          <span class="day-stat-icon">🍽️</span>
          <div>
            <div class="day-stat-label">Calories</div>
            <div class="day-stat-value">${dayData.calories || 0} kcal</div>
          </div>
        </div>
        <div class="day-detail-stat">
          <span class="day-stat-icon">💧</span>
          <div>
            <div class="day-stat-label">Water</div>
            <div class="day-stat-value">${(water / 1000).toFixed(1)} L</div>
          </div>
        </div>
        <div class="day-detail-stat">
          <span class="day-stat-icon">🏋️</span>
          <div>
            <div class="day-stat-label">Workouts</div>
            <div class="day-stat-value">${exercises.length} done</div>
          </div>
        </div>
      </div>

      ${
        exercises.length > 0
          ? `
        <div class="day-detail-block">
          <h4>🏋️ Workouts</h4>
          ${exercises
            .map(
              (ex) => `
            <div class="day-detail-item">
              <span>${ex.emoji || "💪"} ${ex.name}</span>
              <span class="day-item-meta">${ex.sets} × ${ex.reps}</span>
            </div>`,
            )
            .join("")}
        </div>`
          : ""
      }

      ${
        foods.length > 0
          ? `
        <div class="day-detail-block">
          <h4>🍽️ Foods</h4>
          ${foods
            .map(
              (f) => `
            <div class="day-detail-item">
              <span>${f.name}</span>
              <span class="day-item-meta">${f.calories} kcal</span>
            </div>`,
            )
            .join("")}
        </div>`
          : ""
      }

      ${
        exercises.length === 0 && foods.length === 0
          ? `
        <p class="empty-state" style="margin-top:16px">No activity recorded for this day.</p>`
          : ""
      }`;

    modal.classList.remove("hidden");
  }

  renderHistoryStats() {
    const statsEl = document.getElementById("historyStatsContainer");
    if (!statsEl) return;

    const allDays = storage.getAllDays();
    const totalWorkouts = allDays.reduce(
      (s, d) => s + (d.workouts?.length || 0),
      0,
    );
    const totalWater = allDays.reduce((s, d) => s + (d.water || 0), 0);
    const profile = storage.getProfile();
    const streak = storage.calculateStreak(profile?.dailyCalories || 2000);

    statsEl.innerHTML = `
      <div class="history-stat-card">
        <span class="hstat-icon">🔥</span>
        <span class="hstat-val">${streak.current}</span>
        <span class="hstat-label">Current Streak</span>
      </div>
      <div class="history-stat-card">
        <span class="hstat-icon">⭐</span>
        <span class="hstat-val">${streak.best}</span>
        <span class="hstat-label">Best Streak</span>
      </div>
      <div class="history-stat-card">
        <span class="hstat-icon">🏋️</span>
        <span class="hstat-val">${totalWorkouts}</span>
        <span class="hstat-label">Total Workouts</span>
      </div>
      <div class="history-stat-card">
        <span class="hstat-icon">💧</span>
        <span class="hstat-val">${(totalWater / 1000).toFixed(0)}L</span>
        <span class="hstat-label">Total Water</span>
      </div>`;
  }

  // kept for compatibility — now delegates to calendar
  renderHistory() {
    if (document.getElementById("history-tab")?.classList.contains("active")) {
      this.renderCalendar();
    }
  }
}

// ─────────────────────────────────────────────────────────────
//  GLOBAL INSTANCE & HELPERS
// ─────────────────────────────────────────────────────────────
const uiManager = new UIManager();

function switchTab(tabName) {
  uiManager.switchTab(tabName);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function playSound(type = "success") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = type === "success" ? 800 : 400;
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}
