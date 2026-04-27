/**
 * FitFlow - Workouts Manager v3.0
 * Custom exercises only — no defaults
 * Category filter works on custom exercises
 * Fully mobile-friendly
 */

class WorkoutsManager {
  constructor() {
    // NO default exercises — user creates everything
    this.workouts = [];
    this.currentCategory = "all";
    this.editingId = null;
    this.editingIsCustom = false;
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  // ─────────────────────────────────────────────────────────────
  //  EVENT LISTENERS
  // ─────────────────────────────────────────────────────────────
  setupEventListeners() {
    // Category filter tabs
    document.querySelectorAll(".category-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document
          .querySelectorAll(".category-tab")
          .forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        this.currentCategory = tab.dataset.category;
        this.render();
      });
    });

    // Reset workout log
    document
      .getElementById("resetWorkoutsBtn")
      ?.addEventListener("click", () => {
        if (confirm("Reset today's completed workouts?")) {
          storage.resetWorkouts();
          this.render();
          uiManager.updateDashboard();
          showToast("Workout log reset! 🔄");
        }
      });

    // Open add exercise modal
    document
      .getElementById("addCustomExerciseBtn")
      ?.addEventListener("click", () => {
        this.showAddExerciseModal();
      });

    // Add exercise form
    document
      .getElementById("addExerciseForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAddExercise();
      });

    // Exercise type selector buttons
    document.querySelectorAll(".exercise-type-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".exercise-type-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("customExerciseType").value = btn.dataset.type;
      });
    });

    // Calorie mode radio
    document.querySelectorAll('input[name="calorieMode"]').forEach((radio) => {
      radio.addEventListener("change", () => this.handleCalorieModeChange());
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

    // Edit modal buttons
    document
      .getElementById("closeEditModal")
      ?.addEventListener("click", () => this.closeEditModal());
    document
      .getElementById("saveEditBtn")
      ?.addEventListener("click", () => this.saveEdit());
    document
      .getElementById("addMuscleBtn")
      ?.addEventListener("click", () => this.addMuscleRow());
  }

  // ─────────────────────────────────────────────────────────────
  //  FILTER — works on custom exercises
  // ─────────────────────────────────────────────────────────────
  getFilteredCustomExercises() {
    const all = storage.getCustomExercises() || [];
    if (this.currentCategory === "all") return all;
    return all.filter(
      (ex) => (ex.type || ex.category) === this.currentCategory,
    );
  }

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────
  render() {
    this.renderExerciseList();
    this.renderCompletedWorkouts();
    this.updateOverviewCard();
  }

  renderStars(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= Math.round(rating) ? "filled" : "empty"}">★</span>`;
    }
    return html;
  }

  renderMuscleList(muscles) {
    if (!muscles || muscles.length === 0) return "";
    return `
      <div class="muscle-list">
        ${muscles
          .map(
            (m) => `
          <div class="muscle-row">
            <span class="muscle-name">${m.name}</span>
            <span class="muscle-stars">${this.renderStars(m.rating)}</span>
          </div>
        `,
          )
          .join("")}
      </div>`;
  }

  difficultyBadge(level) {
    const cls = level === "Beginner" ? "badge-beginner" : "badge-intermediate";
    return `<span class="difficulty-badge ${cls}">${level || "Beginner"}</span>`;
  }

  renderExerciseList() {
    const container = document.getElementById("workoutList");
    const completed = storage.getCompletedWorkouts();
    const exercises = this.getFilteredCustomExercises();

    if (exercises.length === 0) {
      const msg =
        this.currentCategory === "all"
          ? `<div class="empty-exercises">
             <div class="empty-exercises-icon">🏋️</div>
             <h3>No exercises yet</h3>
             <p>Tap <strong>+ Add Exercise</strong> to create your first workout</p>
           </div>`
          : `<div class="empty-exercises">
             <div class="empty-exercises-icon">🔍</div>
             <h3>No ${this.currentCategory} exercises</h3>
             <p>Create one with the <strong>+ Add Exercise</strong> button above</p>
           </div>`;
      container.innerHTML = msg;
      return;
    }

    container.innerHTML = exercises
      .map((ex) => {
        const isCompleted = completed.includes(ex.id);
        const category = ex.type || ex.category || "push";
        return `
        <div class="workout-card ${isCompleted ? "completed" : ""}" data-id="${ex.id}">
          <div class="wc-top">
            <div class="wc-emoji-wrap">
              <span class="wc-emoji">${ex.emoji || this.getTypeEmoji(category)}</span>
            </div>
            <div class="wc-header-info">
              <h4 class="wc-name">${ex.name}</h4>
              <div class="wc-meta">
                ${this.difficultyBadge(ex.difficulty)}
                <span class="wc-sets">${ex.sets || "?"} sets × ${ex.reps || "?"} reps</span>
              </div>
            </div>
            <button class="wc-edit-btn" onclick="workoutsManager.openEditModal('${ex.id}')" title="Edit">✏️</button>
          </div>

          ${ex.imageData ? `<div class="wc-image"><img src="${ex.imageData}" alt="${ex.name}" loading="lazy"></div>` : ""}

          ${this.renderMuscleList(ex.muscles)}

          <div class="wc-actions">
            <label class="wc-check-label ${isCompleted ? "done" : ""}">
              <input type="checkbox" class="wc-checkbox" ${isCompleted ? "checked" : ""}
                onchange="workoutsManager.toggleExercise('${ex.id}')">
              <span class="wc-check-text">${isCompleted ? "✅ Completed!" : "Mark as done"}</span>
            </label>
            <button class="wc-delete-btn" onclick="workoutsManager.deleteExercise('${ex.id}')" title="Delete">🗑️</button>
          </div>
        </div>`;
      })
      .join("");
  }

  renderCompletedWorkouts() {
    const el = document.getElementById("completedWorkouts");
    const completed = storage.getCompletedWorkouts();
    const all = storage.getCustomExercises() || [];

    if (completed.length === 0) {
      el.innerHTML = `<p class="empty-state">No workouts completed yet. Let's get moving! 💪</p>`;
      return;
    }

    const done = all.filter((ex) => completed.includes(ex.id));
    el.innerHTML = done
      .map(
        (ex) => `
      <div class="completed-item">
        <span class="completed-item-check">✓</span>
        <div class="completed-item-info">
          <div class="completed-item-name">${ex.name}</div>
          <div class="completed-item-time">${ex.emoji || "🏋️"} ${ex.sets || "?"} sets × ${ex.reps || "?"} reps</div>
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

    const all = storage.getCustomExercises() || [];
    const doneExercises = all.filter((ex) => completed.includes(ex.id));
    if (workoutPreview) {
      workoutPreview.innerHTML = doneExercises
        .slice(0, 2)
        .map((ex) => `<div class="preview-item">✓ ${ex.name}</div>`)
        .join("");
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  TOGGLE COMPLETE
  // ─────────────────────────────────────────────────────────────
  toggleExercise(id) {
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

  deleteExercise(id) {
    if (confirm("Delete this exercise?")) {
      storage.removeCustomExercise(id);
      storage.removeWorkout(id); // also remove from completed if present
      this.render();
      uiManager.updateDashboard();
      showToast("Exercise deleted! 🗑️");
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  ADD EXERCISE MODAL
  // ─────────────────────────────────────────────────────────────
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
      .querySelectorAll(".exercise-type-btn")
      .forEach((b) => b.classList.remove("active"));
    const typeInput = document.getElementById("customExerciseType");
    if (typeInput) typeInput.value = "";
    const est = document.getElementById("calorieEstimate");
    if (est) est.textContent = "";
    const preview = document.getElementById("imagePreview");
    if (preview) {
      preview.innerHTML = "";
      preview.classList.add("hidden");
    }
    const manualRadio = document.querySelector(
      'input[name="calorieMode"][value="manual"]',
    );
    if (manualRadio) manualRadio.checked = true;
  }

  handleCalorieModeChange() {
    const mode = document.querySelector(
      'input[name="calorieMode"]:checked',
    )?.value;
    if (mode === "estimate") this.updateCalorieEstimate();
    else {
      const est = document.getElementById("calorieEstimate");
      if (est) est.textContent = "";
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
    const calInput = document.getElementById("customExerciseCalories");
    if (calInput) calInput.value = est;
    const estEl = document.getElementById("calorieEstimate");
    if (estEl) estEl.textContent = `Estimated: ~${est} kcal`;
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = document.getElementById("imagePreview");
      if (preview) {
        preview.innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
        preview.classList.remove("hidden");
      }
    };
    reader.readAsDataURL(file);
  }

  handleAddExercise() {
    const name = document.getElementById("customExerciseName")?.value.trim();
    const sets = document.getElementById("customExerciseSets")?.value;
    const reps = document.getElementById("customExerciseReps")?.value;
    const type = document.getElementById("customExerciseType")?.value;
    const calories =
      parseInt(document.getElementById("customExerciseCalories")?.value) || 0;
    const diff =
      document.getElementById("customExerciseDifficulty")?.value || "Beginner";
    const imageFile = document.getElementById("customExerciseImage")?.files[0];

    if (!name || !sets || !type) {
      showToast("Please fill name, sets, and type! 📋");
      return;
    }

    const save = (imageData) => {
      const exercise = {
        name,
        sets,
        reps: reps || "?",
        type,
        category: type,
        calories,
        difficulty: diff,
        imageData: imageData || null,
        emoji: this.getTypeEmoji(type),
        muscles: this.getDefaultMuscles(type),
      };
      storage.addCustomExercise(exercise);
      this.hideAddExerciseModal();
      this.render();
      showToast(`"${name}" added! 💪`);
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (ev) => save(ev.target.result);
      reader.readAsDataURL(imageFile);
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

  // ─────────────────────────────────────────────────────────────
  //  EDIT MODAL
  // ─────────────────────────────────────────────────────────────
  openEditModal(id) {
    const all = storage.getCustomExercises() || [];
    const exercise = all.find((ex) => ex.id === id);
    if (!exercise) return;

    this.editingId = id;
    this.editingIsCustom = true;

    document.getElementById("editExName").value = exercise.name || "";
    document.getElementById("editExSets").value = exercise.sets || "";
    document.getElementById("editExReps").value = exercise.reps || "";
    document.getElementById("editExDiff").value =
      exercise.difficulty || "Beginner";

    // set type buttons
    const type = exercise.type || exercise.category || "";
    document.querySelectorAll(".edit-type-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.type === type);
    });
    const editTypeInput = document.getElementById("editExType");
    if (editTypeInput) editTypeInput.value = type;

    // muscles
    const muscleContainer = document.getElementById("editMuscleRows");
    if (muscleContainer) {
      muscleContainer.innerHTML = "";
      (exercise.muscles || []).forEach((m) =>
        this.addMuscleRow(m.name, m.rating),
      );
    }

    document.getElementById("editExerciseModal").classList.remove("hidden");
  }

  closeEditModal() {
    document.getElementById("editExerciseModal").classList.add("hidden");
    this.editingId = null;
  }

  addMuscleRow(name = "", rating = 3) {
    const container = document.getElementById("editMuscleRows");
    if (!container) return;
    const row = document.createElement("div");
    row.className = "edit-muscle-row";
    row.innerHTML = `
      <input type="text" class="edit-muscle-name" placeholder="Muscle" value="${name}" />
      <select class="edit-muscle-rating">
        ${[1, 2, 3, 4, 5]
          .map(
            (n) =>
              `<option value="${n}" ${n === rating ? "selected" : ""}>${"★".repeat(n)} (${n})</option>`,
          )
          .join("")}
      </select>
      <button class="remove-muscle-btn" onclick="this.parentElement.remove()">✕</button>`;
    container.appendChild(row);
  }

  saveEdit() {
    const name = document.getElementById("editExName")?.value.trim();
    const sets = document.getElementById("editExSets")?.value;
    const reps = document.getElementById("editExReps")?.value;
    const diff = document.getElementById("editExDiff")?.value;
    const type = document.getElementById("editExType")?.value;

    if (!name) {
      showToast("Exercise name required!");
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
    const idx = all.findIndex((ex) => ex.id === this.editingId);
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
