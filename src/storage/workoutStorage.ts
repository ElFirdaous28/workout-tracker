import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "@/types/workout";

const WORKOUTS_KEY = "@workouts";

export const workoutStorage = {
  // sve workouts to AsyncStorage
  saveWorkouts: async (workouts: Workout[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
    } catch (error) {
      console.error("Failed to save workouts:", error);
      throw error;
    }
  },

  // get workouts from AsyncStorage
  loadWorkouts: async (): Promise<Workout[]> => {
    try {
      const data = await AsyncStorage.getItem(WORKOUTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load workouts:", error);
      return [];
    }
  },

  // Clear all workouts
  clearWorkouts: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(WORKOUTS_KEY);
    } catch (error) {
      console.error("Failed to clear workouts:", error);
      throw error;
    }
  },
};
