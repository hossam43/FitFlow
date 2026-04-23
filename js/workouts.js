/**
 * FitFlow - Workouts Manager v2.0
 * Muscle ratings, editable exercises, rich card UI
 */

class WorkoutsManager {
  constructor() {
    this.workouts = [
      // ── PUSH ────────────────────────────────────────────────
      {
        id: "push-1",
        name: "Push-ups",
        description: "3 sets × 10–15 reps",
        sets: 3,
        reps: "10–15",
        category: "push",
        difficulty: "Beginner",
        emoji: "💪",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=pushup&backgroundColor=ffb3b3",
        muscles: [
          { name: "Chest", rating: 5 },
          { name: "Triceps", rating: 3 },
          { name: "Shoulders", rating: 2 },
          { name: "Core", rating: 1 },
        ],
      },
      {
        id: "push-2",
        name: "Bench Press",
        description: "4 sets × 8–10 reps",
        sets: 4,
        reps: "8–10",
        category: "push",
        difficulty: "Intermediate",
        emoji: "🏋️",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=bench&backgroundColor=ffcdd2",
        muscles: [
          { name: "Chest", rating: 5 },
          { name: "Triceps", rating: 4 },
          { name: "Shoulders", rating: 3 },
          { name: "Core", rating: 1 },
        ],
      },
      {
        id: "push-3",
        name: "Shoulder Press",
        description: "3 sets × 10–12 reps",
        sets: 3,
        reps: "10–12",
        category: "push",
        difficulty: "Intermediate",
        emoji: "💪",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=shoulder&backgroundColor=ffd5b8",
        muscles: [
          { name: "Shoulders", rating: 5 },
          { name: "Triceps", rating: 3 },
          { name: "Upper Traps", rating: 2 },
          { name: "Core", rating: 1 },
        ],
      },
      {
        id: "push-4",
        name: "Tricep Dips",
        description: "3 sets × 10–12 reps",
        sets: 3,
        reps: "10–12",
        category: "push",
        difficulty: "Beginner",
        emoji: "🤸",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=dips&backgroundColor=ffe0b2",
        muscles: [
          { name: "Triceps", rating: 5 },
          { name: "Chest", rating: 2 },
          { name: "Shoulders", rating: 2 },
        ],
      },

      // ── PULL ────────────────────────────────────────────────
      {
        id: "pull-1",
        name: "Pull-ups",
        description: "3 sets × 5–10 reps",
        sets: 3,
        reps: "5–10",
        category: "pull",
        difficulty: "Intermediate",
        emoji: "🤸",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=pullup&backgroundColor=c8e6c9",
        muscles: [
          { name: "Lats", rating: 5 },
          { name: "Biceps", rating: 4 },
          { name: "Rhomboids", rating: 3 },
          { name: "Core", rating: 2 },
        ],
      },
      {
        id: "pull-2",
        name: "Barbell Rows",
        description: "4 sets × 6–8 reps",
        sets: 4,
        reps: "6–8",
        category: "pull",
        difficulty: "Intermediate",
        emoji: "🏋️",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=rows&backgroundColor=b2dfdb",
        muscles: [
          { name: "Lats", rating: 5 },
          { name: "Rhomboids", rating: 4 },
          { name: "Biceps", rating: 3 },
          { name: "Lower Back", rating: 2 },
        ],
      },
      {
        id: "pull-3",
        name: "Lat Pulldowns",
        description: "3 sets × 10–12 reps",
        sets: 3,
        reps: "10–12",
        category: "pull",
        difficulty: "Beginner",
        emoji: "💪",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=latpull&backgroundColor=b3e5fc",
        muscles: [
          { name: "Lats", rating: 5 },
          { name: "Biceps", rating: 3 },
          { name: "Teres Major", rating: 3 },
          { name: "Shoulders", rating: 1 },
        ],
      },
      {
        id: "pull-4",
        name: "Bicep Curls",
        description: "3 sets × 10–12 reps",
        sets: 3,
        reps: "10–12",
        category: "pull",
        difficulty: "Beginner",
        emoji: "💪",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=curl&backgroundColor=d1c4e9",
        muscles: [
          { name: "Biceps", rating: 5 },
          { name: "Forearms", rating: 3 },
          { name: "Brachialis", rating: 2 },
        ],
      },

      // ── LEGS ────────────────────────────────────────────────
      {
        id: "legs-1",
        name: "Squats",
        description: "4 sets × 8–10 reps",
        sets: 4,
        reps: "8–10",
        category: "legs",
        difficulty: "Beginner",
        emoji: "🦵",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=squat&backgroundColor=fff9c4",
        muscles: [
          { name: "Quads", rating: 5 },
          { name: "Glutes", rating: 4 },
          { name: "Hamstrings", rating: 3 },
          { name: "Core", rating: 2 },
        ],
      },
      {
        id: "legs-2",
        name: "Deadlifts",
        description: "3 sets × 5–8 reps",
        sets: 3,
        reps: "5–8",
        category: "legs",
        difficulty: "Intermediate",
        emoji: "🏋️",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=dead&backgroundColor=ffecb3",
        muscles: [
          { name: "Hamstrings", rating: 5 },
          { name: "Glutes", rating: 5 },
          { name: "Lower Back", rating: 4 },
          { name: "Traps", rating: 3 },
          { name: "Core", rating: 3 },
        ],
      },
      {
        id: "legs-3",
        name: "Leg Press",
        description: "3 sets × 10–12 reps",
        sets: 3,
        reps: "10–12",
        category: "legs",
        difficulty: "Beginner",
        emoji: "🦵",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=legpress&backgroundColor=f8bbd0",
        muscles: [
          { name: "Quads", rating: 5 },
          { name: "Glutes", rating: 3 },
          { name: "Hamstrings", rating: 2 },
        ],
      },
      {
        id: "legs-4",
        name: "Lunges",
        description: "3 sets × 10 reps each",
        sets: 3,
        reps: "10 each",
        category: "legs",
        difficulty: "Beginner",
        emoji: "🦵",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=lunge&backgroundColor=e1f5fe",
        muscles: [
          { name: "Quads", rating: 5 },
          { name: "Glutes", rating: 4 },
          { name: "Hamstrings", rating: 2 },
          { name: "Calves", rating: 1 },
        ],
      },
      {
        id: "legs-5",
        name: "Leg Curls",
        description: "3 sets × 12–15 reps",
        sets: 3,
        reps: "12–15",
        category: "legs",
        difficulty: "Beginner",
        emoji: "🦵",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=legcurl&backgroundColor=e8f5e9",
        muscles: [
          { name: "Hamstrings", rating: 5 },
          { name: "Calves", rating: 2 },
          { name: "Glutes", rating: 1 },
        ],
      },

      // ── CARDIO ──────────────────────────────────────────────
      {
        id: "cardio-1",
        name: "Running",
        description: "30 min moderate pace",
        sets: 1,
        reps: "30 min",
        category: "cardio",
        difficulty: "Beginner",
        emoji: "🏃",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=run&backgroundColor=fce4ec",
        muscles: [
          { name: "Quads", rating: 4 },
          { name: "Calves", rating: 4 },
          { name: "Glutes", rating: 3 },
          { name: "Hamstrings", rating: 2 },
          { name: "Core", rating: 2 },
        ],
      },
      {
        id: "cardio-2",
        name: "Cycling",
        description: "45 min moderate intensity",
        sets: 1,
        reps: "45 min",
        category: "cardio",
        difficulty: "Beginner",
        emoji: "🚴",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=cycle&backgroundColor=e3f2fd",
        muscles: [
          { name: "Quads", rating: 5 },
          { name: "Calves", rating: 3 },
          { name: "Glutes", rating: 3 },
          { name: "Hamstrings", rating: 2 },
        ],
      },
      {
        id: "cardio-3",
        name: "Jump Rope",
        description: "10 sets × 1 minute",
        sets: 10,
        reps: "1 min",
        category: "cardio",
        difficulty: "Intermediate",
        emoji: "🪢",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=jumprope&backgroundColor=f3e5f5",
        muscles: [
          { name: "Calves", rating: 5 },
          { name: "Shoulders", rating: 3 },
          { name: "Core", rating: 3 },
          { name: "Forearms", rating: 2 },
        ],
      },
      {
        id: "cardio-4",
        name: "HIIT Training",
        description: "20 min high intensity",
        sets: 1,
        reps: "20 min",
        category: "cardio",
        difficulty: "Intermediate",
        emoji: "⚡",
        image:
          "https://api.dicebear.com/7.x/shapes/svg?seed=hiit&backgroundColor=fff3e0",
        muscles: [
          { name: "Full Body", rating: 5 },
          { name: "Core", rating: 4 },
          { name: "Quads", rating: 3 },
          { name: "Shoulders", rating: 2 },
        ],
      },
    ];

    this.currentCategory = "all";
    this.editingId = null;
  }

  // ─────────────────────────────────────────────────────────────
  //  INIT
  // ─────────────────────────────────────────────────────────────
  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    // Category tabs
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
      .addEventListener("click", () => {
        if (confirm("Reset today's workout log?")) {
          storage.resetWorkouts();
          this.render();
          showToast("Workout log reset! 🔄");
        }
      });

    // Add custom exercise
    document
      .getElementById("addCustomExerciseBtn")
      .addEventListener("click", () => {
        this.showAddExerciseModal();
      });

    // Add exercise form submit
    const addExerciseForm = document.getElementById("addExerciseForm");
    if (addExerciseForm) {
      addExerciseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAddExercise();
      });
    }

    // Exercise type selector
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

    // Calorie mode toggle
    document.querySelectorAll('input[name="calorieMode"]').forEach((radio) => {
      radio.addEventListener("change", () => this.handleCalorieModeChange());
    });

    document
      .getElementById("customExerciseReps")
      ?.addEventListener("change", () => this.updateCalorieEstimate());
    document
      .getElementById("customExerciseSets")
      ?.addEventListener("change", () => this.updateCalorieEstimate());
    document
      .getElementById("customExerciseImage")
      ?.addEventListener("change", (e) => this.handleImageUpload(e));
    document
      .getElementById("cancelExerciseBtn")
      ?.addEventListener("click", () => this.hideAddExerciseModal());

    // Edit modal close
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
  //  TOGGLE WORKOUT DONE
  // ─────────────────────────────────────────────────────────────
  toggleWorkout(workoutId) {
    const completed = storage.getCompletedWorkouts();
    if (completed.includes(workoutId)) {
      storage.removeWorkout(workoutId);
      showToast("Workout unmarked! ↩️");
    } else {
      storage.addWorkout(workoutId);
      showToast("Workout completed! 💪");
    }
    this.render();
  }

  getFilteredWorkouts() {
    if (this.currentCategory === "all") return this.workouts;
    return this.workouts.filter((w) => w.category === this.currentCategory);
  }

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────
  render() {
    this.renderWorkoutList();
    this.renderCompletedWorkouts();
    this.renderCustomExercises();
    this.updateOverviewCard();
  }

  // Stars helper
  renderStars(rating) {
    const full = Math.round(rating);
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= full ? "filled" : "empty"}">★</span>`;
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
      </div>
    `;
  }

  difficultyBadge(level) {
    const cls = level === "Beginner" ? "badge-beginner" : "badge-intermediate";
    return `<span class="difficulty-badge ${cls}">${level}</span>`;
  }

  renderWorkoutList() {
    const workoutList = document.getElementById("workoutList");
    const completed = storage.getCompletedWorkouts();
    const filtered = this.getFilteredWorkouts();

    if (filtered.length === 0) {
      workoutList.innerHTML =
        '<p class="empty-state">No workouts in this category! 🎯</p>';
      return;
    }

    workoutList.innerHTML = filtered
      .map((workout) => {
        const isCompleted = completed.includes(workout.id);
        return `
        <div class="workout-card ${isCompleted ? "completed" : ""}" data-id="${workout.id}">
          <div class="wc-top">
            <div class="wc-emoji-wrap">
              <span class="wc-emoji">${workout.emoji}</span>
            </div>
            <div class="wc-header-info">
              <h4 class="wc-name">${workout.name}</h4>
              <div class="wc-meta">
                ${this.difficultyBadge(workout.difficulty)}
                <span class="wc-sets">${workout.sets} sets × ${workout.reps}</span>
              </div>
            </div>
            <button class="wc-edit-btn" onclick="workoutsManager.openEditModal('${workout.id}')" title="Edit exercise">✏️</button>
          </div>

          ${this.renderMuscleList(workout.muscles)}

          <label class="wc-check-label ${isCompleted ? "done" : ""}">
            <input
              type="checkbox"
              class="wc-checkbox"
              ${isCompleted ? "checked" : ""}
              onchange="workoutsManager.toggleWorkout('${workout.id}')"
            >
            <span class="wc-check-text">${isCompleted ? "✅ Completed!" : "Mark as done"}</span>
          </label>
        </div>
      `;
      })
      .join("");
  }

  renderCompletedWorkouts() {
    const completedEl = document.getElementById("completedWorkouts");
    const completed = storage.getCompletedWorkouts();

    if (completed.length === 0) {
      completedEl.innerHTML = `<p class="empty-state">No workouts completed yet. Let's get moving! 💪</p>`;
      return;
    }

    const allExercises = [
      ...this.workouts,
      ...(storage.getCustomExercises() || []),
    ];
    const completedWorkouts = allExercises.filter((w) =>
      completed.includes(w.id),
    );

    completedEl.innerHTML = completedWorkouts
      .map(
        (workout) => `
      <div class="completed-item">
        <span class="completed-item-check">✓</span>
        <div class="completed-item-info">
          <div class="completed-item-name">${workout.name}</div>
          <div class="completed-item-time">${workout.emoji} ${workout.description || workout.sets + " sets"}</div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  updateOverviewCard() {
    const completed = storage.getCompletedWorkouts();
    const workoutPreview = document.getElementById("workoutPreview");

    if (completed.length === 0) {
      document.getElementById("workoutStatus").textContent = "Not Started";
      document.getElementById("workoutStatus").className =
        "stat-display workout-status pending";
      document.getElementById("workoutTime").textContent =
        "Complete your workout today";
      workoutPreview.innerHTML = "";
      return;
    }

    document.getElementById("workoutStatus").textContent =
      `${completed.length} Completed`;
    document.getElementById("workoutStatus").className =
      "stat-display workout-status";
    document.getElementById("workoutTime").textContent =
      "Great job! Keep it up! 💪";

    const completedWorkouts = this.workouts.filter((w) =>
      completed.includes(w.id),
    );
    workoutPreview.innerHTML = completedWorkouts
      .slice(0, 2)
      .map(
        (w) => `
      <div style="font-size:0.85rem;color:var(--accent-green);margin-bottom:4px;">✓ ${w.name}</div>
    `,
      )
      .join("");
  }

  // ─────────────────────────────────────────────────────────────
  //  EDIT MODAL
  // ─────────────────────────────────────────────────────────────
  openEditModal(id) {
    // find in built-in or custom
    let exercise = this.workouts.find((w) => w.id === id);
    let isCustom = false;
    if (!exercise) {
      exercise = (storage.getCustomExercises() || []).find((w) => w.id === id);
      isCustom = true;
    }
    if (!exercise) return;

    this.editingId = id;
    this.editingIsCustom = isCustom;

    // Populate modal fields
    document.getElementById("editExName").value = exercise.name;
    document.getElementById("editExSets").value = exercise.sets || "";
    document.getElementById("editExReps").value = exercise.reps || "";
    document.getElementById("editExDiff").value =
      exercise.difficulty || "Beginner";

    // Muscles
    const muscleContainer = document.getElementById("editMuscleRows");
    muscleContainer.innerHTML = "";
    (exercise.muscles || []).forEach((m) =>
      this.addMuscleRow(m.name, m.rating),
    );

    document.getElementById("editExerciseModal").classList.remove("hidden");
  }

  closeEditModal() {
    document.getElementById("editExerciseModal").classList.add("hidden");
    this.editingId = null;
  }

  addMuscleRow(name = "", rating = 3) {
    const container = document.getElementById("editMuscleRows");
    const row = document.createElement("div");
    row.className = "edit-muscle-row";
    row.innerHTML = `
      <input type="text" class="edit-muscle-name" placeholder="Muscle name" value="${name}" />
      <select class="edit-muscle-rating">
        ${[1, 2, 3, 4, 5].map((n) => `<option value="${n}" ${n === rating ? "selected" : ""}>${"★".repeat(n)} (${n})</option>`).join("")}
      </select>
      <button class="remove-muscle-btn" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(row);
  }

  saveEdit() {
    const name = document.getElementById("editExName").value.trim();
    const sets = document.getElementById("editExSets").value;
    const reps = document.getElementById("editExReps").value;
    const diff = document.getElementById("editExDiff").value;

    const muscleRows = document.querySelectorAll(".edit-muscle-row");
    const muscles = [];
    muscleRows.forEach((row) => {
      const mName = row.querySelector(".edit-muscle-name").value.trim();
      const mRating = parseInt(row.querySelector(".edit-muscle-rating").value);
      if (mName) muscles.push({ name: mName, rating: mRating });
    });

    if (!name) {
      showToast("Please enter an exercise name!");
      return;
    }

    if (!this.editingIsCustom) {
      const ex = this.workouts.find((w) => w.id === this.editingId);
      if (ex) {
        ex.name = name;
        ex.sets = sets;
        ex.reps = reps;
        ex.difficulty = diff;
        ex.muscles = muscles;
        ex.description = `${sets} sets × ${reps} reps`;
      }
    } else {
      const customs = storage.getCustomExercises() || [];
      const ex = customs.find((w) => w.id === this.editingId);
      if (ex) {
        ex.name = name;
        ex.sets = sets;
        ex.reps = reps;
        ex.difficulty = diff;
        ex.muscles = muscles;
        storage.saveCustomExercises(customs);
      }
    }

    this.closeEditModal();
    this.render();
    uiManager.updateDashboard();
    showToast(`"${name}" updated! ✏️`);
  }

  // ─────────────────────────────────────────────────────────────
  //  CUSTOM EXERCISES
  // ─────────────────────────────────────────────────────────────
  showAddExerciseModal() {
    document.getElementById("addExerciseModal").classList.remove("hidden");
    this.resetExerciseForm();
  }

  hideAddExerciseModal() {
    document.getElementById("addExerciseModal").classList.add("hidden");
    this.resetExerciseForm();
  }

  resetExerciseForm() {
    document.getElementById("addExerciseForm").reset();
    document
      .querySelectorAll(".exercise-type-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document.getElementById("customExerciseType").value = "";
    document.getElementById("calorieEstimate").textContent = "";
    document.getElementById("imagePreview").classList.add("hidden");
    document.querySelector(
      'input[name="calorieMode"][value="manual"]',
    ).checked = true;
  }

  handleCalorieModeChange() {
    const mode = document.querySelector(
      'input[name="calorieMode"]:checked',
    ).value;
    if (mode === "estimate") this.updateCalorieEstimate();
    else document.getElementById("calorieEstimate").textContent = "";
  }

  updateCalorieEstimate() {
    const type = document.getElementById("customExerciseType").value;
    const sets =
      parseInt(document.getElementById("customExerciseSets").value) || 0;
    const reps =
      parseInt(document.getElementById("customExerciseReps").value) || 0;
    if (!type || sets <= 0) return;
    const estimated = storage.getExerciseCalorieEstimate(
      type,
      sets,
      reps || null,
    );
    document.getElementById("customExerciseCalories").value = estimated;
    document.getElementById("calorieEstimate").textContent =
      `Estimated: ~${estimated} kcal`;
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById("imagePreview");
      preview.innerHTML = `<img src="${event.target.result}" alt="Exercise preview">`;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  }

  handleAddExercise() {
    const name = document.getElementById("customExerciseName").value.trim();
    const sets = parseInt(document.getElementById("customExerciseSets").value);
    const reps =
      parseInt(document.getElementById("customExerciseReps").value) || 0;
    const type = document.getElementById("customExerciseType").value;
    const calories = parseInt(
      document.getElementById("customExerciseCalories").value,
    );
    const imageFile = document.getElementById("customExerciseImage").files[0];

    if (!name || !sets || !type) {
      showToast("Please fill in all required fields! 📋");
      return;
    }

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) =>
        this.saveCustomExercise(
          name,
          sets,
          reps,
          type,
          calories,
          event.target.result,
        );
      reader.readAsDataURL(imageFile);
    } else {
      this.saveCustomExercise(name, sets, reps, type, calories, null);
    }
  }

  saveCustomExercise(name, sets, reps, type, calories, imageData) {
    const exercise = {
      id: "custom-" + Date.now(),
      name,
      sets,
      reps,
      type,
      calories,
      imageData,
      difficulty: "Beginner",
      emoji: this.getTypeEmoji(type),
      description: `${sets} sets × ${reps || "?"} reps`,
      muscles: this.getDefaultMuscles(type),
    };
    storage.addCustomExercise(exercise);
    this.hideAddExerciseModal();
    this.render();
    showToast(`Custom exercise "${name}" added! 💪`);
  }

  getDefaultMuscles(type) {
    const defaults = {
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
    return defaults[type] || [];
  }

  getTypeEmoji(type) {
    return { push: "💪", pull: "🤸", legs: "🦵", cardio: "🏃" }[type] || "🏋️";
  }

  renderCustomExercises() {
    const customList = document.getElementById("customExercisesList");
    const customExercises = storage.getCustomExercises();
    const completed = storage.getCompletedWorkouts();

    if (!customExercises || customExercises.length === 0) {
      customList.innerHTML =
        '<p class="empty-state">No custom exercises yet. Create one to get started! ➕</p>';
      return;
    }

    customList.innerHTML = customExercises
      .map((exercise) => {
        const isCompleted = completed.includes(exercise.id);
        return `
        <div class="workout-card ${isCompleted ? "completed" : ""}" data-id="${exercise.id}">
          <div class="wc-top">
            <div class="wc-emoji-wrap">
              <span class="wc-emoji">${exercise.emoji || "🏋️"}</span>
            </div>
            <div class="wc-header-info">
              <h4 class="wc-name">${exercise.name}</h4>
              <div class="wc-meta">
                ${this.difficultyBadge(exercise.difficulty || "Beginner")}
                <span class="wc-sets">${exercise.sets} sets × ${exercise.reps || "?"} reps</span>
              </div>
            </div>
            <button class="wc-edit-btn" onclick="workoutsManager.openEditModal('${exercise.id}')" title="Edit">✏️</button>
          </div>

          ${this.renderMuscleList(exercise.muscles)}

          ${exercise.imageData ? `<div class="custom-exercise-image"><img src="${exercise.imageData}" alt="${exercise.name}"></div>` : ""}

          <div class="wc-actions">
            <label class="wc-check-label ${isCompleted ? "done" : ""}">
              <input type="checkbox" class="wc-checkbox" ${isCompleted ? "checked" : ""}
                onchange="workoutsManager.toggleCustomExercise('${exercise.id}')">
              <span class="wc-check-text">${isCompleted ? "✅ Completed!" : "Mark as done"}</span>
            </label>
            <button class="delete-custom-exercise" onclick="workoutsManager.deleteCustomExercise('${exercise.id}')">🗑️ Delete</button>
          </div>
        </div>
      `;
      })
      .join("");
  }

  toggleCustomExercise(exerciseId) {
    const completed = storage.getCompletedWorkouts();
    if (completed.includes(exerciseId)) {
      storage.removeWorkout(exerciseId);
      showToast("Custom exercise unmarked! ↩️");
    } else {
      storage.addWorkout(exerciseId);
      showToast("Custom exercise completed! 💪");
    }
    this.render();
  }

  deleteCustomExercise(exerciseId) {
    if (confirm("Delete this custom exercise?")) {
      storage.removeCustomExercise(exerciseId);
      this.render();
      showToast("Custom exercise deleted! 🗑️");
    }
  }
}

// Global instance
const workoutsManager = new WorkoutsManager();
