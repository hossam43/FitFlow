/**
 * FitFlow - Storage Manager
 * Handles all localStorage operations and data persistence
 */

class StorageManager {
    constructor() {
        this.prefix = 'fitflow_';
        this.today = this.getTodayKey();
    }

    /**
     * Get today's date as a key (YYYY-MM-DD)
     */
    getTodayKey() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }

    /**
     * Check if date changed (for daily reset)
     */
    hasDateChanged() {
        const lastDate = this.get('lastDate');
        const today = this.getTodayKey();
        if (lastDate !== today) {
            this.set('lastDate', today);
            return true;
        }
        return false;
    }

    /**
     * Generic get method
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }

    /**
     * Generic set method
     */
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }

    /**
     * Remove an item
     */
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }

    /**
     * Clear all app data
     */
    clearAll() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }

    // ==================== USER PROFILE ====================

    getProfile() {
        return this.get('profile', null);
    }

    setProfile(profile) {
        return this.set('profile', profile);
    }

    hasProfile() {
        return this.getProfile() !== null;
    }

    calculateDailyCalories(weight, height, age, activityLevel) {
        // Mifflin-St Jeor Formula (BMR)
        // Assuming average age of 30 for simplicity
        const bmr = 10 * weight + 6.25 * height - 5 * 30 + 5;
        
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            veryactive: 1.9
        };
        
        const multiplier = activityMultipliers[activityLevel] || 1.55;
        return Math.round(bmr * multiplier);
    }

    // ==================== DAILY DATA ====================

    getDailyData(date = null) {
        const key = date || this.getTodayKey();
        return this.get(`daily_${key}`, {
            date: key,
            calories: 0,
            calorieItems: [],
            water: 0,
            waterItems: [],
            workouts: [],
            weight: null,
            notes: ''
        });
    }

    setDailyData(data, date = null) {
        const key = date || this.getTodayKey();
        return this.set(`daily_${key}`, data);
    }

    // ==================== CALORIES ====================

    getTodayCalories() {
        const dailyData = this.getDailyData();
        return dailyData.calories;
    }

    addFoodItem(name, calories) {
        const dailyData = this.getDailyData();
        const item = {
            id: Date.now(),
            name,
            calories,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        };
        
        dailyData.calorieItems.push(item);
        dailyData.calories = dailyData.calorieItems.reduce((sum, i) => sum + i.calories, 0);
        
        this.setDailyData(dailyData);
        return item;
    }

    removeFoodItem(id) {
        const dailyData = this.getDailyData();
        dailyData.calorieItems = dailyData.calorieItems.filter(item => item.id !== id);
        dailyData.calories = dailyData.calorieItems.reduce((sum, i) => sum + i.calories, 0);
        
        this.setDailyData(dailyData);
    }

    resetCalories() {
        const dailyData = this.getDailyData();
        dailyData.calories = 0;
        dailyData.calorieItems = [];
        this.setDailyData(dailyData);
    }

    // ==================== WATER ====================

    getTodayWater() {
        const dailyData = this.getDailyData();
        return dailyData.water;
    }

    addWater(amount) {
        const dailyData = this.getDailyData();
        const item = {
            id: Date.now(),
            amount,
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        };
        
        dailyData.waterItems.push(item);
        dailyData.water = dailyData.waterItems.reduce((sum, i) => sum + i.amount, 0);
        
        this.setDailyData(dailyData);
        return item;
    }

    removeWaterItem(id) {
        const dailyData = this.getDailyData();
        dailyData.waterItems = dailyData.waterItems.filter(item => item.id !== id);
        dailyData.water = dailyData.waterItems.reduce((sum, i) => sum + i.amount, 0);
        
        this.setDailyData(dailyData);
    }

    resetWater() {
        const dailyData = this.getDailyData();
        dailyData.water = 0;
        dailyData.waterItems = [];
        this.setDailyData(dailyData);
    }

    // ==================== WORKOUTS ====================

    addWorkout(workoutId) {
        const dailyData = this.getDailyData();
        
        if (!dailyData.workouts.includes(workoutId)) {
            dailyData.workouts.push(workoutId);
            this.setDailyData(dailyData);
            return true;
        }
        return false;
    }

    removeWorkout(workoutId) {
        const dailyData = this.getDailyData();
        dailyData.workouts = dailyData.workouts.filter(id => id !== workoutId);
        this.setDailyData(dailyData);
    }

    getCompletedWorkouts() {
        const dailyData = this.getDailyData();
        return dailyData.workouts;
    }

    resetWorkouts() {
        const dailyData = this.getDailyData();
        dailyData.workouts = [];
        this.setDailyData(dailyData);
    }

    // ==================== CUSTOM QUICK ITEMS ====================

    getCustomQuickItems() {
        return this.get('customQuickItems', []);
    }

    addCustomQuickItem(name, calories) {
        const items = this.getCustomQuickItems();
        
        // Check if item already exists
        const exists = items.some(item => item.name === name && item.calories === calories);
        if (exists) return;

        items.push({ name, calories });
        return this.set('customQuickItems', items);
    }

    removeCustomQuickItem(name, calories) {
        const items = this.getCustomQuickItems();
        const filtered = items.filter(item => !(item.name === name && item.calories === calories));
        return this.set('customQuickItems', filtered);
    }

    clearCustomQuickItems() {
        return this.set('customQuickItems', []);
    }

    // ==================== CUSTOM EXERCISES ====================

    getCustomExercises() {
        return this.get('customExercises', []);
    }

    addCustomExercise(exercise) {
        const exercises = this.getCustomExercises();
        exercise.id = 'custom-' + Date.now();
        exercise.createdDate = new Date().toISOString();
        exercises.push(exercise);
        return this.set('customExercises', exercises);
    }

    removeCustomExercise(id) {
        const exercises = this.getCustomExercises();
        const filtered = exercises.filter(ex => ex.id !== id);
        return this.set('customExercises', filtered);
    }

    updateCustomExercise(id, exercise) {
        const exercises = this.getCustomExercises();
        const index = exercises.findIndex(ex => ex.id === id);
        if (index !== -1) {
            exercises[index] = { ...exercises[index], ...exercise };
            return this.set('customExercises', exercises);
        }
        return false;
    }

    getExerciseCalorieEstimate(type, sets, reps = null) {
        // Simple calorie estimation based on exercise type and volume
        const baseCalories = {
            push: 4,    // ~4 kcal per rep for push
            pull: 4,    // ~4 kcal per rep for pull
            legs: 5,    // ~5 kcal per rep for legs (more effort)
            cardio: 8   // ~8 kcal per rep/minute for cardio
        };

        const base = baseCalories[type] || 4;
        
        if (type === 'cardio') {
            // For cardio, assume each set is 1 minute
            return base * sets;
        } else {
            // For strength, multiply by sets and reps
            const totalReps = (reps || 10) * sets;
            return Math.round(base * totalReps);
        }
    }

    // ==================== STREAK ====================

    calculateStreak(calorieGoal) {
        let streak = this.get('currentStreak', 0);
        const bestStreak = this.get('bestStreak', 0);
        let lastStreakDate = this.get('lastStreakDate', null);
        
        const today = this.getTodayKey();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
        
        // Check if streak should continue
        if (lastStreakDate !== today) {
            const streakRequirements = this.checkStreakRequirements(calorieGoal);
            
            if (lastStreakDate === yesterdayKey && streakRequirements.allMet) {
                // Streak continues
                streak++;
            } else if (lastStreakDate !== yesterdayKey && streakRequirements.allMet) {
                // New streak starts
                streak = 1;
            } else {
                // Streak broken
                streak = 0;
            }
            
            if (streak > bestStreak) {
                this.set('bestStreak', streak);
            }
            
            this.set('currentStreak', streak);
            this.set('lastStreakDate', today);
        }
        
        return {
            current: streak,
            best: this.get('bestStreak', 0)
        };
    }

    checkStreakRequirements(calorieGoal) {
        const dailyData = this.getDailyData();
        
        const caloriesOk = dailyData.calories > 0 && dailyData.calories <= calorieGoal;
        const waterOk = dailyData.water >= 2000;
        const workoutOk = dailyData.workouts.length > 0;
        
        return {
            calories: caloriesOk,
            water: waterOk,
            workout: workoutOk,
            allMet: caloriesOk && waterOk && workoutOk
        };
    }

    // ==================== HISTORY ====================

    getDayHistory(date) {
        return this.getDailyData(date);
    }

    getAllDays() {
        const days = [];
        const keys = Object.keys(localStorage);
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix + 'daily_')) {
                const dateStr = key.replace(this.prefix + 'daily_', '');
                days.push(this.getDailyData(dateStr));
            }
        });
        
        // Sort by date descending
        days.sort((a, b) => new Date(b.date) - new Date(a.date));
        return days;
    }

    getLastNDays(n) {
        return this.getAllDays().slice(0, n);
    }

    // ==================== THEME ====================

    getDarkMode() {
        return this.get('darkMode', false);
    }

    setDarkMode(enabled) {
        return this.set('darkMode', enabled);
    }

    // ==================== SOCIAL & SHARING ====================

    exportData() {
        const profile = this.getProfile();
        const allDays = this.getAllDays();
        const customItems = this.getCustomQuickItems();
        const customExercises = this.getCustomExercises();
        const streaks = {
            current: this.get('currentStreak', 0),
            best: this.get('bestStreak', 0)
        };

        return {
            profile,
            history: allDays,
            customItems,
            customExercises,
            streaks,
            exportDate: new Date().toISOString()
        };
    }

    exportAsJSON() {
        const data = this.exportData();
        return JSON.stringify(data, null, 2);
    }

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (data.profile) {
                this.setProfile(data.profile);
            }
            
            if (data.customItems) {
                this.set('customQuickItems', data.customItems);
            }
            
            if (data.customExercises) {
                this.set('customExercises', data.customExercises);
            }
            
            if (data.streaks) {
                this.set('currentStreak', data.streaks.current);
                this.set('bestStreak', data.streaks.best);
            }
            
            if (data.history && Array.isArray(data.history)) {
                data.history.forEach(day => {
                    this.setDailyData(day, day.date);
                });
            }
            
            return true;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }

    getWeeklySummary() {
        const days = this.getLastNDays(7);
        
        let totalCalories = 0;
        let totalWater = 0;
        let totalWorkouts = 0;
        let daysActive = 0;

        days.forEach(day => {
            if (day.calories > 0 || day.water > 0 || day.workouts.length > 0) {
                daysActive++;
            }
            totalCalories += day.calories || 0;
            totalWater += day.water || 0;
            totalWorkouts += (day.workouts ? day.workouts.length : 0);
        });

        const avgCalories = daysActive > 0 ? Math.round(totalCalories / daysActive) : 0;
        const avgWater = daysActive > 0 ? (totalWater / daysActive / 1000).toFixed(1) : 0;
        const avgWorkouts = daysActive > 0 ? (totalWorkouts / daysActive).toFixed(1) : 0;

        return {
            totalCalories,
            totalWater,
            totalWorkouts,
            daysActive,
            avgCalories,
            avgWater,
            avgWorkouts,
            period: '7 days'
        };
    }

    getMonthlySummary() {
        const allDays = this.getAllDays();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const thisMonth = allDays.filter(day => new Date(day.date) >= thirtyDaysAgo);
        
        let totalCalories = 0;
        let totalWater = 0;
        let totalWorkouts = 0;
        let daysActive = 0;

        thisMonth.forEach(day => {
            if (day.calories > 0 || day.water > 0 || day.workouts.length > 0) {
                daysActive++;
            }
            totalCalories += day.calories || 0;
            totalWater += day.water || 0;
            totalWorkouts += (day.workouts ? day.workouts.length : 0);
        });

        const avgCalories = daysActive > 0 ? Math.round(totalCalories / daysActive) : 0;
        const avgWater = daysActive > 0 ? (totalWater / daysActive / 1000).toFixed(1) : 0;
        const avgWorkouts = daysActive > 0 ? (totalWorkouts / daysActive).toFixed(1) : 0;

        return {
            totalCalories,
            totalWater,
            totalWorkouts,
            daysActive,
            avgCalories,
            avgWater,
            avgWorkouts,
            period: '30 days'
        };
    }

    // ==================== ACHIEVEMENTS ====================

    getAchievements() {
        return this.get('achievements', []);
    }

    unlockAchievement(achievementId) {
        const achievements = this.getAchievements();
        
        if (!achievements.find(a => a.id === achievementId)) {
            achievements.push({
                id: achievementId,
                unlockedDate: new Date().toISOString()
            });
            this.set('achievements', achievements);
            return true;
        }
        return false;
    }

    checkAchievements() {
        const profile = this.getProfile();
        const dailyData = this.getDailyData();
        const allDays = this.getAllDays();
        const streak = this.get('currentStreak', 0);
        const customItems = this.getCustomQuickItems();
        const customExercises = this.getCustomExercises();
        const newAchievements = [];

        // Calorie tracker
        if (dailyData.calories > 0) {
            if (this.unlockAchievement('first-calorie')) newAchievements.push('first-calorie');
            if (dailyData.calories > 2500) {
                if (this.unlockAchievement('calorie-master')) newAchievements.push('calorie-master');
            }
        }

        // Water tracker
        if (dailyData.water >= 2000) {
            if (this.unlockAchievement('hydration-hero')) newAchievements.push('hydration-hero');
        }
        if (dailyData.water >= 3000) {
            if (this.unlockAchievement('aquaman')) newAchievements.push('aquaman');
        }

        // Workouts
        const totalWorkouts = allDays.reduce((sum, day) => sum + (day.workouts ? day.workouts.length : 0), 0);
        if (totalWorkouts > 0) {
            if (this.unlockAchievement('first-workout')) newAchievements.push('first-workout');
        }
        if (totalWorkouts >= 10) {
            if (this.unlockAchievement('workout-beast')) newAchievements.push('workout-beast');
        }
        if (totalWorkouts >= 50) {
            if (this.unlockAchievement('fitness-fanatic')) newAchievements.push('fitness-fanatic');
        }

        // Streaks
        if (streak >= 3) {
            if (this.unlockAchievement('streak-keeper-3')) newAchievements.push('streak-keeper-3');
        }
        if (streak >= 7) {
            if (this.unlockAchievement('week-warrior')) newAchievements.push('week-warrior');
        }
        if (streak >= 30) {
            if (this.unlockAchievement('month-master')) newAchievements.push('month-master');
        }

        // Custom items
        if (customItems.length > 0) {
            if (this.unlockAchievement('customizer')) newAchievements.push('customizer');
        }

        // Custom exercises
        if (customExercises.length > 0) {
            if (this.unlockAchievement('creator')) newAchievements.push('creator');
        }
        if (customExercises.length >= 5) {
            if (this.unlockAchievement('exercise-creator')) newAchievements.push('exercise-creator');
        }

        // Days tracked
        if (allDays.length >= 1) {
            if (this.unlockAchievement('day-one')) newAchievements.push('day-one');
        }
        if (allDays.length >= 7) {
            if (this.unlockAchievement('week-tracker')) newAchievements.push('week-tracker');
        }

        return newAchievements;
    }

    getAllAchievements() {
        return {
            'first-calorie': { name: '🍽️ First Bite', desc: 'Log your first food' },
            'calorie-master': { name: '🎯 Calorie Tracker', desc: 'Log 2500+ calories' },
            'hydration-hero': { name: '💧 Hydration Hero', desc: 'Drink 2L of water' },
            'aquaman': { name: '🌊 Aquaman', desc: 'Drink 3L of water' },
            'first-workout': { name: '💪 First Steps', desc: 'Complete your first workout' },
            'workout-beast': { name: '🦾 Workout Beast', desc: 'Complete 10 workouts' },
            'fitness-fanatic': { name: '🔥 Fitness Fanatic', desc: 'Complete 50 workouts' },
            'streak-keeper-3': { name: '🔥 Streak Keeper', desc: 'Maintain 3-day streak' },
            'week-warrior': { name: '🥋 Week Warrior', desc: 'Maintain 7-day streak' },
            'month-master': { name: '👑 Month Master', desc: 'Maintain 30-day streak' },
            'customizer': { name: '🎨 Customizer', desc: 'Create your first food item' },
            'creator': { name: '⭐ Creator', desc: 'Create your first exercise' },
            'exercise-creator': { name: '🌟 Exercise Creator', desc: 'Create 5 exercises' },
            'day-one': { name: '📅 Day One', desc: 'Track your first day' },
            'week-tracker': { name: '📊 Week Tracker', desc: 'Track 7 days' }
        };
    }
}

// Create global instance
const storage = new StorageManager();