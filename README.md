# 🏋️ HealthSphere Mobile

A React Native & Expo app to log, track, and review your workout sessions.

---

## 📱 Demo

> 🎥 Video too large to preview on GitHub.  
> [Download or watch here](./assets/demo/demo_video.mp4)

---

## ✨ Features

- ➕ Add a workout session (type, duration, intensity, date, notes)
- 📋 View your session history
- 🔍 See the details of any session
- 🗑️ Delete a session
- 💾 Data persists across app restarts (AsyncStorage)

---

## 🗂️ Project Structure

```
src/
├── screens/        # HomeScreen, AddWorkoutScreen, WorkoutDetailsScreen
├── components/     # Reusable UI components
├── context/        # Global state management
├── storage/        # AsyncStorage logic
└── navigation/     # Stack Navigator setup
```

---

## 🚀 Installation

**Prerequisites:** Node.js, Expo CLI, Expo Go app on your phone

```bash
# Clone the repo
git clone https://github.com/your-username/healthsphere-mobile.git
cd healthsphere-mobile

# Install dependencies
npm install

# Start the app
npx expo start
```

Then scan the QR code with **Expo Go** (iOS / Android).

---

## 🛠️ Tech Stack

| Tool | Usage |
|------|-------|
| React Native | Mobile UI |
| Expo (managed) | Dev environment |
| React Navigation (Stack) | Screen navigation |
| AsyncStorage | Local data persistence |
| Context API / useState | State management |

---


## 📦 Data Model

A workout session contains:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "Running",
  "duration": 45,
  "intensity": "medium",
  "date": "2026-02-24T10:30:00.000Z",
  "notes": "Felt great today!"
}
```
