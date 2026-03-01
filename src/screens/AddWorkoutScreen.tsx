import React from "react";
import { View, ScrollView } from "react-native";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkout } from "../context/WorkoutContext";

export default function AddWorkoutScreen({ navigation }: any) {
  const { dispatch } = useWorkout();

  const handleAddWorkout = (workoutData: any) => {
    const newWorkout = { ...workoutData, id: Date.now().toString(), };
    dispatch({ type: "ADD_WORKOUT", payload: newWorkout });
    navigation.goBack(); // return to HomeScreen
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <WorkoutForm onSubmit={handleAddWorkout} />
    </ScrollView>
  );
}