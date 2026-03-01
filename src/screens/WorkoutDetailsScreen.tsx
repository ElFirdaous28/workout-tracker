import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

type WorkoutDetailsRouteProp = RouteProp<AppStackParamList, "WorkoutDetails">;
type WorkoutDetailsNavigationProp = NativeStackNavigationProp<AppStackParamList, "WorkoutDetails">;

const WorkoutDetailsScreen = () => {
  const { theme } = useTheme();
  const { state, dispatch } = useWorkout();
  const route = useRoute<WorkoutDetailsRouteProp>();
  const navigation = useNavigation<WorkoutDetailsNavigationProp>();
  const { id } = route.params;

  const workout = state.workouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={48} color={theme.error} />
          <Text style={[styles.errorText, { color: theme.textSecondary }]}>Workout not found</Text>
        </View>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "REMOVE_WORKOUT", payload: id });
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header Card */}
        <View style={[styles.headerCard, { backgroundColor: theme.surface, borderLeftColor: theme.primary }]}>
          <View style={styles.typeContainer}>
            <Ionicons name="fitness" size={32} color={theme.primary} />
            <Text style={[styles.workoutType, { color: theme.textPrimary }]}>{workout.type}</Text>
          </View>
          <View style={[styles.intensityBadge, { backgroundColor: theme.primaryMuted, borderColor: theme.primaryBorder }]}>
            <Text style={[styles.intensityText, { color: theme.primary }]}>{workout.intensity.toUpperCase()}</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Details</Text>
          
          <View style={[styles.detailRow, { backgroundColor: theme.surface }]}>
            <View style={[styles.detailIconContainer, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="time-outline" size={24} color={theme.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Duration</Text>
              <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{workout.duration} minutes</Text>
            </View>
          </View>

          <View style={[styles.detailRow, { backgroundColor: theme.surface }]}>
            <View style={[styles.detailIconContainer, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="calendar-outline" size={24} color={theme.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Date</Text>
              <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{formatDate(workout.date)}</Text>
            </View>
          </View>

          <View style={[styles.detailRow, { backgroundColor: theme.surface }]}>
            <View style={[styles.detailIconContainer, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="speedometer-outline" size={24} color={theme.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Intensity</Text>
              <Text style={[styles.detailValue, { color: theme.textPrimary }]}>{workout.intensity}</Text>
            </View>
          </View>
        </View>

        {/* Notes Section */}
        {workout.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Notes</Text>
            <View style={[styles.notesContainer, { backgroundColor: theme.surface }]}>
              <Text style={[styles.notesText, { color: theme.textPrimary }]}>{workout.notes}</Text>
            </View>
          </View>
        )}

        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.deleteButton, { borderColor: theme.error }]}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={theme.error} />
          <Text style={[styles.deleteButtonText, { color: theme.error }]}>Delete Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    marginTop: 16,
  },
  headerCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderLeftWidth: 6,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  workoutType: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 12,
  },
  intensityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  intensityText: {
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  notesContainer: {
    borderRadius: 12,
    padding: 16,
  },
  notesText: {
    fontSize: 15,
    lineHeight: 22,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});