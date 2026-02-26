import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import AddWorkoutScreen from "@/screens/AddWorkoutScreen";
import WorkoutDetailsScreen from "@/screens/WorkoutDetailsScreen";


export type RootStackParamList = {
    Home: undefined;
    AddWorkout: undefined;
    WorkoutDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "My Workouts" }}
                />
                <Stack.Screen
                    name="AddWorkout"
                    component={AddWorkoutScreen}
                    options={{ title: "Add Workout" }}
                />
                <Stack.Screen
                    name="WorkoutDetails"
                    component={WorkoutDetailsScreen}
                    options={{ title: "Workout Details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}