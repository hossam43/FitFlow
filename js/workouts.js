/**
 * FitFlow - Workouts Manager (FIXED)
 * Handles workout tracking and completion
 * Now supports unlimited custom exercises with photos
 */

class WorkoutsManager {
  constructor() {
    this.workouts = [
      // Push Exercises
      {
        id: "push-1",
        name: "Push-ups",
        description: "3 sets of 10-15 reps",
        category: "push",
        emoji: "💪",
      },
      {
        id: "push-2",
        name: "Bench Press",
        description: "4 sets of 8-10 reps",
        category: "push",
        emoji: "🏋️",
      },
      {
        id: "push-3",
        name: "Shoulder Press",
        description: "3 sets of 10-12 reps",
        category: "push",
        emoji: "💪",
      },
      {
        id: "push-4",
        name: "Tricep Dips",
        description: "3 sets of 10-12 reps",
        category: "push",
        emoji: "🤸",
      },
      // Pull Exercises
      {
        id: "pull-1",
        name: "Pull-ups",
        description: "3 sets of 5-10 reps",
        category: "pull",
        emoji: "🤸",
      },
      {
        id: "pull-2",
        name: "Barbell Rows",
        description: "4 sets of 6-8 reps",
        category: "pull",
        emoji: "🏋️",
      },
      {
        id: "pull-3",
        name: "Lat Pulldowns",
        description: "3 sets of 10-12 reps",
        category: "pull",
        emoji: "💪",
      },
      {
        id: "pull-4",
        name: "Bicep Curls",
        description: "3 sets of 10-12 reps",
        category: "pull",
        emoji: "💪",
      },
      // Leg Exercises
      {
        id: "legs-1",
        name: "Squats",
        description: "4 sets of 8-10 reps",
        category: "legs",
        emoji: "🦵",
      },
      {
        id: "legs-2",
        name: "Deadlifts",
        description: "3 sets of 5-8 reps",
        category: "legs",
        emoji: "🏋️",
      },
      {
        id: "legs-3",
        name: "Leg Press",
        description: "3 sets of 10-12 reps",
        category: "legs",
        emoji: "🦵",
      },
      {
        id: "legs-4",
        name: "Lunges",
        description: "3 sets of 10 reps (each leg)",
        category: "legs",
        emoji: "🦵",
      },
      {
        id: "legs-5",
        name: "Leg Curls",
        description: "3 sets of 12-15 reps",
        category: "legs",
        emoji: "🦵",
      },
      // Cardio Exercises
      {
        id: "cardio-1",
        name: "Running",
        description: "30 minutes at moderate pace",
        category: "cardio",
        emoji: "🏃",
      },
      {
        id: "cardio-2",
        name: "Cycling",
        description: "45 minutes moderate intensity",
        category: "cardio",
        emoji: "🚴",
      },
      {
        id: "cardio-3",
        name: "Jump Rope",
        description: "10 sets of 1 minute",
        category: "cardio",
        emoji: "🪢",
      },
      {
        id: "cardio-4",
        name: "Swimming",
        description: "30 minutes continuous",
        category: "cardio",
        emoji: "🏊",
      },
      {
        id: "cardio-5",
        name: "HIIT Training",
        description: "20 minutes high intensity",
        category: "cardio",
        emoji: "⚡",
      },
      {
        id: "cardio-6",
        name: "Rowing",
        description: "30 minutes steady state",
        category: "cardio",
        emoji: "🚣",
      },
    ];

    this.currentCategory = "all";
    this.editingExerciseId = null;
    this.tempImageData = null;
  }

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
        this.render();
      });
    });

    document
      .getElementById("resetWorkoutsBtn")
      .addEventListener("click", () => {
        if (confirm("Reset today's workout log?")) {
          storage.resetWorkouts();
          this.render();
          showToast("Workout log reset! 🔄");
        }
      });

    document
      .getElementById("addCustomExerciseBtn")
      .addEventListener("click", () => {
        this.editingExerciseId = null;
        this.tempImageData = null;
        this.showAddExerciseModal();
      });

    const addExerciseForm = document.getElementById("addExerciseForm");
    if (addExerciseForm) {
      addExerciseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAddExercise();
      });
    }

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

    document.querySelectorAll('input[name="calorieMode"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        this.handleCalorieModeChange();
      });
    });

    document
      .getElementById("customExerciseReps")
      ?.addEventListener("change", () => {
        this.updateCalorieEstimate();
      });

    document
      .getElementById("customExerciseSets")
      ?.addEventListener("change", () => {
        this.updateCalorieEstimate();
      });

    document
      .getElementById("customExerciseImage")
      ?.addEventListener("change", (e) => {
        this.handleImageUpload(e);
      });

    document
      .getElementById("cancelExerciseBtn")
      ?.addEventListener("click", () => {
        this.hideAddExerciseModal();
      });
  }

  toggleWorkout(workoutId) {
    const completed = storage.getCompletedWorkouts();

    if (completed.includes(workoutId)) {
      storage.removeWorkout(workoutId);
      showToast("Workout unmarked! ↩️");
    } else {
      storage.addWorkout(workoutId);
      showToast("Workout completed! 💪");
      this.celebrate();
    }

    this.render();
  }

  celebrate() {
    const celebrationEl = document.querySelector(".completed-item:last-child");
    if (celebrationEl) {
      celebrationEl.style.animation = "slideIn 0.3s ease";
    }
  }

  getFilteredWorkouts() {
    if (this.currentCategory === "all") {
      return this.workouts;
    }
    return this.workouts.filter((w) => w.category === this.currentCategory);
  }

  render() {
    this.renderWorkoutList();
    this.renderCompletedWorkouts();
    this.renderCustomExercises();
    this.updateOverviewCard();
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
                <div class="workout-item ${isCompleted ? "completed" : ""}">
                    <div class="workout-item-header">
                        <h4 class="workout-item-name">${workout.name}</h4>
                        <span class="workout-item-icon">${workout.emoji}</span>
                    </div>
                    <p class="workout-item-description">${workout.description}</p>
                    <label class="workout-checkbox-label">
                        <input 
                            type="checkbox" 
                            class="workout-item-checkbox"
                            ${isCompleted ? "checked" : ""}
                            onchange="workoutsManager.toggleWorkout('${workout.id}')"
                        >
                        <span>${isCompleted ? "Completed!" : "Mark as done"}</span>
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
      completedEl.innerHTML =
        '<p class="empty-state">No workouts completed yet. Let\'s get moving! 💪</p>';
      return;
    }

    const completedWorkouts = this.workouts.filter((w) =>
      completed.includes(w.id),
    );

    completedEl.innerHTML = completedWorkouts
      .map(
        (workout) => `
            <div class="completed-item">
                <span class="completed-item-check">✓</span>
                <div class="completed-item-info">
                    <div class="completed-item-name">${workout.name}</div>
                    <div class="completed-item-time">${workout.emoji} ${workout.description}</div>
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
            <div style="font-size: 0.85rem; color: var(--accent-green); margin-bottom: 4px;">
                ✓ ${w.name}
            </div>
        `,
      )
      .join("");
  }

  // ==================== CUSTOM EXERCISES ====================

  showAddExerciseModal() {
    document.getElementById("addExerciseModal").classList.remove("hidden");
    this.resetExerciseForm();
  }

  hideAddExerciseModal() {
    document.getElementById("addExerciseModal").classList.add("hidden");
    this.resetExerciseForm();
    this.editingExerciseId = null;
    this.tempImageData = null;
    // Reset modal title
    const modalHeader = document.querySelector(".modal-header h2");
    if (modalHeader) {
      modalHeader.textContent = "Add Custom Exercise";
    }
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
    this.tempImageData = null;
  }

  handleCalorieModeChange() {
    const mode = document.querySelector(
      'input[name="calorieMode"]:checked',
    ).value;

    if (mode === "estimate") {
      this.updateCalorieEstimate();
    } else {
      document.getElementById("calorieEstimate").textContent = "";
    }
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

    // Limit image size to 300KB
    const maxSize = 300 * 1024;
    if (file.size > maxSize) {
      showToast("⚠️ Image too large! Max 300KB. Please compress.");
      document.getElementById("customExerciseImage").value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        this.tempImageData = event.target.result;
        const preview = document.getElementById("imagePreview");
        preview.innerHTML = `
                    <div style="position: relative;">
                        <img src="${event.target.result}" alt="Exercise preview" style="max-width: 100%; border-radius: 8px;">
                        <button type="button" onclick="workoutsManager.removeImage()" style="
                            position: absolute;
                            top: 8px;
                            right: 8px;
                            background: rgba(0,0,0,0.6);
                            color: white;
                            border: none;
                            padding: 4px 8px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
                            font-size: 16px;
                        ">✕</button>
                    </div>
                `;
        preview.classList.remove("hidden");
      } catch (err) {
        showToast("❌ Error loading image");
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.tempImageData = null;
    document.getElementById("customExerciseImage").value = "";
    document.getElementById("imagePreview").classList.add("hidden");
    showToast("Image removed");
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

    if (!name || !sets || !type) {
      showToast("❌ Please fill all required fields!");
      return;
    }

    this.saveCustomExercise(
      name,
      sets,
      reps,
      type,
      calories,
      this.tempImageData,
    );
  }

  saveCustomExercise(name, sets, reps, type, calories, imageData) {
    try {
      const exercise = {
        name,
        sets,
        reps,
        type,
        calories,
        imageData,
        emoji: this.getTypeEmoji(type),
      };

      if (this.editingExerciseId) {
        storage.updateCustomExercise(this.editingExerciseId, exercise);
        showToast(`Exercise "${name}" updated! ✏️`);
      } else {
        storage.addCustomExercise(exercise);
        showToast(`Custom exercise "${name}" added! 💪`);
      }

      this.hideAddExerciseModal();
      this.render();
    } catch (error) {
      showToast("❌ Storage limit reached! Try removing some exercises.");
      console.error("Save error:", error);
    }
  }

  getTypeEmoji(type) {
    const emojis = {
      push: "💪",
      pull: "🤸",
      legs: "🦵",
      cardio: "🏃",
    };
    return emojis[type] || "🏋️";
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
                <div class="custom-exercise-item ${isCompleted ? "completed" : ""}">
                    <div class="custom-exercise-header">
                        <div class="custom-exercise-info">
                            <span class="custom-exercise-emoji">${exercise.emoji}</span>
                            <div class="custom-exercise-details">
                                <h4 class="custom-exercise-name">${exercise.name}</h4>
                                <p class="custom-exercise-meta">${exercise.sets} sets ${exercise.reps ? `× ${exercise.reps} reps` : ""} • ${exercise.calories} kcal</p>
                            </div>
                        </div>
                        <label class="custom-exercise-checkbox">
                            <input 
                                type="checkbox" 
                                ${isCompleted ? "checked" : ""}
                                onchange="workoutsManager.toggleCustomExercise('${exercise.id}')"
                            >
                            <span class="checkmark">✓</span>
                        </label>
                    </div>
                    ${exercise.imageData ? `<div class="custom-exercise-image"><img src="${exercise.imageData}" alt="${exercise.name}"></div>` : ""}
                    <div class="custom-exercise-actions">
                        <button class="edit-custom-exercise" onclick="workoutsManager.editCustomExercise('${exercise.id}')">✏️ Edit</button>
                        <button class="delete-custom-exercise" onclick="workoutsManager.deleteCustomExercise('${exercise.id}')">🗑️ Delete</button>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  editCustomExercise(exerciseId) {
    const exercises = storage.getCustomExercises();
    const exercise = exercises.find((e) => e.id === exerciseId);

    if (!exercise) {
      showToast("Exercise not found!");
      return;
    }

    this.editingExerciseId = exerciseId;
    this.tempImageData = exercise.imageData || null;

    document.getElementById("customExerciseName").value = exercise.name;
    document.getElementById("customExerciseSets").value = exercise.sets;
    document.getElementById("customExerciseReps").value = exercise.reps || "";
    document.getElementById("customExerciseCalories").value =
      exercise.calories || 0;

    document.querySelectorAll(".exercise-type-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.type === exercise.type);
    });
    document.getElementById("customExerciseType").value = exercise.type;

    if (exercise.imageData) {
      const preview = document.getElementById("imagePreview");
      preview.innerHTML = `
                <div style="position: relative;">
                    <img src="${exercise.imageData}" alt="Exercise" style="max-width: 100%; border-radius: 8px;">
                    <button type="button" onclick="workoutsManager.removeImage()" style="
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        background: rgba(0,0,0,0.6);
                        color: white;
                        border: none;
                        padding: 4px 8px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: bold;
                    ">✕</button>
                </div>
            `;
      preview.classList.remove("hidden");
    }

    const modalHeader = document.querySelector(".modal-header h2");
    if (modalHeader) {
      modalHeader.textContent = "Edit Exercise";
    }

    this.showAddExerciseModal();
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

const workoutsManager = new WorkoutsManager();
