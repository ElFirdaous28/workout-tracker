import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import AddWorkoutScreen from "@/screens/AddWorkoutScreen";
import WorkoutDetailsScreen from "@/screens/WorkoutDetailsScreen";
import { AppStackParamList } from "@/types";
import { colors } from "@/theme/colors";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: colors.surface,
                    },
                    headerTintColor: colors.primary,
                    headerTitleStyle: {
                        color: colors.textPrimary,
                        fontWeight: "bold",
                    },
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
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