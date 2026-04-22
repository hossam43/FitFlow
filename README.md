# 🔥 FitFlow - Your Daily Fitness Companion

A modern, interactive fitness tracking web application built with vanilla HTML, CSS, and JavaScript. Track calories, water intake, workouts, and maintain your fitness streak—all without external frameworks!

## ✨ Features

### 📊 Core Tracking
- **Calories Tracking** - Log foods and monitor daily calorie intake with visual progress
- **Meal Presets** - Quick-add complete meals (Chicken, Beef, Fish) with all components
- **Quick Add Foods** - 11+ common foods with saved custom items
- **Water Tracker** - Track water consumption with quick-add buttons and circular progress
- **Workout Tracking** - Complete 30+ predefined workouts + create custom exercises
- **Custom Exercises** - Add personalized workouts with image support and calorie estimation
- **Streak System** - Maintain daily streaks based on meeting all three goals (Duolingo-style!)

### 🎯 Smart Features
- **Meal Presets** (NEW):
  - 🍗 Chicken Meal (650 kcal)
  - 🥩 Beef Meal (700 kcal)
  - 🐟 Fish Meal (700 kcal)
  - All meals auto-add complete components with one click

- **Extended Quick Foods** (NEW):
  - Apple, Banana, Peach, Dates
  - Cucumber + Carrot, Mashed Potatoes, Pineapple
  - Automatically saves custom items for future use!

- **Custom Exercise Widget** (NEW):
  - Add exercise name, sets, reps
  - 4 workout categories (Push, Pull, Legs, Cardio)
  - Auto-estimate calories burned
  - Optional image upload with preview
  - Track custom exercises with completion checkbox

- **Automatic Calorie Calculation** - Based on weight, height, and activity level using Mifflin-St Jeor formula
- **Daily Reset** - Automatically resets tracking data each day
- **Dark Mode** - Toggle between light and dark themes
- **Motivational Messages** - Random encouraging messages throughout the day
- **Warning System** - Alerts when calorie goal is exceeded with suggested workouts
- **Progress Visualization** - Circular and linear progress bars
- **History Tracking** - View past 7 days of activity

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** - Celebratory animations when goals are reached
- **Toast Notifications** - Quick feedback for all user actions
- **Intuitive Navigation** - Tab-based interface for easy access to all features
- **Data Persistence** - All data saved locally in browser storage

## 📁 Project Structure

```
fitness-app/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Complete styling system
└── js/
    ├── app.js              # Main application controller
    ├── storage.js          # LocalStorage management
    ├── calories.js         # Calorie tracking logic
    ├── water.js            # Water tracking logic
    ├── workouts.js         # Workout management
    └── ui.js               # UI updates and theme management
```

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Complete the setup form with your profile information
4. Start tracking!

### No Dependencies Required!
- Pure HTML5
- Vanilla CSS3
- ES6 JavaScript
- Browser LocalStorage API

## 📝 How to Use

### Initial Setup
1. **Weight** - Enter your current weight in kilograms
2. **Height** - Enter your height in centimeters
3. **Target Weight** - Set your fitness goal weight
4. **Activity Level** - Select your typical activity level
   - Sedentary (little exercise)
   - Light (1-3 days/week)
   - Moderate (3-5 days/week)
   - Active (6-7 days/week)
   - Very Active (intense exercise)

Your daily calorie goal is automatically calculated based on these inputs.

### Daily Usage

#### Overview Tab
- Quick view of today's progress
- Calorie, water, and workout status
- Links to detailed tracking sections
- Streak information

#### Calories Tab (Enhanced!)
**Meal Presets:**
- One-click meal adding with all components
- 🍗 Chicken Meal, 🥩 Beef Meal, 🐟 Fish Meal
- All items automatically logged

**Quick Add Foods:**
- 11 common food items pre-loaded
- 🍑 Peach, 📅 Dates, 🥒 Vegetables, etc.
- Custom items appear here automatically!

**Manual Food Entry:**
- Add custom foods with exact calories
- Items automatically saved for next time
- Complete food log with times

#### Water Tab
- Quick-add buttons (250ml, 500ml, 750ml, 1L)
- Custom amount input
- Circular progress visualization
- Complete water history
- Celebration when daily goal (2L) is reached

#### Workouts Tab (Enhanced!)
**Predefined Workouts:**
- 30+ exercises across 5 categories
- Push, Pull, Legs, Cardio
- Mark as completed with one click

**Custom Exercises (NEW):**
- "+ Add Exercise" button opens advanced widget
- Define exercise name, sets, and reps
- Choose workout type (Push/Pull/Legs/Cardio)
- Auto-estimate calories or enter manually
- Upload exercise image (optional)
- Full completion tracking
- Delete custom exercises anytime

#### History Tab
- Last 7 days of activity
- Total workouts, water, and current weight
- Reset all data option

### Streak System
Your streak increases when you complete:
1. ✓ Consume calories within your daily goal
2. ✓ Drink at least 2 liters of water
3. ✓ Complete at least one workout

Meeting all three requirements maintains your streak!

### Custom Foods & Exercises
**Smart Food Storage:**
- When you manually add a food item, it's automatically saved
- Appears in "My Quick Items" section next time
- Quick access to your frequent foods

**Custom Exercises:**
- Create unlimited custom exercises
- Store name, sets, reps, type, and image
- Calories auto-estimated or manually entered
- Exercises persist across days
- Track completion and delete as needed

## 🎨 Design System

### Color Palette
- **Primary Red** - #FF6B6B (Energy, action)
- **Accent Blue** - #4ECDC4 (Water)
- **Accent Green** - #6BCB77 (Success)
- **Accent Orange** - #FFB800 (Alerts)
- **Dark** - #0F1419 (Dark mode)
- **Light** - #FFFFFF (Light mode)

### Typography
- **Headers** - Bold, high contrast
- **Body** - Clear, readable sans-serif
- **Data** - Large, prominent numbers

### Animations
- **Fade In** - 0.3s smooth opacity
- **Slide Up** - Modal entrance
- **Pulse** - Streak icon breathing effect
- **Celebrate** - Scale and rotate on goals reached

## 💾 Data Storage

All data is stored in your browser's LocalStorage:
- **User Profile** - Weight, height, target, activity level
- **Daily Data** - Calories, water, workouts for each day
- **Custom Items** - Foods and exercises you created
- **Streak Info** - Current and best streaks
- **Theme** - Dark mode preference

### Data Structure
```javascript
{
  profile: {
    weight, height, targetWeight, 
    activityLevel, dailyCalories, setupDate
  },
  daily_{YYYY-MM-DD}: {
    date, calories, calorieItems: [],
    water, waterItems: [],
    workouts: [],
    weight, notes
  },
  customQuickItems: [
    { name, calories }
  ],
  customExercises: [
    { id, name, sets, reps, type, calories, emoji, imageData, createdDate }
  ],
  currentStreak: number,
  bestStreak: number,
  lastStreakDate: string,
  darkMode: boolean
}
```

## 🔧 Customization

### Change Daily Water Goal
Edit `WaterManager` class in `js/water.js`:
```javascript
this.dailyGoal = 2000; // Change this value (in ml)
```

### Add Custom Meals
Edit `CaloriesManager` in `js/calories.js`:
```javascript
this.mealPresets = {
    myMeal: {
        name: 'My Meal Name',
        emoji: '🍽️',
        items: [
            { name: 'Item 1', calories: 100 },
            { name: 'Item 2', calories: 200 }
        ],
        total: 300
    }
};
```

### Modify Calorie Estimation
Edit `StorageManager.getExerciseCalorieEstimate()` in `js/storage.js`:
```javascript
const baseCalories = {
    push: 4,    // kcal per rep
    pull: 4,    // kcal per rep
    legs: 5,    // kcal per rep
    cardio: 8   // kcal per minute
};
```

### Modify Motivational Messages
Edit `UIManager` in `js/ui.js`:
```javascript
this.motivationalMessages = [
    '💪 Your custom message',
    // Add more messages
];
```

### Adjust Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #FF6B6B;
    --accent-blue: #4ECDC4;
    /* etc */
}
```

## 📱 Browser Compatibility

- Chrome/Chromium - ✓ Full support
- Firefox - ✓ Full support
- Safari - ✓ Full support
- Edge - ✓ Full support
- Mobile browsers - ✓ Responsive design

## 🔐 Privacy & Data

- **100% Local Storage** - All data stays on your device
- **No Server** - No data transmission
- **No Tracking** - Completely private
- **No Accounts** - No login required
- **Export Able** - Access your data anytime via browser DevTools

## 🚀 Performance

- **Zero Loading** - Instant startup
- **Optimized CSS** - Minimal file size
- **Vanilla JS** - No framework overhead
- **Smooth Animations** - 60fps performance
- **Mobile Optimized** - Low memory footprint

## 🐛 Troubleshooting

### Data Not Saving
- Check browser LocalStorage is enabled
- Ensure not in private/incognito mode
- Clear browser cache if stuck

### Animations Laggy
- Check device performance
- Try disabling dark mode
- Reduce number of log entries

### Streak Not Updating
- Refresh the page
- Check all three requirements are met
- Verify date changed notification

### Custom Items Not Appearing
- Refresh the page after adding
- Check browser console for errors
- Ensure LocalStorage is not full

## 📚 Code Quality

- **Modular Architecture** - Each manager handles specific domain
- **Clear Comments** - Well-documented code
- **Error Handling** - Try-catch for storage operations
- **Semantic HTML** - Accessible markup
- **CSS Organization** - Grouped by component
- **No Dependencies** - Pure vanilla code

## 🎯 Future Enhancements

Potential features for future versions:
- Goal setting and progress tracking
- Body measurements tracking
- Photo progress gallery
- Export data as CSV/PDF
- Weekly/monthly summaries
- Achievement badges
- Social sharing
- Workout history with notes
- Nutrition macros tracking
- Sleep tracking
- Weather-based recommendations
- Social motivation features

## 📄 License

Free to use and modify for personal or commercial projects.

## 🤝 Contributing

Feel free to fork and create your own version with additional features!

## 💪 Stay Motivated!

Remember: Consistency is key! Open this app every day, log your activities, and watch your fitness journey progress. You've got this! 🔥

---

**Made with ❤️ for fitness enthusiasts everywhere**

Start tracking your fitness today! 🚀

### 🎯 Smart Features
- **Automatic Calorie Calculation** - Based on weight, height, and activity level using Mifflin-St Jeor formula
- **Daily Reset** - Automatically resets tracking data each day
- **Dark Mode** - Toggle between light and dark themes
- **Motivational Messages** - Random encouraging messages throughout the day
- **Warning System** - Alerts when calorie goal is exceeded with suggested workouts
- **Progress Visualization** - Circular and linear progress bars
- **History Tracking** - View past 7 days of activity

### 🎨 User Experience
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations** - Celebratory animations when goals are reached
- **Toast Notifications** - Quick feedback for all user actions
- **Intuitive Navigation** - Tab-based interface for easy access to all features
- **Data Persistence** - All data saved locally in browser storage

## 📁 Project Structure

```
fitness-app/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Complete styling system
└── js/
    ├── app.js              # Main application controller
    ├── storage.js          # LocalStorage management
    ├── calories.js         # Calorie tracking logic
    ├── water.js            # Water tracking logic
    ├── workouts.js         # Workout management
    └── ui.js               # UI updates and theme management
```

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Complete the setup form with your profile information
4. Start tracking!

### No Dependencies Required!
- Pure HTML5
- Vanilla CSS3
- ES6 JavaScript
- Browser LocalStorage API

## 📝 How to Use

### Initial Setup
1. **Weight** - Enter your current weight in kilograms
2. **Height** - Enter your height in centimeters
3. **Target Weight** - Set your fitness goal weight
4. **Activity Level** - Select your typical activity level
   - Sedentary (little exercise)
   - Light (1-3 days/week)
   - Moderate (3-5 days/week)
   - Active (6-7 days/week)
   - Very Active (intense exercise)

Your daily calorie goal is automatically calculated based on these inputs.

### Daily Usage

#### Overview Tab
- Quick view of today's progress
- Calorie, water, and workout status
- Links to detailed tracking sections
- Streak information

#### Calories Tab
- Add food items with calorie counts
- Use quick-add buttons for common foods
- View complete food log with times
- See remaining calories for the day
- Warning system when exceeding goal

#### Water Tab
- Quick-add buttons (250ml, 500ml, 750ml, 1L)
- Custom amount input
- Circular progress visualization
- Complete water history
- Celebration when daily goal (2L) is reached

#### Workouts Tab
- 30+ exercises across 5 categories:
  - **Push** - Chest, shoulders, triceps
  - **Pull** - Back, biceps, lats
  - **Legs** - Lower body exercises
  - **Cardio** - Aerobic exercises
- Mark workouts as completed
- View completed workouts list
- Filter by category

#### History Tab
- Last 7 days of activity
- Total workouts, water, and current weight
- Reset all data option

### Streak System
Your streak increases when you complete:
1. ✓ Consume calories within your daily goal
2. ✓ Drink at least 2 liters of water
3. ✓ Complete at least one workout

Meeting all three requirements maintains your streak!

## 🎨 Design System

### Color Palette
- **Primary Red** - #FF6B6B (Energy, action)
- **Accent Blue** - #4ECDC4 (Water)
- **Accent Green** - #6BCB77 (Success)
- **Accent Orange** - #FFB800 (Alerts)
- **Dark** - #0F1419 (Dark mode)
- **Light** - #FFFFFF (Light mode)

### Typography
- **Headers** - Bold, high contrast
- **Body** - Clear, readable sans-serif
- **Data** - Large, prominent numbers

### Animations
- **Fade In** - 0.3s smooth opacity
- **Slide Up** - Modal entrance
- **Pulse** - Streak icon breathing effect
- **Celebrate** - Scale and rotate on goals reached

## 💾 Data Storage

All data is stored in your browser's LocalStorage:
- **User Profile** - Weight, height, target, activity level
- **Daily Data** - Calories, water, workouts for each day
- **Streak Info** - Current and best streaks
- **Theme** - Dark mode preference

### Data Structure
```javascript
{
  profile: {
    weight, height, targetWeight, 
    activityLevel, dailyCalories, setupDate
  },
  daily_{YYYY-MM-DD}: {
    date, calories, calorieItems: [],
    water, waterItems: [],
    workouts: [],
    weight, notes
  },
  currentStreak: number,
  bestStreak: number,
  lastStreakDate: string,
  darkMode: boolean
}
```

## 🔧 Customization

### Change Daily Water Goal
Edit `WaterManager` class in `js/water.js`:
```javascript
this.dailyGoal = 2000; // Change this value (in ml)
```

### Add Custom Workouts
Edit `WorkoutsManager` in `js/workouts.js`:
```javascript
this.workouts = [
    {
        id: 'custom-1',
        name: 'Your Exercise',
        description: 'Sets and reps',
        category: 'push', // or pull, legs, cardio
        emoji: '💪'
    }
];
```

### Modify Motivational Messages
Edit `UIManager` in `js/ui.js`:
```javascript
this.motivationalMessages = [
    '💪 Your custom message',
    // Add more messages
];
```

### Adjust Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #FF6B6B;
    --accent-blue: #4ECDC4;
    /* etc */
}
```

## 📱 Browser Compatibility

- Chrome/Chromium - ✓ Full support
- Firefox - ✓ Full support
- Safari - ✓ Full support
- Edge - ✓ Full support
- Mobile browsers - ✓ Responsive design

## 🔐 Privacy & Data

- **100% Local Storage** - All data stays on your device
- **No Server** - No data transmission
- **No Tracking** - Completely private
- **No Accounts** - No login required
- **Export Able** - Access your data anytime via browser DevTools

## 🚀 Performance

- **Zero Loading** - Instant startup
- **Optimized CSS** - Minimal file size
- **Vanilla JS** - No framework overhead
- **Smooth Animations** - 60fps performance
- **Mobile Optimized** - Low memory footprint

## 🐛 Troubleshooting

### Data Not Saving
- Check browser LocalStorage is enabled
- Ensure not in private/incognito mode
- Clear browser cache if stuck

### Animations Laggy
- Check device performance
- Try disabling dark mode
- Reduce number of log entries

### Streak Not Updating
- Refresh the page
- Check all three requirements are met
- Verify date changed notification

## 📚 Code Quality

- **Modular Architecture** - Each manager handles specific domain
- **Clear Comments** - Well-documented code
- **Error Handling** - Try-catch for storage operations
- **Semantic HTML** - Accessible markup
- **CSS Organization** - Grouped by component

## 🎯 Future Enhancements

Potential features for future versions:
- Goal setting and progress tracking
- Body measurements tracking
- Photo progress gallery
- Export data as CSV/PDF
- Weekly/monthly summaries
- Achievement badges
- Social sharing
- Workout history with sets/reps
- Nutrition macros tracking
- Sleep tracking

## 📄 License

Free to use and modify for personal or commercial projects.

## 🤝 Contributing

Feel free to fork and create your own version with additional features!

## 💪 Stay Motivated!

Remember: Consistency is key! Open this app every day, log your activities, and watch your fitness journey progress. You've got this! 🔥

---

**Made with ❤️ for fitness enthusiasts everywhere**

Start tracking your fitness today! 🚀