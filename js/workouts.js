/**
 * FitFlow - Workouts Manager
 * Handles workout tracking and completion
 */

class WorkoutsManager {
    constructor() {
        this.workouts = [
            // Push Exercises
            {
                id: 'push-1',
                name: 'Push-ups',
                description: '3 sets of 10-15 reps',
                category: 'push',
                emoji: '💪'
            },
            {
                id: 'push-2',
                name: 'Bench Press',
                description: '4 sets of 8-10 reps',
                category: 'push',
                emoji: '🏋️'
            },
            {
                id: 'push-3',
                name: 'Shoulder Press',
                description: '3 sets of 10-12 reps',
                category: 'push',
                emoji: '💪'
            },
            {
                id: 'push-4',
                name: 'Tricep Dips',
                description: '3 sets of 10-12 reps',
                category: 'push',
                emoji: '🤸'
            },
            // Pull Exercises
            {
                id: 'pull-1',
                name: 'Pull-ups',
                description: '3 sets of 5-10 reps',
                category: 'pull',
                emoji: '🤸'
            },
            {
                id: 'pull-2',
                name: 'Barbell Rows',
                description: '4 sets of 6-8 reps',
                category: 'pull',
                emoji: '🏋️'
            },
            {
                id: 'pull-3',
                name: 'Lat Pulldowns',
                description: '3 sets of 10-12 reps',
                category: 'pull',
                emoji: '💪'
            },
            {
                id: 'pull-4',
                name: 'Bicep Curls',
                description: '3 sets of 10-12 reps',
                category: 'pull',
                emoji: '💪'
            },
            // Leg Exercises
            {
                id: 'legs-1',
                name: 'Squats',
                description: '4 sets of 8-10 reps',
                category: 'legs',
                emoji: '🦵'
            },
            {
                id: 'legs-2',
                name: 'Deadlifts',
                description: '3 sets of 5-8 reps',
                category: 'legs',
                emoji: '🏋️'
            },
            {
                id: 'legs-3',
                name: 'Leg Press',
                description: '3 sets of 10-12 reps',
                category: 'legs',
                emoji: '🦵'
            },
            {
                id: 'legs-4',
                name: 'Lunges',
                description: '3 sets of 10 reps (each leg)',
                category: 'legs',
                emoji: '🦵'
            },
            {
                id: 'legs-5',
                name: 'Leg Curls',
                description: '3 sets of 12-15 reps',
                category: 'legs',
                emoji: '🦵'
            },
            // Cardio Exercises
            {
                id: 'cardio-1',
                name: 'Running',
                description: '30 minutes at moderate pace',
                category: 'cardio',
                emoji: '🏃'
            },
            {
                id: 'cardio-2',
                name: 'Cycling',
                description: '45 minutes moderate intensity',
                category: 'cardio',
                emoji: '🚴'
            },
            {
                id: 'cardio-3',
                name: 'Jump Rope',
                description: '10 sets of 1 minute',
                category: 'cardio',
                emoji: '🪢'
            },
            {
                id: 'cardio-4',
                name: 'Swimming',
                description: '30 minutes continuous',
                category: 'cardio',
                emoji: '🏊'
            },
            {
                id: 'cardio-5',
                name: 'HIIT Training',
                description: '20 minutes high intensity',
                category: 'cardio',
                emoji: '⚡'
            },
            {
                id: 'cardio-6',
                name: 'Rowing',
                description: '30 minutes steady state',
                category: 'cardio',
                emoji: '🚣'
            }
        ];

        this.currentCategory = 'all';
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentCategory = tab.dataset.category;
                this.render();
            });
        });

        // Reset button
        document.getElementById('resetWorkoutsBtn').addEventListener('click', () => {
            if (confirm('Reset today\'s workout log?')) {
                storage.resetWorkouts();
                this.render();
                showToast('Workout log reset! 🔄');
            }
        });

        // Add custom exercise button
        document.getElementById('addCustomExerciseBtn').addEventListener('click', () => {
            this.showAddExerciseModal();
        });

        // Add exercise form
        const addExerciseForm = document.getElementById('addExerciseForm');
        if (addExerciseForm) {
            addExerciseForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddExercise();
            });
        }

        // Exercise type selector
        document.querySelectorAll('.exercise-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.exercise-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('customExerciseType').value = btn.dataset.type;
            });
        });

        // Calorie mode toggle
        document.querySelectorAll('input[name="calorieMode"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.handleCalorieModeChange();
            });
        });

        // Reps input for estimation
        document.getElementById('customExerciseReps')?.addEventListener('change', () => {
            this.updateCalorieEstimate();
        });

        document.getElementById('customExerciseSets')?.addEventListener('change', () => {
            this.updateCalorieEstimate();
        });

        // Image upload
        document.getElementById('customExerciseImage')?.addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Cancel button
        document.getElementById('cancelExerciseBtn')?.addEventListener('click', () => {
            this.hideAddExerciseModal();
        });
    }

    toggleWorkout(workoutId) {
        const completed = storage.getCompletedWorkouts();
        
        if (completed.includes(workoutId)) {
            storage.removeWorkout(workoutId);
            showToast('Workout unmarked! ↩️');
        } else {
            storage.addWorkout(workoutId);
            showToast('Workout completed! 💪');
            this.celebrate();
        }

        this.render();
    }

    celebrate() {
        const celebrationEl = document.querySelector('.completed-item:last-child');
        if (celebrationEl) {
            celebrationEl.style.animation = 'slideIn 0.3s ease';
        }
    }

    getFilteredWorkouts() {
        if (this.currentCategory === 'all') {
            return this.workouts;
        }
        return this.workouts.filter(w => w.category === this.currentCategory);
    }

    render() {
        this.renderWorkoutList();
        this.renderCompletedWorkouts();
        this.renderCustomExercises();
        this.updateOverviewCard();
    }

    renderWorkoutList() {
        const workoutList = document.getElementById('workoutList');
        const completed = storage.getCompletedWorkouts();
        const filtered = this.getFilteredWorkouts();

        if (filtered.length === 0) {
            workoutList.innerHTML = '<p class="empty-state">No workouts in this category! 🎯</p>';
            return;
        }

        workoutList.innerHTML = filtered.map(workout => {
            const isCompleted = completed.includes(workout.id);
            return `
                <div class="workout-item ${isCompleted ? 'completed' : ''}">
                    <div class="workout-item-header">
                        <h4 class="workout-item-name">${workout.name}</h4>
                        <span class="workout-item-icon">${workout.emoji}</span>
                    </div>
                    <p class="workout-item-description">${workout.description}</p>
                    <label class="workout-checkbox-label">
                        <input 
                            type="checkbox" 
                            class="workout-item-checkbox"
                            ${isCompleted ? 'checked' : ''}
                            onchange="workoutsManager.toggleWorkout('${workout.id}')"
                        >
                        <span>${isCompleted ? 'Completed!' : 'Mark as done'}</span>
                    </label>
                </div>
            `;
        }).join('');
    }

    renderCompletedWorkouts() {
        const completedEl = document.getElementById('completedWorkouts');
        const completed = storage.getCompletedWorkouts();

        if (completed.length === 0) {
            completedEl.innerHTML = '<p class="empty-state">No workouts completed yet. Let\'s get moving! 💪</p>';
            return;
        }

        const completedWorkouts = this.workouts.filter(w => completed.includes(w.id));

        completedEl.innerHTML = completedWorkouts.map(workout => `
            <div class="completed-item">
                <span class="completed-item-check">✓</span>
                <div class="completed-item-info">
                    <div class="completed-item-name">${workout.name}</div>
                    <div class="completed-item-time">${workout.emoji} ${workout.description}</div>
                </div>
            </div>
        `).join('');
    }

    updateOverviewCard() {
        const completed = storage.getCompletedWorkouts();
        const workoutPreview = document.getElementById('workoutPreview');
        
        if (completed.length === 0) {
            document.getElementById('workoutStatus').textContent = 'Not Started';
            document.getElementById('workoutStatus').className = 'stat-display workout-status pending';
            document.getElementById('workoutTime').textContent = 'Complete your workout today';
            workoutPreview.innerHTML = '';
            return;
        }

        document.getElementById('workoutStatus').textContent = `${completed.length} Completed`;
        document.getElementById('workoutStatus').className = 'stat-display workout-status';
        document.getElementById('workoutTime').textContent = 'Great job! Keep it up! 💪';

        const completedWorkouts = this.workouts.filter(w => completed.includes(w.id));
        workoutPreview.innerHTML = completedWorkouts.slice(0, 2).map(w => `
            <div style="font-size: 0.85rem; color: var(--accent-green); margin-bottom: 4px;">
                ✓ ${w.name}
            </div>
        `).join('');
    }

    // ==================== CUSTOM EXERCISES ====================

    showAddExerciseModal() {
        document.getElementById('addExerciseModal').classList.remove('hidden');
        this.resetExerciseForm();
    }

    hideAddExerciseModal() {
        document.getElementById('addExerciseModal').classList.add('hidden');
        this.resetExerciseForm();
    }

    resetExerciseForm() {
        document.getElementById('addExerciseForm').reset();
        document.querySelectorAll('.exercise-type-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('customExerciseType').value = '';
        document.getElementById('calorieEstimate').textContent = '';
        document.getElementById('imagePreview').classList.add('hidden');
        document.querySelector('input[name="calorieMode"][value="manual"]').checked = true;
    }

    handleCalorieModeChange() {
        const mode = document.querySelector('input[name="calorieMode"]:checked').value;
        const calorieInput = document.getElementById('customExerciseCalories');
        
        if (mode === 'estimate') {
            this.updateCalorieEstimate();
        } else {
            document.getElementById('calorieEstimate').textContent = '';
        }
    }

    updateCalorieEstimate() {
        const type = document.getElementById('customExerciseType').value;
        const sets = parseInt(document.getElementById('customExerciseSets').value) || 0;
        const reps = parseInt(document.getElementById('customExerciseReps').value) || 0;
        
        if (!type || sets <= 0) return;

        const estimated = storage.getExerciseCalorieEstimate(type, sets, reps || null);
        document.getElementById('customExerciseCalories').value = estimated;
        document.getElementById('calorieEstimate').textContent = `Estimated: ~${estimated} kcal`;
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${event.target.result}" alt="Exercise preview">`;
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    handleAddExercise() {
        const name = document.getElementById('customExerciseName').value.trim();
        const sets = parseInt(document.getElementById('customExerciseSets').value);
        const reps = parseInt(document.getElementById('customExerciseReps').value) || 0;
        const type = document.getElementById('customExerciseType').value;
        const calories = parseInt(document.getElementById('customExerciseCalories').value);
        const imageFile = document.getElementById('customExerciseImage').files[0];

        if (!name || !sets || !type) {
            showToast('Please fill in all required fields! 📋');
            return;
        }

        let imageData = null;
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imageData = event.target.result;
                this.saveCustomExercise(name, sets, reps, type, calories, imageData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            this.saveCustomExercise(name, sets, reps, type, calories, null);
        }
    }

    saveCustomExercise(name, sets, reps, type, calories, imageData) {
        const exercise = {
            name,
            sets,
            reps,
            type,
            calories,
            imageData,
            emoji: this.getTypeEmoji(type)
        };

        storage.addCustomExercise(exercise);
        this.hideAddExerciseModal();
        this.render();
        showToast(`Custom exercise "${name}" added! 💪`);
    }

    getTypeEmoji(type) {
        const emojis = {
            push: '💪',
            pull: '🤸',
            legs: '🦵',
            cardio: '🏃'
        };
        return emojis[type] || '🏋️';
    }

    renderCustomExercises() {
        const customList = document.getElementById('customExercisesList');
        const customExercises = storage.getCustomExercises();
        const completed = storage.getCompletedWorkouts();

        if (!customExercises || customExercises.length === 0) {
            customList.innerHTML = '<p class="empty-state">No custom exercises yet. Create one to get started! ➕</p>';
            return;
        }

        customList.innerHTML = customExercises.map(exercise => {
            const isCompleted = completed.includes(exercise.id);
            return `
                <div class="custom-exercise-item ${isCompleted ? 'completed' : ''}">
                    <div class="custom-exercise-header">
                        <div class="custom-exercise-info">
                            <span class="custom-exercise-emoji">${exercise.emoji}</span>
                            <div class="custom-exercise-details">
                                <h4 class="custom-exercise-name">${exercise.name}</h4>
                                <p class="custom-exercise-meta">${exercise.sets} sets ${exercise.reps ? `× ${exercise.reps} reps` : ''} • ${exercise.calories} kcal</p>
                            </div>
                        </div>
                        <label class="custom-exercise-checkbox">
                            <input 
                                type="checkbox" 
                                ${isCompleted ? 'checked' : ''}
                                onchange="workoutsManager.toggleCustomExercise('${exercise.id}')"
                            >
                            <span class="checkmark">✓</span>
                        </label>
                    </div>
                    ${exercise.imageData ? `<div class="custom-exercise-image"><img src="${exercise.imageData}" alt="${exercise.name}"></div>` : ''}
                    <button class="delete-custom-exercise" onclick="workoutsManager.deleteCustomExercise('${exercise.id}')">Delete</button>
                </div>
            `;
        }).join('');
    }

    toggleCustomExercise(exerciseId) {
        const completed = storage.getCompletedWorkouts();
        
        if (completed.includes(exerciseId)) {
            storage.removeWorkout(exerciseId);
            showToast('Custom exercise unmarked! ↩️');
        } else {
            storage.addWorkout(exerciseId);
            showToast('Custom exercise completed! 💪');
        }

        this.render();
    }

    deleteCustomExercise(exerciseId) {
        if (confirm('Delete this custom exercise?')) {
            storage.removeCustomExercise(exerciseId);
            this.render();
            showToast('Custom exercise deleted! 🗑️');
        }
    }
}

// Create global instance
const workoutsManager = new WorkoutsManager();