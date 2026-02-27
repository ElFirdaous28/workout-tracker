import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/types";
import { colors } from "@/theme/colors";
import WorkoutCard from "@/components/WorkoutCard";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const { state } = useContext(WorkoutContext);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Workouts</Text>
        <Text style={styles.workoutCount}>
          {state.workouts.length} workout{state.workouts.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {state.workouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No workouts yet. Add one to get started!</Text>
        </View>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={state.workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkoutCard workout={item} />
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddWorkout")}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Add Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  workoutCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  listContainer: {
    flex: 1,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  buttonContainer: {
    paddingBottom: 8,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.background,
  },
});