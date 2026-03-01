import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useWorkout } from "../context/WorkoutContext";
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
  const { state, dispatch } = useWorkout();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_WORKOUT", payload: id });
  };

  const handleClearAll = () => {
    Alert.alert(
      "Delete All Workouts",
      `Are you sure you want to delete all ${state.workouts.length} workout${state.workouts.length !== 1 ? "s" : ""}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => dispatch({ type: "CLEAR_WORKOUTS" }),
        },
      ]
    );
  };

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
            <WorkoutCard
              workout={item}
              onPress={() => navigation.navigate("WorkoutDetails", { id: item.id })}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}

      <View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddWorkout")}
          activeOpacity={0.7}>

          <Text style={styles.addButtonText}>+ Add Workout</Text>
        </TouchableOpacity>

        {state.workouts.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearAll}
            activeOpacity={0.7}>

            <Text style={styles.clearButtonText}>Delete All</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  clearButton: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.error,
  },
});