/**
 * FitFlow - Workouts Manager v4.1
 * Hardcoded exercises (16 total: Push/Pull/Legs)
 * + Custom exercises system
 * + Category filter works on BOTH
 * + Log actual sets/reps per session
 * + Progress history per exercise
 * + Local WebP image assets
 */

class WorkoutsManager {
  constructor() {
    // ═══════════════════════════════════════════════════════════
    //  HARDCODED EXERCISES — Local WebP assets
    //  Image sizing: 300x300px for consistent UI
    // ═══════════════════════════════════════════════════════════
    this.exercises = [
      // ─────────── LEGS ───────────
      {
        id: "squat",
        name: "Squat",
        category: "legs",
        defaultSets: 4,
        defaultReps: "12–15",
        emoji: "🦵",
        image: "./assets/squat.webp",
        muscles: [
          { name: "Quads", rating: 5 },
          { name: "Glutes", rating: 4 },
          { name: "Hamstrings", rating: 3 },
          { name: "Core", rating: 2 },
        ],
        notes: "Keep knees tracking over toes. Chest up throughout.",
      },
      {
        id: "side-step-squat",
        name: "Side Step Squat",
        category: "legs",
        defaultSets: 3,
        defaultReps: "10–12 each",
        emoji: "🦵",
        image: "./assets/side to side squat.webp",
        muscles: [
          { name: "Glutes", rating: 5 },
          { name: "Quads", rating: 3 },
          { name: "Inner/Outer Thigh", rating: 4 },
        ],
        notes: "Step wide, sit into the squat, drive back through heel.",
      },
      {
        id: "glute-bridge",
        name: "Glute Bridge",
        category: "legs",
        defaultSets: 3,
        defaultReps: "12–15",
        emoji: "🦵",
        image: "./assets/how-to-do-a-glute-bridge.webp",
        muscles: [
          { name: "Glutes", rating: 5 },
          { name: "Hamstrings", rating: 3 },
          { name: "Lower Back", rating: 2 },
        ],
        notes: "Drive hips high. Squeeze glutes at top for 1 second.",
      },
      {
        id: "lunges",
        name: "Lunges",
        category: "legs",
        defaultSets: 3,
        defaultReps: "8–10 each",
        emoji: "🦵",
        image: "./assets/dumbbell-lunge.webp",
        muscles: [
          { name: "Quads", rating: 4 },
          { name: "Glutes", rating: 4 },
          { name: "Hamstrings", rating: 3 },
          { name: "Stability", rating: 3 },
        ],
        notes: "Front knee stays over ankle. Back knee touches gently.",
      },
      {
        id: "bulgarian-split-squat",
        name: "Bulgarian Split Squat",
        category: "legs",
        defaultSets: 3,
        defaultReps: "8 each",
        emoji: "🦵",
        image: "./assets/bulgarian-split-squat.webp",
        muscles: [
          { name: "Quads", rating: 5 },
          { name: "Glutes", rating: 5 },
          { name: "Balance", rating: 4 },
        ],
        notes: "Rear foot on bench. Torso upright. Control descent.",
      },

      // ─────────── PUSH ───────────
      {
        id: "push-ups",
        name: "Push-ups",
        category: "push",
        defaultSets: 4,
        defaultReps: "8–10",
        emoji: "💪",
        image: "./assets/push-up.webp",
        muscles: [
          { name: "Chest", rating: 5 },
          { name: "Triceps", rating: 3 },
          { name: "Shoulders", rating: 2 },
        ],
        notes: "Hands slightly wider than shoulders. Full lockout at top.",
      },
      {
        id: "ring-push-ups",
        name: "Ring Push-ups",
        category: "push",
        defaultSets: 3,
        defaultReps: "6–10",
        emoji: "💪",
        image: "./assets/ring-push-ups.webp",
        muscles: [
          { name: "Chest", rating: 4 },
          { name: "Triceps", rating: 3 },
          { name: "Shoulders", rating: 3 },
        ],
        notes: "Rings add instability. Core tight. Turn rings out at top.",
      },
      {
        id: "db-floor-press",
        name: "Dumbbell Floor Press",
        category: "push",
        defaultSets: 3,
        defaultReps: "10",
        emoji: "💪",
        image: "./assets/db-floor-press.webp",
        muscles: [
          { name: "Chest", rating: 4 },
          { name: "Triceps", rating: 4 },
          { name: "Shoulders", rating: 2 },
        ],
        notes: "Elbows touch floor at bottom. Press to lockout. Slow negative.",
      },
      {
        id: "db-floor-fly",
        name: "Dumbbell Floor Fly",
        category: "push",
        defaultSets: 3,
        defaultReps: "10",
        emoji: "💪",
        image: "./assets/dumbbell-floor-fly.webp",
        muscles: [
          { name: "Chest", rating: 4 },
          { name: "Triceps", rating: 2 },
          { name: "Shoulders", rating: 2 },
        ],
        notes: "Wide arc. Slight elbow bend. Squeeze chest at top.",
      },
      {
        id: "lateral-raise",
        name: "Lateral Raise",
        category: "push",
        defaultSets: 3,
        defaultReps: "12",
        emoji: "💪",
        image: "./assets/lateral-raise.webp",
        muscles: [
          { name: "Side Delts", rating: 5 },
          { name: "Traps", rating: 2 },
          { name: "Front Delts", rating: 2 },
        ],
        notes: "Lead with elbows. Stop at shoulder height. No swinging.",
      },

      // ─────────── PULL ───────────
      {
        id: "support-hold",
        name: "Support Hold",
        category: "pull",
        defaultSets: 4,
        defaultReps: "10 sec",
        emoji: "🤸",
        image: "./assets/support-hold.webp",
        muscles: [
          { name: "Shoulders", rating: 3 },
          { name: "Core", rating: 3 },
          { name: "Grip", rating: 4 },
        ],
        notes: "On rings or bar. Arms locked. Body tall. Build to 30s.",
      },
      {
        id: "pull-ups",
        name: "Pull-ups",
        category: "pull",
        defaultSets: 3,
        defaultReps: "to failure",
        emoji: "🤸",
        image: "./assets/pull-ups.webp",
        muscles: [
          { name: "Lats", rating: 5 },
          { name: "Biceps", rating: 4 },
          { name: "Upper Back", rating: 4 },
        ],
        notes: "Full hang to chin over bar. Control the descent.",
      },
      {
        id: "negative-pull-ups",
        name: "Negative Pull-ups",
        category: "pull",
        defaultSets: 3,
        defaultReps: "5 (4 sec down)",
        emoji: "🤸",
        image: "./assets/pull-ups.webp",
        muscles: [
          { name: "Lats", rating: 5 },
          { name: "Biceps", rating: 3 },
          { name: "Control", rating: 4 },
        ],
        notes: "Jump to top. 4-count slow descent. Max time under tension.",
      },
      {
        id: "ring-pull-ups",
        name: "Ring-Pull-ups",
        category: "pull",
        defaultSets: 3,
        defaultReps: "12",
        emoji: "🤸",
        image: "./assets/ring-pull-ups.webp",
        muscles: [
          { name: "Lats", rating: 5 },
          { name: "Upper Back", rating: 4 },
          { name: "Grip", rating: 4 },
        ],
        notes: "Natural grip rotation through the pull. Rings shoulder-width.",
      },
      {
        id: "db-curl",
        name: "Dumbbell Curl",
        category: "pull",
        defaultSets: 3,
        defaultReps: "10",
        emoji: "🤸",
        image: "./assets/dumbbell-biceps-curl.webp",
        muscles: [
          { name: "Biceps", rating: 5 },
          { name: "Forearms", rating: 3 },
        ],
        notes: "Supinate at the top. No swinging. Full extension at bottom.",
      },
      {
        id: "hanging-knee-raises",
        name: "Hanging Knee Raises",
        category: "pull",
        defaultSets: 3,
        defaultReps: "10",
        emoji: "🤸",
        image: "./assets/hangin Knee Raises.webp",
        muscles: [
          { name: "Abs", rating: 5 },
          { name: "Hip Flexors", rating: 3 },
        ],
        notes: "Controlled swing. Knees to chest. Avoid kipping.",
      },
    ];

    this.currentCategory = "all";
    this.editingId = null;
    this.editingIsCustom = false;
    this.openPanels = new Set();
  }

  // ─────────────────────────────────────────────────────────────
  //  STORAGE KEY for per-exercise session log
  // ─────────────────────────────────────────────────────────────
  _logKey() {
    return "fitflow_exercise_log";
  }

  loadExLog() {
    try {
      return JSON.parse(localStorage.getItem(this._logKey())) || {};
    } catch {
      return {};
    }
  }

  saveExLog(log) {
    localStorage.setItem(this._logKey(), JSON.stringify(log));
  }

  addExLogEntry(exerciseId, sets, reps) {
    const log = this.loadExLog();
    if (!log[exerciseId]) log[exerciseId] = [];
    log[exerciseId].unshift({
      date: new Date().toISOString(),
      sets,
      reps,
    });
    log[exerciseId] = log[exerciseId].slice(0, 20);
    this.saveExLog(log);
  }

  getExHistory(exerciseId) {
    const log = this.loadExLog();
    return log[exerciseId] || [];
  }

  // ─────────────────────────────────────────────────────────────
  //  INIT
  // ─────────────────────────────────────────────────────────────
  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    document.querySelectorAll(".category-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document
          .querySelectorAll(".category-tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        this.currentCategory = tab.dataset.category;
        this.openPanels.clear();
        this.render();
      });
    });

    document
      .getElementById("resetWorkoutsBtn")
      ?.addEventListener("click", () => {
        if (confirm("Reset today's completed log?")) {
          storage.resetWorkouts();
          this.render();
          uiManager.updateDashboard();
          showToast("Workout log reset! 🔄");
        }
      });

    document
      .getElementById("addCustomExerciseBtn")
      ?.addEventListener("click", () => {
        this.showAddExerciseModal();
      });

    document
      .getElementById("addExerciseForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAddExercise();
      });

    document
      .querySelectorAll(".exercise-type-btn:not(.edit-type-btn)")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          document
            .querySelectorAll(".exercise-type-btn:not(.edit-type-btn)")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById("customExerciseType").value =
            btn.dataset.type;
        });
      });

    document.querySelectorAll('input[name="calorieMode"]').forEach((r) => {
      r.addEventListener("change", () => this.handleCalorieModeChange());
    });

    document
      .getElementById("customExerciseReps")
      ?.addEventListener("input", () => this.updateCalorieEstimate());
    document
      .getElementById("customExerciseSets")
      ?.addEventListener("input", () => this.updateCalorieEstimate());
    document
      .getElementById("customExerciseImage")
      ?.addEventListener("change", (e) => this.handleImageUpload(e));
    document
      .getElementById("cancelExerciseBtn")
      ?.addEventListener("click", () => this.hideAddExerciseModal());

    document.addEventListener("click", (e) => {
      if (e.target.id === "saveEditBtn") workoutsManager.saveEdit();
      if (e.target.id === "closeEditModal") workoutsManager.closeEditModal();
      if (e.target.id === "addMuscleBtn") workoutsManager.addMuscleRow();
      const editBtn = e.target.closest(".edit-type-btn");
      if (editBtn) {
        document
          .querySelectorAll(".edit-type-btn")
          .forEach((b) => b.classList.remove("active"));
        editBtn.classList.add("active");
        const inp = document.getElementById("editExType");
        if (inp) inp.value = editBtn.dataset.type;
      }
    });
  }

  getFilteredHardcoded() {
    if (this.currentCategory === "all") return this.exercises;
    return this.exercises.filter((e) => e.category === this.currentCategory);
  }

  getFilteredCustom() {
    const all = storage.getCustomExercises() || [];
    if (this.currentCategory === "all") return all;
    return all.filter((e) => (e.type || e.category) === this.currentCategory);
  }

  renderStars(rating) {
    let h = "";
    for (let i = 1; i <= 5; i++)
      h += `<span class="star ${i <= Math.round(rating) ? "filled" : "empty"}">★</span>`;
    return h;
  }

  renderMuscleList(muscles) {
    if (!muscles || !muscles.length) return "";
    return `<div class="muscle-list">
      ${muscles
        .map(
          (m) => `
        <div class="muscle-row">
          <span class="muscle-name">${m.name}</span>
          <span class="muscle-stars">${this.renderStars(m.rating || m.level || 3)}</span>
        </div>`,
        )
        .join("")}
    </div>`;
  }

  difficultyBadge(level) {
    const cls = level === "Beginner" ? "badge-beginner" : "badge-intermediate";
    return `<span class="difficulty-badge ${cls}">${level || "Beginner"}</span>`;
  }

  formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  renderProgressPanel(ex) {
    const hist = this.getExHistory(ex.id);
    const last = hist[0];
    const prev = hist.slice(1, 4);
    const isCompleted = storage.getCompletedWorkouts().includes(ex.id);

    const lastBanner = last
      ? `
      <div class="ex-last-perf">
        <div>
          <div class="last-perf-label">Last session</div>
          <div class="last-perf-value">${last.sets} sets · ${last.reps}</div>
          <div class="last-perf-date">${this.formatDate(last.date)}</div>
        </div>
        ${hist.length > 1 ? `<span class="hist-count">${hist.length} sessions</span>` : ""}
      </div>`
      : `<p class="no-history-msg">No sessions logged yet — log your first below! 💪</p>`;

    const prevRows = prev.length
      ? `
      <div class="prev-sessions">
        <div class="prev-sessions-title">Previous sessions</div>
        ${prev
          .map(
            (p) => `
          <div class="prev-session-row">
            <span class="prev-date">${this.formatDate(p.date)}</span>
            <span class="prev-data">${p.sets} sets · ${p.reps}</span>
          </div>`,
          )
          .join("")}
      </div>`
      : "";

    const noteTip = ex.notes
      ? `
      <div class="exercise-note">💡 ${ex.notes}</div>`
      : "";

    return `
      ${lastBanner}
      ${prevRows}
      ${noteTip}
      <div class="log-session-form">
        <div class="log-form-row">
          <div class="log-field">
            <label class="log-label">Sets done</label>
            <input type="number" class="log-input" id="log-sets-${ex.id}"
              placeholder="${ex.defaultSets}" min="1" max="20" inputmode="numeric"/>
          </div>
          <div class="log-field">
            <label class="log-label">Reps (e.g. 10/10/8)</label>
            <input type="text" class="log-input" id="log-reps-${ex.id}"
              placeholder="${ex.defaultReps}" inputmode="text"/>
          </div>
        </div>
        <div class="log-form-actions">
          <label class="wc-check-label ${isCompleted ? "done" : ""}" style="flex:1">
            <input type="checkbox" class="wc-checkbox" ${isCompleted ? "checked" : ""}
              onchange="workoutsManager.toggleHardcoded('${ex.id}')">
            <span class="wc-check-text">${isCompleted ? "✅ Completed!" : "Mark done"}</span>
          </label>
          <button class="log-save-btn" onclick="workoutsManager.logSession('${ex.id}')">
            Log Session 💾
          </button>
        </div>
      </div>`;
  }

  renderHardcodedCard(ex) {
    const isCompleted = storage.getCompletedWorkouts().includes(ex.id);
    const isOpen = this.openPanels.has(ex.id);

    return `
      <div class="workout-card hardcoded-card ${isCompleted ? "completed" : ""}" id="hcard-${ex.id}">
        <div class="wc-top" onclick="workoutsManager.togglePanel('${ex.id}')">
          <div class="wc-img-wrap">
            <img
              src="${ex.image}"
              alt="${ex.name}"
              loading="lazy"
              class="wc-exercise-img"
              onerror="this.parentElement.innerHTML='<span class=\\'wc-emoji\\'>${ex.emoji}</span>'"
            />
          </div>
          <div class="wc-header-info">
            <h4 class="wc-name">${ex.name}</h4>
            <div class="wc-meta">
              <span class="ex-badge badge-sets">${ex.defaultSets} sets</span>
              <span class="ex-badge badge-reps">${ex.defaultReps}</span>
            </div>
            ${this.renderMuscleList(ex.muscles)}
          </div>
          <div class="wc-right">
            <span class="wc-chevron ${isOpen ? "open" : ""}">▼</span>
          </div>
        </div>

        <div class="wc-progress-panel ${isOpen ? "open" : ""}" id="panel-${ex.id}">
          ${this.renderProgressPanel(ex)}
        </div>
      </div>`;
  }

  renderCustomCard(exercise) {
    const isCompleted = storage.getCompletedWorkouts().includes(exercise.id);
    return `
      <div class="workout-card ${isCompleted ? "completed" : ""}" data-id="${exercise.id}">
        <div class="wc-top">
          <div class="wc-emoji-wrap">
            <span class="wc-emoji">${exercise.emoji || "🏋️"}</span>
          </div>
          <div class="wc-header-info">
            <h4 class="wc-name">${exercise.name}</h4>
            <div class="wc-meta">
              ${this.difficultyBadge(exercise.difficulty)}
              <span class="wc-sets">${exercise.sets || "?"} sets × ${exercise.reps || "?"} reps</span>
            </div>
            ${this.renderMuscleList(exercise.muscles)}
          </div>
          <button class="wc-edit-btn" onclick="workoutsManager.openEditModal('${exercise.id}')" title="Edit">✏️</button>
        </div>

        ${exercise.imageData ? `<div class="wc-image"><img src="${exercise.imageData}" alt="${exercise.name}" loading="lazy"></div>` : ""}

        <div class="wc-actions">
          <label class="wc-check-label ${isCompleted ? "done" : ""}">
            <input type="checkbox" class="wc-checkbox" ${isCompleted ? "checked" : ""}
              onchange="workoutsManager.toggleCustom('${exercise.id}')">
            <span class="wc-check-text">${isCompleted ? "✅ Completed!" : "Mark as done"}</span>
          </label>
          <button class="wc-delete-btn" onclick="workoutsManager.deleteCustom('${exercise.id}')" title="Delete">🗑️</button>
        </div>
      </div>`;
  }

  render() {
    this.renderWorkoutList();
    this.renderCompletedWorkouts();
    this.updateOverviewCard();
  }

  renderWorkoutList() {
    const container = document.getElementById("workoutList");
    const hardcoded = this.getFilteredHardcoded();
    const custom = this.getFilteredCustom();

    if (hardcoded.length === 0 && custom.length === 0) {
      container.innerHTML = `
        <div class="empty-exercises">
          <div class="empty-exercises-icon">🔍</div>
          <h3>No exercises in this category</h3>
          <p>Add a custom one with <strong>+ Add Exercise</strong></p>
        </div>`;
      return;
    }

    let html = "";

    if (hardcoded.length > 0) {
      html += hardcoded.map((ex) => this.renderHardcodedCard(ex)).join("");
    }

    if (custom.length > 0) {
      html += `<div class="custom-section-divider">
        <span>⭐ Your Custom Exercises</span>
      </div>`;
      html += custom.map((ex) => this.renderCustomCard(ex)).join("");
    }

    container.innerHTML = html;
  }

  renderCompletedWorkouts() {
    const el = document.getElementById("completedWorkouts");
    const completed = storage.getCompletedWorkouts();
    const allCustom = storage.getCustomExercises() || [];

    if (completed.length === 0) {
      el.innerHTML = `<p class="empty-state">No workouts completed yet. Let's get moving! 💪</p>`;
      return;
    }

    const allExercises = [...this.exercises, ...allCustom];
    const doneItems = allExercises.filter((e) => completed.includes(e.id));

    el.innerHTML = doneItems
      .map(
        (ex) => `
      <div class="completed-item">
        <span class="completed-item-check">✓</span>
        <div class="completed-item-info">
          <div class="completed-item-name">${ex.name}</div>
          <div class="completed-item-time">${ex.emoji || "🏋️"} ${ex.defaultSets || ex.sets || "?"} sets</div>
        </div>
      </div>`,
      )
      .join("");
  }

  updateOverviewCard() {
    const completed = storage.getCompletedWorkouts();
    const workoutPreview = document.getElementById("workoutPreview");
    const statusEl = document.getElementById("workoutStatus");
    const timeEl = document.getElementById("workoutTime");

    if (!statusEl) return;

    if (completed.length === 0) {
      statusEl.textContent = "Not Started";
      statusEl.className = "stat-value workout-status pending";
      if (timeEl) timeEl.textContent = "Complete your workout today";
      if (workoutPreview) workoutPreview.innerHTML = "";
      return;
    }

    statusEl.textContent = `${completed.length} Done`;
    statusEl.className = "stat-value workout-status";
    if (timeEl) timeEl.textContent = "Great job! Keep it up! 💪";

    const allExercises = [
      ...this.exercises,
      ...(storage.getCustomExercises() || []),
    ];
    const doneList = allExercises.filter((e) => completed.includes(e.id));
    if (workoutPreview) {
      workoutPreview.innerHTML = doneList
        .slice(0, 2)
        .map((e) => `<div class="preview-item">✓ ${e.name}</div>`)
        .join("");
    }
  }

  togglePanel(id) {
    if (this.openPanels.has(id)) {
      this.openPanels.delete(id);
    } else {
      this.openPanels.add(id);
    }
    const panel = document.getElementById(`panel-${id}`);
    const chevron = document.querySelector(`#hcard-${id} .wc-chevron`);
    if (panel) {
      const isOpen = panel.classList.toggle("open");
      if (chevron) chevron.classList.toggle("open", isOpen);
      if (isOpen) {
        setTimeout(
          () => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }),
          50,
        );
      }
    }
  }

  logSession(exerciseId) {
    const ex = this.exercises.find((e) => e.id === exerciseId);
    const setsEl = document.getElementById(`log-sets-${exerciseId}`);
    const repsEl = document.getElementById(`log-reps-${exerciseId}`);

    const setsVal = setsEl?.value.trim() || String(ex.defaultSets);
    const repsVal = repsEl?.value.trim() || ex.defaultReps;

    this.addExLogEntry(exerciseId, setsVal, repsVal);

    if (!storage.getCompletedWorkouts().includes(exerciseId)) {
      storage.addWorkout(exerciseId);
    }

    if (setsEl) setsEl.value = "";
    if (repsEl) repsEl.value = "";

    const panel = document.getElementById(`panel-${exerciseId}`);
    if (panel) {
      panel.innerHTML = this.renderProgressPanel(ex);
    }

    this.renderCompletedWorkouts();
    this.updateOverviewCard();
    uiManager.updateDashboard();

    showToast("Session logged! 💪");
  }

  toggleHardcoded(id) {
    const completed = storage.getCompletedWorkouts();
    if (completed.includes(id)) {
      storage.removeWorkout(id);
      showToast("Unmarked! ↩️");
    } else {
      storage.addWorkout(id);
      showToast("Completed! 💪");
    }
    this.render();
    uiManager.updateDashboard();
  }

  toggleCustom(id) {
    const completed = storage.getCompletedWorkouts();
    if (completed.includes(id)) {
      storage.removeWorkout(id);
      showToast("Unmarked! ↩️");
    } else {
      storage.addWorkout(id);
      showToast("Completed! 💪");
    }
    this.render();
    uiManager.updateDashboard();
  }

  deleteCustom(id) {
    if (confirm("Delete this exercise?")) {
      storage.removeCustomExercise(id);
      storage.removeWorkout(id);
      this.render();
      uiManager.updateDashboard();
      showToast("Exercise deleted! 🗑️");
    }
  }

  showAddExerciseModal() {
    this.resetExerciseForm();
    document.getElementById("addExerciseModal").classList.remove("hidden");
  }

  hideAddExerciseModal() {
    document.getElementById("addExerciseModal").classList.add("hidden");
    this.resetExerciseForm();
  }

  resetExerciseForm() {
    document.getElementById("addExerciseForm")?.reset();
    document
      .querySelectorAll(".exercise-type-btn:not(.edit-type-btn)")
      .forEach((b) => b.classList.remove("active"));
    const t = document.getElementById("customExerciseType");
    if (t) t.value = "";
    const est = document.getElementById("calorieEstimate");
    if (est) est.textContent = "";
    const prev = document.getElementById("imagePreview");
    if (prev) {
      prev.innerHTML = "";
      prev.classList.add("hidden");
    }
    const radio = document.querySelector(
      'input[name="calorieMode"][value="manual"]',
    );
    if (radio) radio.checked = true;
  }

  handleCalorieModeChange() {
    const mode = document.querySelector(
      'input[name="calorieMode"]:checked',
    )?.value;
    if (mode === "estimate") this.updateCalorieEstimate();
    else {
      const e = document.getElementById("calorieEstimate");
      if (e) e.textContent = "";
    }
  }

  updateCalorieEstimate() {
    const mode = document.querySelector(
      'input[name="calorieMode"]:checked',
    )?.value;
    if (mode !== "estimate") return;
    const type = document.getElementById("customExerciseType")?.value;
    const sets =
      parseInt(document.getElementById("customExerciseSets")?.value) || 0;
    const reps =
      parseInt(document.getElementById("customExerciseReps")?.value) || 0;
    if (!type || sets <= 0) return;
    const est = storage.getExerciseCalorieEstimate(type, sets, reps || null);
    const inp = document.getElementById("customExerciseCalories");
    const span = document.getElementById("calorieEstimate");
    if (inp) inp.value = est;
    if (span) span.textContent = `Estimated: ~${est} kcal`;
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const prev = document.getElementById("imagePreview");
      if (prev) {
        prev.innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
        prev.classList.remove("hidden");
      }
    };
    reader.readAsDataURL(file);
  }

  handleAddExercise() {
    const name = document.getElementById("customExerciseName")?.value.trim();
    const sets = document.getElementById("customExerciseSets")?.value;
    const reps = document.getElementById("customExerciseReps")?.value;
    const type = document.getElementById("customExerciseType")?.value;
    const cal =
      parseInt(document.getElementById("customExerciseCalories")?.value) || 0;
    const diff =
      document.getElementById("customExerciseDifficulty")?.value || "Beginner";
    const file = document.getElementById("customExerciseImage")?.files[0];

    if (!name || !sets || !type) {
      showToast("Fill in name, sets, and type! 📋");
      return;
    }

    const save = (imageData) => {
      storage.addCustomExercise({
        name,
        sets,
        reps: reps || "?",
        type,
        category: type,
        calories: cal,
        difficulty: diff,
        imageData: imageData || null,
        emoji: this.getTypeEmoji(type),
        muscles: this.getDefaultMuscles(type),
      });
      this.hideAddExerciseModal();
      this.render();
      showToast(`"${name}" added! 💪`);
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => save(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      save(null);
    }
  }

  getDefaultMuscles(type) {
    const map = {
      push: [
        { name: "Chest", rating: 4 },
        { name: "Triceps", rating: 3 },
        { name: "Shoulders", rating: 2 },
      ],
      pull: [
        { name: "Lats", rating: 4 },
        { name: "Biceps", rating: 3 },
        { name: "Rhomboids", rating: 2 },
      ],
      legs: [
        { name: "Quads", rating: 4 },
        { name: "Glutes", rating: 3 },
        { name: "Hamstrings", rating: 2 },
      ],
      cardio: [
        { name: "Cardiovascular", rating: 5 },
        { name: "Calves", rating: 3 },
        { name: "Core", rating: 2 },
      ],
    };
    return map[type] || [];
  }

  getTypeEmoji(type) {
    return { push: "💪", pull: "🤸", legs: "🦵", cardio: "🏃" }[type] || "🏋️";
  }

  openEditModal(id) {
    const all = storage.getCustomExercises() || [];
    const ex = all.find((e) => e.id === id);
    if (!ex) return;

    this.editingId = id;
    this.editingIsCustom = true;

    document.getElementById("editExName").value = ex.name || "";
    document.getElementById("editExSets").value = ex.sets || "";
    document.getElementById("editExReps").value = ex.reps || "";
    document.getElementById("editExDiff").value = ex.difficulty || "Beginner";

    const type = ex.type || ex.category || "";
    document
      .querySelectorAll(".edit-type-btn")
      .forEach((b) => b.classList.toggle("active", b.dataset.type === type));
    const inp = document.getElementById("editExType");
    if (inp) inp.value = type;

    const rows = document.getElementById("editMuscleRows");
    if (rows) {
      rows.innerHTML = "";
      (ex.muscles || []).forEach((m) => this.addMuscleRow(m.name, m.rating));
    }

    document.getElementById("editExerciseModal").classList.remove("hidden");
  }

  closeEditModal() {
    document.getElementById("editExerciseModal").classList.add("hidden");
    this.editingId = null;
  }

  addMuscleRow(name = "", rating = 3) {
    const c = document.getElementById("editMuscleRows");
    if (!c) return;
    const row = document.createElement("div");
    row.className = "edit-muscle-row";
    row.innerHTML = `
      <input type="text" class="edit-muscle-name" placeholder="Muscle" value="${name}" />
      <select class="edit-muscle-rating">
        ${[1, 2, 3, 4, 5].map((n) => `<option value="${n}" ${n === rating ? "selected" : ""}>${"★".repeat(n)} (${n})</option>`).join("")}
      </select>
      <button class="remove-muscle-btn" onclick="this.parentElement.remove()">✕</button>`;
    c.appendChild(row);
  }

  saveEdit() {
    const name = document.getElementById("editExName")?.value.trim();
    const sets = document.getElementById("editExSets")?.value;
    const reps = document.getElementById("editExReps")?.value;
    const diff = document.getElementById("editExDiff")?.value;
    const type = document.getElementById("editExType")?.value;
    if (!name) {
      showToast("Name required!");
      return;
    }

    const muscles = [];
    document.querySelectorAll(".edit-muscle-row").forEach((row) => {
      const mName = row.querySelector(".edit-muscle-name")?.value.trim();
      const mRating =
        parseInt(row.querySelector(".edit-muscle-rating")?.value) || 3;
      if (mName) muscles.push({ name: mName, rating: mRating });
    });

    const all = storage.getCustomExercises() || [];
    const idx = all.findIndex((e) => e.id === this.editingId);
    if (idx !== -1) {
      all[idx] = {
        ...all[idx],
        name,
        sets,
        reps,
        difficulty: diff,
        type: type || all[idx].type,
        category: type || all[idx].category,
        muscles,
        emoji: this.getTypeEmoji(type || all[idx].type),
      };
      storage.saveCustomExercises(all);
    }

    this.closeEditModal();
    this.render();
    showToast(`"${name}" updated! ✏️`);
  }
}

const workoutsManager = new WorkoutsManager();
